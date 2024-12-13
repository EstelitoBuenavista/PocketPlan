// components/dashboardGrid
'use client';

import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TotalCard from './totalCard'
import CreateTransaction from './createTransaction';
import TransactionsList from "@/app/components/transactionsList";
import {
  ArrowUpRightIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

function DashboardGrid({ selectedAccount }) {
  const router = useRouter()
  const [flag, setFlag] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOverview = !selectedAccount;
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } 

  const getTotal = () => {
    if (!token){
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

   useEffect(() => {
    getTotal()
   }, [isModalOpen, flag])

  const handleAddTransactionClick = () => {setIsModalOpen(true)}
  const handleCloseModal = () => {setIsModalOpen(false); setFlag(!flag)}

  return (
    <div className="grid h-full sm:grid-cols-[4fr_2fr] grid-cols-1 gap-4 w-full">
      {/* LEFT COLUMN */}
      <div className="border-2 border-error p flex flex-wrap gap-4">
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
        
        <div className="border-2 border-primary">
          <div className="flex items-center justify-between">
            <button 
              className="text-2xl font-medium my-4 text-neutral flex gap-2 items-center hover:underline"
              onClick={() => {
                if (selectedAccount) {
                  router.push(`/pages/transactions?accountId=${ selectedAccount.id }`);
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
              onClick={handleAddTransactionClick}
              aria-label="Create New Transaction"
            >
              <PlusIcon className="w-4 h-4 stroke-[3]" />
              New Transaction
            </button>
          </div>

          <TransactionsList selectedAccount={ selectedAccount } renderTrigger = { flag } trigger = {()=>setFlag(!flag)}/>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="border-2 border-error gap-4 w-full h-full">
      {/* <div className="p-2 gap-4 w-full h-full"> */}
        
    </div>
      {isModalOpen && <CreateTransaction onClose={handleCloseModal} account = { selectedAccount }/>}
    </div>
  );
}

export default DashboardGrid;
