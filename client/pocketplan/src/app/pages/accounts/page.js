// pages/accounts
import Navbar from "../../components/navbar";

export default function Accounts() {
  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full z-10" />

      <div className="md:px-32 sm:px-16 m-4 mt-8">
        <h1 className="text-2xl font-bold my-4 text-primary">Accounts</h1>
      </div>
    </div>
  );
}