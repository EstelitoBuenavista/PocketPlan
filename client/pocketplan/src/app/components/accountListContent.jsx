'use client';

import React, { useState } from 'react';
import DashboardContent from './dashboardContent';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function AccountListContent() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      userID: 101,
      balance: 1500.75,
      accountType: 'Checking',
      accountName: 'Main Checking',
    },
    {
      id: 2,
      userID: 101,
      balance: 3000.5,
      accountType: 'Savings',
      accountName: 'Emergency Savings',
    },
    {
      id: 3,
      userID: 103,
      balance: 4500.25,
      accountType: 'Business',
      accountName: 'Company',
    },
    {
      id: 4,
      userID: 104,
      balance: 750.4,
      accountType: 'Savings',
      accountName: 'Retirement Fund',
    },
  ]);

  // Default view is "Overview"
  const [selectedAccountId, setSelectedAccountId] = useState(0);

  const addNewAccount = () => {
    const newAccount = {
      id: accounts.length + 1,
      userID: 101,
      balance: 0.0,
      accountType: 'Checking',
      accountName: `Account ${accounts.length + 1}`,
    };
    setAccounts([...accounts, newAccount]);
  };

  const handleTabSelect = (accountId) => {
    setSelectedAccountId(accountId);
  };

  const selectedAccount =
    selectedAccountId === 0
      ? null
      : accounts.find((account) => account.id === selectedAccountId);

  return (
    <div className="dashContent">
      <div className="flex items-center">
        <div
          role="tablist"
          className="tabs gap-3 tabs-xs flex items-center justify-start w-full"
        >
          {/* Default overview tab */}
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

          {/* List other accounts */}
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

          {/* Add new account button */}
          <button
            type="button"
            className="tab rounded-t text-primary hover:scale-110"
            onClick={addNewAccount}
            aria-label="Add New Account"
          >
            <PlusCircleIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Display the content of the selected tab */}
      <div className="mt-2">
        <DashboardContent accountProp={selectedAccount || null} />
      </div>
    </div>
  );
}

export default AccountListContent;
