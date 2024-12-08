'use client';

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function AccountList({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(0);

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

  const handleTabSelect = (accountId) => {
    setSelectedAccountId(accountId);
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
        </div>
      </div>

      {/* Render children with the selected account */}
       {children({ selectedAccount })}
    </div>
  );
}

export default AccountList;
