'use client';

import React, { useState, useEffect } from 'react';
import DashboardContent from './dashboardContent';
import NewAccModal from './newAccModal'; // Import the modal component
import { PlusIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';


function AccountList({ children }) {
  // State for accounts and selected account
  const [accounts, setAccounts] = useState([])
  const [selectedAccountId, setSelectedAccountId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token")
  const id = (jwtDecode(token).userId).toString()

  const renderAccounts = () => {
    fetch(`http://localhost:4000/account/user/${id}`)
      .then(response => response.json())
      .then(data => {
        setAccounts (data)
        console.log(data)
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }

  useEffect(() => {
    renderAccounts()
   }, [])

  useEffect(() => {
    renderAccounts()
   }, [isModalOpen])

  const handleTabSelect = (accountId) => {
    setSelectedAccountId(accountId);
  };

  const handleAddAccountClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const selectedAccount =
    selectedAccountId === 0
      ? null
      : accounts.find((account) => account.id === selectedAccountId);

  return (
    <div>
      <div className="flex items-center">
        <div
          role="tablist"
          className="tabs gap-3 tabs-xs flex items-center justify-start w-full"
        >
          {/* Overview tab (default) */}
          <button
            type="button"
            role="tab"
            className={`tab rounded px-4 hover:scale-110 ${
              selectedAccountId === 0
                ? 'tab-active font-bold text-primary bg-accent'
                : 'text-secondary'
            }`}
            aria-label="Overview"
            onClick={() => handleTabSelect(0)}
          >
            Overview
          </button>

          {/* Account tabs */}
          {accounts && accounts.map((account) => (
            <button
              key={account.id}
              type="button"
              role="tab"
              className={`tab rounded px-4 hover:scale-110 ${
                selectedAccountId === account.id
                  ? 'tab-active font-bold text-primary bg-accent'
                  : 'text-secondary'
              }`}
              aria-label={`Account ${account.id}`}
              onClick={() => handleTabSelect(account.id)}
            >
              {account.name}
            </button>
          ))}

          <button
            type="button"
            className="tab rounded-t text-primary hover:scale-110"
            onClick={handleAddAccountClick}
            aria-label="Add New Account"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Render children with the selected account */}
       {children({ selectedAccount })}

      {isModalOpen && (
        <NewAccModal
          onClose={handleCloseModal}
          setAccounts={setAccounts}
        />
      )}
    </div>
  );
}

export default AccountList;
