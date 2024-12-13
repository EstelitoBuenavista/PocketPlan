// pages/dashboard
'use client';

import Navbar from "../../components/navbar";
import AccountList from "@/app/pages/dashboard/accountList";
import DashboardGrid from "@/app/pages/dashboard/dashboardGrid";

export default function Dashboard() {
  return (
    <div className="background flex flex-col min-h-screen w-full max-w-screen">
      <Navbar className="fixed top-0 w-full" />

      <div className="md:px-32 sm:px-16 m-4 mt-8 mb-16  overflow-x-hidden">
        <h1 className="text-2xl font-bold my-4 text-primary">Dashboard</h1>

        <AccountList>
          {({ selectedAccount }) => (
            <div className="mt-4 h-full max-h-[calc(100vh-5rem)] overflow-hidden">
            <DashboardGrid selectedAccount={selectedAccount} />
          </div>
          )}
        </AccountList>
      </div>
    </div>
  );
}
