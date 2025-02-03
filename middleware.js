// import { NextResponse } from "next/server";

// export function middleware(request) {
//     console.log(request);

//     // Redirect the users
//     return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "./app/_lib/auth"

export const middleware = auth;

// // Concept of matcher
export const config = {
    matcher: ["/account"]
}