// pages/dashboard
'use client'

import { useState } from "react";
import Navbar from "../../components/navbar";
import DashboardLayout from "../../components/dashboardLayout";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([
    {
      "id": 1,
      "userID": 101,
      "balance": 1500.75,
      "accountType": "Checking",
      "accountName": "Main Checking"
    },
    {
      "id": 2,
      "userID": 101,
      "balance": 3000.50,
      "accountType": "Savings",
      "accountName": "Emergency Savings"
    },
    {
      "id": 3,
      "userID": 103,
      "balance": 4500.25,
      "accountType": "Business",
      "accountName": "Company"
    },
    {
      "id": 4,
      "userID": 104,
      "balance": 750.40,
      "accountType": "Savings",
      "accountName": "Retirement Fund"
    }
  ]);
  const [selectedAccount, setSelectedAccount] = useState(1);

  const addNewAccount = () => {
    const newAccount = {
      id: accounts.length + 1,
      userID: 101,
      balance: 0.0,
      accountType: "Checking",
      accountName: `Account ${accounts.length + 1}`
    };
    setAccounts([...accounts, newAccount]);
  }

  const handleTabSelect = (accountId) => {
    setSelectedAccount (accountId);
  }

  return (
    <div className="background flex flex-col min-h-screen">
        <Navbar className="fixed top-0 w-full z-10"/>

        {/* tabs of accounts, overview shall be a default */}
        <div className="md:px-32 mt-4">
          <h1 className="text-2xl font-bold mb-4 mt-4 text-primary">Dashboard</h1>

          <div role="tablist" className="tabs tabs-bordered tabs-xs">
            {/* default overview */}
            <input type="radio" name="tab1" role="tab" className="tab text-neutral-content" aria-label="Overview"
              defaultChecked onChange={() => handleTabSelect(0)}
            />
            <div role="tabpanel" className="tab-content">
              <DashboardLayout accountId={0} />
            </div>

            {/* list other accounts */}

            {/* create new account button */}
            <button className="flex align-center justify-center p-2">
              <PlusCircleIcon className="w-4 h-4 text-neutral-content" onClick={addNewAccount}/>
            </button>
          </div>

        </div>
    </div>
  );
}