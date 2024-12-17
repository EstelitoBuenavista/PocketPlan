// pages/dashboard
'use client';

import Navbar from "../../components/navbar";
import AccountList from "@/app/pages/dashboard/accountList";
import DashboardGrid from "@/app/pages/dashboard/dashboardGrid";

export default function Dashboard() {
  return (
    <div className="background flex flex-col min-h-screen w-full">
      <Navbar className="fixed top-0 w-full z-10" />

      <div className="px-4 sm:px-16 md:px-32 my-4 overflow-x-hidden">
        <h1 className="text-2xl font-bold my-4 text-primary">Dashboard</h1>

        <AccountList>
          {({ selectedAccount }) => (
            <div className="mt-4 h-full overflow-hidden">
              <DashboardGrid selectedAccount={selectedAccount} />
            </div>
          )}
        </AccountList>
      </div>
    </div>
  );
}