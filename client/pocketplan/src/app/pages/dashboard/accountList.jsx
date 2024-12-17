// components/accountList
'use client';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

export const triggerContext = createContext();

function AccountList({ children }) {
  const router = useRouter();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(0);
  const [accountTrigger, setAccountTrigger] = useState(false);
 
const renderAccounts = () => {
    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } else {
    router.push('/pages/login')
    }
    fetch(`http://localhost:4000/account/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setAccounts (data)
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }

  useEffect(() => {
    renderAccounts()
   }, [])

   useEffect(() => {
    console.log("account render")
    renderAccounts()
   }, [accountTrigger, selectedAccountId])

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
                ? 'tab-active font-bold text-primary bg-secondary'
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
        <triggerContext.Provider value={ [accountTrigger, setAccountTrigger, selectedAccountId] }>
         {children({ selectedAccount })}
        </triggerContext.Provider>
    </div>
  );
}

export default AccountList;
