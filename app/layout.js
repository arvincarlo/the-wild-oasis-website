import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

import {Josefin_Sans, Karla, Dosis, Exo_2} from "next/font/google";

// run the function
const font = Exo_2({
  subsets: ['latin'],
  display: "swap", // this will display the text in default fonts, and once ready it will swap
});

import '@/app/_styles/globals.css'

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
      <body className={`${font.className} bg-primary-950 text-primary-100 min-h-screen`}>
        <header>
          <Logo></Logo>
        </header>
        <Navigation/>
        <main>
          {children}
        </main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  )
}