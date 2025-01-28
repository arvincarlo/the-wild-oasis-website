import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

export const metadata = {
  title: "The Wild Oasis",
}

export default function RootLayout({children}) {
  return(
    <html>
      <body>
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