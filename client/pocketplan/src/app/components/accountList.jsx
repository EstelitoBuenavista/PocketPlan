// components/accountList
'use client';

import { PlusIcon } from '@heroicons/react/24/outline';

function AccountList({ accounts, selectedAccountId, onTabSelect, onAddAccountClick }) {
  return (
    <div className="flex items-center">
      <div
        role="tablist"
        className="tabs gap-3 tabs-xs flex items-center justify-start w-full"
      >
        {/* Overview tab default */}
        <button
          type="button"
          role="tab"
          className={`tab rounded px-4 hover:scale-110 ${
            selectedAccountId === 0
              ? 'tab-active font-bold text-primary bg-accent'
              : 'text-secondary'
          }`}
          aria-label="Overview"
          onClick={() => onTabSelect(0)}
        >
          Overview
        </button>

        {/* Other account tabs */}
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
            onClick={() => onTabSelect(account.id)}
          >
            {account.accountName}
          </button>
        ))}

        {/* Create new account button */}
        <button
          type="button"
          className="tab rounded-t text-primary hover:scale-110"
          onClick={onAddAccountClick}
          aria-label="Add New Account"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default AccountList;
