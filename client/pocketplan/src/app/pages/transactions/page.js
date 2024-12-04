// pages/transactions
'use client';

import Navbar from "../../components/navbar";
import AccountList from "@/app/components/accountList";

export default function Dashboard() {
  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full z-10" />

      <div className="md:px-32 sm:px-16 m-4 mt-8">
        <h1 className="text-2xl font-bold my-4 text-primary">Transactions</h1>

        {/* AccountList handles its own state and passes selectedAccount data */}
        <AccountList>
          {({ selectedAccount }) => (
            <div className="mt-4">
              {/* <DashboardContent selectedAccount={selectedAccount} /> */}
            </div>
          )}
        </AccountList>
      </div>
    </div>
  );
}
