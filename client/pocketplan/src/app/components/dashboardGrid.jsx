// components/dashboardGrid
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TotalCard from './totalCard'
import CreateTransaction from './createTransaction';
import TransactionsList from "@/app/components/transactionsList";
import {
  ArrowUpRightIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

function DashboardGrid({ selectedAccount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOverview = !selectedAccount;

  const router = useRouter(); 
  const handleAddAccountClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="grid h-full sm:grid-cols-[4fr_2fr] grid-cols-1 gap-4 w-full">
      {/* LEFT COLUMN */}
      <div className="border-2 border-error p flex flex-wrap gap-4">
      {/* <div className="py-2 flex flex-wrap gap-4"> */}
        <TotalCard
          title={`Balance`}
          value={isOverview ? '-' : selectedAccount.balance}
        />
        <TotalCard
          title={`Expenses`}
          // add logic for EXPENSES HERE
          value={isOverview ? '-' : selectedAccount.balance * 0.3}
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
              onClick={handleAddAccountClick}
              aria-label="Create New Transaction"
            >
              <PlusIcon className="w-4 h-4 stroke-[3]" />
              New Transaction
            </button>
          </div>

          <TransactionsList selectedAccount={ selectedAccount }/>
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
