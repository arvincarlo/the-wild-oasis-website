import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

import { getSettings, getBookedDatesByCabinId } from "../_lib/data-service";

async function Reservation({cabin}) {
    console.log(cabin.id)

    // Better approach :)
    // getting the data in parallel, to avoid the blocking waterfall
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id)
    ]);

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin}/>
            <ReservationForm cabin={cabin}/>
        </div>
    )
}

export default Reservation
