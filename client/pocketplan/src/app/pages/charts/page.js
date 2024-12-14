// pages/charts
'use client';

import Navbar from "../../components/navbar";
import AccountList from "@/app/pages/dashboard/accountList";
import DailyExpenseChart from "./dailyExpenseChart";
import CategoryPieChart from "./categoryPieChart";
import CategoryMixBarChart from "./categoryMixBarChart";

export default function Dashboard() {
  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full" />

      <div className="md:px-32 sm:px-16 m-4 overflow-x-hidden">
        <h1 className="text-2xl font-bold my-4 text-primary">Charts and Analysis</h1>

        {/* AccountList handles its own state and passes selectedAccount data */}
        <AccountList>
          {({ selectedAccount }) => (
            <div className="mt-4 w-full overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4">
                
                {/* Left: Category Pie Chart */}
                <div className="rounded-xl">
                  <div className="bg-base-100 rounded-xl p-5">
                    <h3 className="text-2xl font-medium mb-4 text-neutral text-center flex justify-start">
                      Category Trends
                    </h3>
                    <div className="w-full h-[300px]">
                      <CategoryPieChart selectedAccount={ selectedAccount }/>
                    </div>
                  </div>

                </div>

                {/* Right: Daily Expense Chart */}
                <div className="flex flex-col gap-4">
                  <div className="p-5 bg-base-100 rounded-xl">
                    <h3 className="text-2xl font-medium mb-4 text-neutral">Categorized Expenses</h3>
                    <div className="w-full h-[400px]">
                      <CategoryMixBarChart selectedAccount={ selectedAccount }/>
                    </div>
                  </div>
                  <div className="p-5 bg-base-100 rounded-xl">
                    <h3 className="text-2xl font-medium mb-4 text-neutral">Daily Overview</h3>
                    <div className="w-full h-[400px]">
                      <DailyExpenseChart selectedAccount={ selectedAccount }/>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </AccountList>
      </div>
    </div>
  );
}

