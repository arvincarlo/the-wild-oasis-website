"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"

function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const activeFilter = searchParams.get('capacity') ?? "all";

    function handleFilter(filter) {
        // WEb api for manipulating route params
        const params = new URLSearchParams(searchParams);

        // Set the capacity to the filtered term
        params.set("capacity", filter);

        // Replace the URL
        router.replace(`${pathName}?${params.toString()}`, {scroll: false});
    }

    return (
        <div className="border border-primary-800 flex">
            <Button 
                filter="all"
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                All cabins
            </Button>
            <Button 
                filter="small"
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                1 &mdash; 3 guests
            </Button>
            <Button 
                filter="medium"
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                4 &mdash; 7 guests
            </Button>
            <Button 
                filter="large"
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                8 &mdash; 15 guests
            </Button>
        </div>
    )
}

function Button({filter, handleFilter, activeFilter, children}) {
    return <button onClick={() => handleFilter(filter)} className={`${activeFilter === filter ? 'bg-primary-700 text-primary-50' : ''} px-5 py-2 hover:bg-primary-700`}>{children}</button>
}

export default Filter
