import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

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
      <body className="bg-primary-950 text-primary-100 min-h-screen">
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