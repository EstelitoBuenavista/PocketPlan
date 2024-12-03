// pages/dashboard
'use client';

import { useState } from 'react';
import Navbar from "../../components/navbar";
import AccountList from "@/app/components/accountList";
import DashboardContent from "@/app/components/dashboardContent";
import NewAccModal from "@/app/components/newAccModal";

export default function Dashboard() {
  // temp static dummuy data
  const [accounts, setAccounts] = useState([
    { id: 1, userID: 101, balance: 1500.75, accountType: 'Checking', accountName: 'Main Checking' },
    { id: 2, userID: 101, balance: 3000.5,  accountType: 'Savings', accountName: 'Emergency Savings' },
    { id: 3, userID: 103, balance: 4500.25, accountType: 'Business', accountName: 'Company' },
    { id: 4, userID: 104, balance: 750.4,   accountType: 'Savings', accountName: 'Retirement Fund' },
  ]);

  const [selectedAccountId, setSelectedAccountId] = useState(0); // overview is default view
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabSelect = (accountId) => setSelectedAccountId(accountId);
  const handleAddAccountClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const selectedAccount =
    selectedAccountId === 0 ? null : accounts.find((account) => account.id === selectedAccountId);

  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full z-10" />

      <div className="md:px-32 sm:px-16 m-4 mt-8">
        <h1 className="text-2xl font-bold my-4 text-primary">Dashboard</h1>

        {/* lists user's account */}
        <AccountList
          accounts={accounts}
          selectedAccountId={selectedAccountId}
          onTabSelect={handleTabSelect}
          onAddAccountClick={handleAddAccountClick}
        />

        {/* show the content of the selected account only */}
        <div className="mt-4">
          <DashboardContent selectedAccount={selectedAccount} />
        </div>
      </div>

      {isModalOpen && (
        <NewAccModal
          onClose={handleCloseModal}
          setAccounts={setAccounts}
        />
      )}
    </div>
  );
}
