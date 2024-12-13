// components/dashboardGrid
'use client';

import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TotalCard from './totalCard'
import CreateTransaction from '../transactions/createTransaction';
import TransactionsList from "@/app/pages/transactions/transactionsList";
import DailyExpenseChart from "../charts/dailyExpenseChart";
import {
  ArrowUpRightIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

function DashboardGrid({ selectedAccount }) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOverview = !selectedAccount;
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  const getTotal = () => {
    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } else {
    router.push('/pages/login')
    }

    fetch(`http://localhost:4000/account/usertotal/${id}`)
      .then(response => response.json())
      .then(data => {
        setTotalBalance(data.balance)
        setTotalExpenses(data.expenses)
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }

  useEffect(() => {
    getTotal()
   }, [])

  const handleAddAccountClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="border-2 border-info grid h-full sm:grid-cols-[4fr_2fr] grid-cols-1 gap-4 w-full">
      {/* LEFT COLUMN */}
      <div className="border-2 flex flex-wrap gap-4">
      {/* <div className="py-2 flex flex-wrap gap-4"> */}
        <TotalCard
          title={`Balance`}
          value={isOverview ? totalBalance : selectedAccount.balance}
        />
        <TotalCard
          title={`Expenses`}
          // add logic for EXPENSES HERE
          value={isOverview ? totalExpenses : selectedAccount.expense}
        />
        
        <div className="flex flex-col gap-4">
          {/* Chart div */}
          <div className="p-4 bg-base-100 rounded-xl p-6 shadow-[0_1_60px_rgba(0,0,0,0.15)]">
            <h3 className="text-2xl font-medium mb-4 text-neutral">Daily Overview</h3>
            <div className="w-full h-80 ">
              <DailyExpenseChart />
            </div>
          </div>
          
          {/* Transaction div */}
          <div className="bg-base-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <button 
                className="text-2xl font-medium mb-4 text-neutral flex gap-2 items-center hover:underline"
                onClick={() => {
                  if (selectedAccount) {
                    router.push(`/pages/transactions?accountId=${selectedAccount.id}`);
                  } else {
                    router.push('/pages/transactions');
                  }
                }}
              >
                <span className="flex items-center gap-2 w-full">
                  <ArrowUpRightIcon className="w-5 h-5 stroke-[2px]" />
                  Recent Transactions
                </span>
              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={handleAddAccountClick}
                aria-label="Create New Transaction"
              >
                <PlusIcon className="w-4 h-4 stroke-[3]" />
                New Transaction
              </button>
            </div>
            <div className="bg-base-100 rounded-xl p-4 overflow-auto">
              <TransactionsList selectedAccount={selectedAccount} />
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="border-2 border-error gap-4 w-full h-full">
      {/* <div className="p-2 gap-4 w-full h-full"> */}
        
      </div>

      {isModalOpen && <CreateTransaction onClose={handleCloseModal} />}
    </div>
  );
}

export default DashboardGrid;
