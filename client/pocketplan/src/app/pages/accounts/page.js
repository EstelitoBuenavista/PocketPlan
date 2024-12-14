// pages/accounts
'use client';

import { useEffect, useState } from 'react';
import Navbar from "../../components/navbar";
import NewAccModal from '../../components/newAccModal';
import AccountCard from '@/app/components/accountCard';
import { PlusIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';

export default function Accounts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const handleAddAccountClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  useEffect(() => {
    // Fetch accounts from the backend
    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } else {
    router.push('/pages/login')
    }
    fetch(`http://localhost:4000/account/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

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
          {accounts.map(account => (
            <AccountCard key={account.id} account={account} />
          ))} 
        </div>
        </div>
      </div>

      {isModalOpen && <NewAccModal onClose={ handleCloseModal } />}
    </div>
  );
}
