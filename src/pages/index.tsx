import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome to the page</h1>
      <Link href={"/products"}> Click here to visit Products Page!</Link>
    </>
  );
}
