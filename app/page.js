import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Page() {
  return (
    <>
      <Navigation/>
      <h1>The Wild Oasis. Welcome to paradise.</h1>
      {/* <a href="/cabins">Explore Luxury cabins</a> */}
      <Link href="/cabins">Explore Luxury cabins</Link>
    </>
  );
}
