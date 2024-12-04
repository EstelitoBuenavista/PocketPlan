// pages/transactions
'use client';

import Navbar from "../../components/navbar";
import AccountList from "@/app/components/accountList";
import TransactionsList from "@/app/components/transactionsList";
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Transactions({ selectedAccount }) {
  const isOverview = !selectedAccount;
  
  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full z-10" />

      <div className="md:px-32 sm:px-16 m-4 mt-8 mb-16">
        <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-bold my-4 text-primary">Manage Accounts</h1>
            <button
              className="btn btn-primary btn-sm"
              // onClick={handleAddTransactionClick}
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
    </div>
  );
}
