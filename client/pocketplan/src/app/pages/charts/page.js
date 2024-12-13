// pages/charts
'use client';

import Navbar from "../../components/navbar";
import AccountList from "@/app/pages/dashboard/accountList";
import DailyExpenseChart from "./dailyExpenseChart";

export default function Dashboard() {
  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full" />

      <div className="md:px-32 sm:px-16 m-4 overflow-x-hidden">
        <h1 className="text-2xl font-bold my-4 text-primary">Charts and Analysis</h1>

        {/* AccountList handles its own state and passes selectedAccount data */}
        <AccountList>
          {({ selectedAccount }) => (
            <div className="border-2 border-primary flex flex-row gap-4">
              {/* dailyExpenseChart */}
              <div className="border-2 border-error p-4 bg-base-100 rounded-xl p-5 shadow-[0_1_60px_rgba(0,0,0,0.15)]">
                <h3 className="text-2xl font-medium mb-4 text-neutral">Daily Overview</h3>
                <div className="w-full h-80 ">
                  <DailyExpenseChart />
                </div>
              </div>
              
            </div>

          )}
        </AccountList>
      </div>
    </div>
  );
}
