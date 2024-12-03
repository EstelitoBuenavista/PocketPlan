'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import NewAccModal from "@/app/components/newAccModal";

function AccountList({ children }) {
  // State for accounts and selected account
  const [accounts, setAccounts] = useState([
    { id: 1, userID: 101, balance: 1500.75, accountType: 'Checking', accountName: 'Main Checking' },
    { id: 2, userID: 101, balance: 3000.5,  accountType: 'Savings', accountName: 'Emergency Savings' },
    { id: 3, userID: 103, balance: 4500.25, accountType: 'Business', accountName: 'Company' },
    { id: 4, userID: 104, balance: 750.4,   accountType: 'Savings', accountName: 'Retirement Fund' },
  ]);
  const [selectedAccountId, setSelectedAccountId] = useState(0); // Overview is default
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabSelect = (accountId) => setSelectedAccountId(accountId);
  const handleAddAccountClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const selectedAccount =
    selectedAccountId === 0 ? null : accounts.find((account) => account.id === selectedAccountId);

  return (
    <div>
      <div className="flex items-center">
        <div
          role="tablist"
          className="tabs gap-3 tabs-xs flex items-center justify-start w-full"
        >
          {/* Overview tab */}
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
          {accounts.map((account) => (
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
              {account.accountName}
            </button>
          ))}

          {/* Add account button */}
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

      {/* New Account Modal */}
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
