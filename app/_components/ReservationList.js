"use client"

import { useOptimistic } from "react";
import ReservationCard from "@/app/_components/ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({bookings}) {
    
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings, 
        // update function - this will take in the current state (1st arg), and the value to tell the next optimistic state (2nd arg)
        (currentBookings, bookingId) => {
            // Only keep the bookings where the bookingId is different
            return currentBookings.filter((booking) => booking.id !== bookingId)
        }
    );

    async function handleDelete(bookingId) {
        // implement optimistic here...
        optimisticDelete(bookingId);
        await deleteBooking(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete}/>
            ))}
        </ul>
    )
}

export default ReservationList


/* useOptimistic - 2 types of state
1 is the actual state
1 is the optimistic state (updating function)

optimisticDelete - setter function to use when user clicks on the delete button
*/