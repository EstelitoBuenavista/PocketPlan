// pages/accounts
'use client';

import { useState } from 'react';
import Navbar from "../../components/navbar";
import NewAccModal from '../../components/newAccModal';
import AccountCard from '@/app/components/accountCard';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Accounts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAccountClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full" />

      <div className="md:px-32 sm:px-16 m-4 mt-8">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-bold my-4 text-primary">Manage Accounts</h1>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddAccountClick}
            aria-label="Create New Account"
          >
            <PlusIcon className="w-4 h-4 stroke-[3]" />
            New Account
          </button>
        </div>
        {/* fixing how it should like listed */}
        <div className="border-2 border-error h-[75vh] overflow-y-auto">
          <div className="border-2 border-success grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountCard />
          </div>
        </div>
      </div>

      {isModalOpen && <NewAccModal onClose={ handleCloseModal } />}
    </div>
  );
}
