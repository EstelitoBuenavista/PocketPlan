// pages/transactions
'use client';

import { useState } from 'react';
import Navbar from "../../components/navbar";
import AccountList from "@/app/pages/dashboard/accountList";
import TransactionsList from "@/app/pages/transactions/transactionsList";
import CreateTransaction from '@/app/pages/transactions/createTransaction';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Transactions({ selectedAccount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOverview = !selectedAccount;

  const handleAddAccountClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full" />

      <div className="md:px-32 sm:px-16 m-4 mt-8 mb-16">
        <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-bold my-4 text-primary">Transactions History</h1>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddAccountClick}
              aria-label="Create New Transaction"
            >
              <PlusIcon className="w-4 h-4 stroke-[3]" />
              New Transaction
            </button>
          </div>

        <AccountList>
          {({ selectedAccount }) => (
            <div className="mt-4">
              <TransactionsList selectedAccount={selectedAccount}/>
            </div>
          )}
        </AccountList>

        
      </div>
      {isModalOpen && <CreateTransaction onClose={handleCloseModal} />}
    </div>
  );
}
