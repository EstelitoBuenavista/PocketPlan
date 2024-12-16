// components/dashboardGrid
'use client';

import { triggerContext } from './accountList';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import TotalCard from './totalCard'
import CreateTransaction from '../transactions/createTransaction';
import TransactionsList from "@/app/pages/transactions/transactionsList";
import DailyExpenseChart from "../charts/dailyExpenseChart";
import CategoryPieChart from '../charts/categoryPieChart';
import CategoryMixBarChart from '../charts/categoryMixBarChart';
import {
  ArrowUpRightIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

function DashboardGrid({ selectedAccount }) {
  const router = useRouter()
  const [accountTrigger, setAccountTrigger] = useContext(triggerContext)
  const [flag, setFlag] = useState(false)
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

    fetch(`http://localhost:4000/account/usertotal/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
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

   useEffect(() => {
    getTotal()
    setAccountTrigger(!accountTrigger)
   }, [isModalOpen, flag])

  const handleAddAccountClick = () => setIsModalOpen(true);
  const handleCloseModal = () => {setIsModalOpen(false);setFlag(!flag)}

  return (
    <div className="grid h-full sm:grid-cols-[4fr_2fr] grid-cols-1 gap-4 w-full">
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
          <div className="p-4 bg-base-100 rounded-xl p-6 ">
            <h3 className="text-2xl font-medium mb-4 text-neutral">Daily Overview</h3>
            <div className="w-full h-80 ">
              <DailyExpenseChart />
            </div>
          </div>
          
          {/* Transaction div */}
          <div className="bg-base-100 rounded-xl p-6 ">
            <div className="flex items-center mb-4 justify-between ">
              <button 
                className="text-2xl font-medium text-neutral flex gap-2 items-center hover:underline"
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
            <div className="bg-base-100 rounded-xl overfl">
              <TransactionsList selectedAccount={ selectedAccount } renderTrigger = { flag } trigger = {()=>setFlag(!flag)}/>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-4 w-full h-full">
      {/* <div className="p-2 gap-4 w-full h-full"> */}
        <div className="bg-base-100 rounded-xl p-5 ">
          <h3 className="text-2xl font-medium mb-4 text-neutral text-center flex justify-start">
            Category Trends
          </h3>
          <div className="w-full h-[200px]">
            <CategoryPieChart />
          </div>
        </div>
        <div className="bg-base-100 rounded-xl p-5 ">
          <h3 className="text-2xl font-medium mb-4 text-neutral text-center flex justify-start">
            Categorized Expenses
          </h3>
          <div className="w-full h-[300px]">
            <CategoryMixBarChart />
          </div>
        </div>
      </div>

      {isModalOpen && <CreateTransaction onClose={handleCloseModal} account = { selectedAccount }/>}
    </div>
  );
}

export default DashboardGrid;
