"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
    await signIn("google", {redirectTo: '/account'});
}

export async function signOutAction() {
    await signOut({redirectTo: "/"});
}

export async function updateGuest(formData) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');

    if (!validateNationalID(nationalID)) {
        throw new Error("Please provide a valid national ID");
    }

    const updateData = {nationality, countryFlag, nationalID};

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)
    
    if (error) {
        throw new Error('Guest could not be updated');
    }

    revalidatePath('/account/profile');
}

export async function createBooking(bookingData, formData) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    // For large objects to get it from formData
    // Object.entries(formData.entries())

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        hasBreakfast: false,
        status: "unconfirmed"
    };

    console.log(bookingData)

    const { error } = await supabase
        .from('bookings')
        .insert([newBooking])
        // So that the newly created object gets returned!
        // .select()
        // .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be created');
    }
    
    // revalidate the path once it is success
    revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect('/cabins/thankyou')
}

// Server Action
export async function deleteBooking(bookingId) {
    // await new Promise((res) => setTimeout(res, 5000));

    // throw new Error("");

    const session = await auth();
    
    if (!session) throw new Error("You must be logged in");
    
    // Protecting the action from unauthorized users
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId)) {
        throw new Error("You are not allowed to delete this booking");
    }

    const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
      throw new Error('Booking could not be deleted');
    }

    // revalidate the path once delete success
    revalidatePath("/account/reservations");
}

// Update a reservation 
export async function updateBooking(formData) {
    // 1. Authentication
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    // 2. Authorization
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    const bookingId = Number(formData.get('bookingId'));
    const numGuests = Number(formData.get('numGuests'));
    const observations = formData.get('observations').slice(0, 1000);

    if (!guestBookingIds.includes(bookingId)) {
        throw new Error("You are not allowed to update this booking");
    }

    // 3. Update action
    const updateData = {numGuests, observations};

    // 4. Mutation
    const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

    // 5. Error Handling
    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }


    // 6. Revalidation
    // Revalidate & Redirect cache if success
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath(`/account/reservations`);

    // 7. Redirections
    redirect("/account/reservations");
}


function validateNationalID(nationalID) {
    const regex = /^[a-zA-Z0-9]{6,12}$/;
    return regex.test(nationalID);
}
