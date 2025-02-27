import { ReservationProvider } from "./_context/ReservationContext";
import { Analytics } from "@vercel/analytics/next";

import {Josefin_Sans, Karla, Dosis, Exo_2, Indie_Flower, Raleway, Poppins, Quicksand, Nunito, Lato} from "next/font/google";

// run the function
const font = Raleway({
  subsets: ['latin'],
  weight: "400",
  display: "swap",// this will display the text in default fonts, and once ready it will swap
});

import '@/app/_styles/globals.css'
import Header from "./_components/Header";

export const metadata = {
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis"
  },
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beatiful mountains and dark forests",

}

export default function RootLayout({children}) {
  return(
    <html>
      <body className={`${font.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialised relative`}>
        <Header/>
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
              {children}
              <Analytics/>
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}