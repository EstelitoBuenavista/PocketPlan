// components/transactionsList
'use client';

import { useState } from 'react';
import TransactionRow from './transactionRow';

function TransactionsList({ selectedAccount }) {
  const dummyData = [
    { id: 1,  accountId: "Title1",  categoryId: "C001", amount: 150.00, remarks: "Payment for services",           transactionDate: "2024-12-03 10:30 AM" },
    { id: 2,  accountId: "Title2",  categoryId: "C002", amount: 250.00, remarks: "Refund from vendor",             transactionDate: "2024-12-02 08:15 AM" },
    { id: 3,  accountId: "Title3",  categoryId: "C003", amount: 100.00, remarks: "Purchase of office supplies",    transactionDate: "2024-11-30 02:45 PM" },
    { id: 4,  accountId: "Title4",  categoryId: "C004", amount: 500.00, remarks: "Salary payment",                 transactionDate: "2024-12-01 05:00 PM" },
    { id: 5,  accountId: "Title5",  categoryId: "C005", amount: 200.00, remarks: "Client payment",                 transactionDate: "2024-12-05 01:30 PM" },
    { id: 6,  accountId: "Title6",  categoryId: "C006", amount: 350.00, remarks: "Refund for cancellation",        transactionDate: "2024-12-06 09:00 AM" },
    { id: 7,  accountId: "Title7",  categoryId: "C007", amount: 420.00, remarks: "Payment for products",           transactionDate: "2024-12-07 03:00 PM" },
    { id: 8,  accountId: "Title8",  categoryId: "C008", amount: 330.00, remarks: "Service charge",                 transactionDate: "2024-12-08 11:15 AM" },
    { id: 9,  accountId: "Title9",  categoryId: "C009", amount: 180.00, remarks: "Vendor payment",                 transactionDate: "2024-12-09 04:20 PM" },
    // { id: 10, accountId: "Title10", categoryId: "C010", amount: 450.00, remarks: "Sales revenue",                  transactionDate: "2024-12-10 07:25 AM" },
    // { id: 11, accountId: "Title11", categoryId: "C011", amount: 220.00, remarks: "Payment for consultation",       transactionDate: "2024-12-11 08:40 AM" },
    // { id: 12, accountId: "Title12", categoryId: "C012", amount: 500.00, remarks: "Payment for subscription",       transactionDate: "2024-12-12 09:00 AM" },
    // { id: 13, accountId: "Title13", categoryId: "C013", amount: 600.00, remarks: "Invoice payment",                transactionDate: "2024-12-13 01:00 PM" },
    // { id: 14, accountId: "Title14", categoryId: "C014", amount: 350.00, remarks: "Rent payment",                   transactionDate: "2024-12-14 11:10 AM" },
    // { id: 15, accountId: "Title15", categoryId: "C015", amount: 120.00, remarks: "Service payment",                transactionDate: "2024-12-15 10:30 AM" },
    // { id: 16, accountId: "Title16", categoryId: "C016", amount: 430.00, remarks: "Product purchase",               transactionDate: "2024-12-16 02:15 PM" },
    // { id: 17, accountId: "Title17", categoryId: "C017", amount: 280.00, remarks: "Supplier payment",               transactionDate: "2024-12-17 09:30 AM" },
    // { id: 18, accountId: "Title18", categoryId: "C018", amount: 320.00, remarks: "Consulting services",            transactionDate: "2024-12-18 05:00 PM" },
    // { id: 19, accountId: "Title19", categoryId: "C019", amount: 200.00, remarks: "Refund for overcharge",          transactionDate: "2024-12-19 04:25 PM" },
    // { id: 20, accountId: "Title20", categoryId: "C020", amount: 550.00, remarks: "Payment for training",           transactionDate: "2024-12-20 03:10 PM" },
  ];
  
  const filteredTransactions = selectedAccount
    ? dummyData.filter(transaction => transaction.accountId === selectedAccount.accountId)
    : dummyData;

  const [activeTransactionId, setActiveTransactionId] = useState(null);

  const toggleDetails = (id) => {
    setActiveTransactionId(prev => prev === id ? null : id);
  };

  const containerStyle = filteredTransactions.length > 0
    ? "overflow-x-auto max-h-[75vh] md:h-[60vh] rounded"
    : "rounded py-0";

  return (
    <div className="overflow-hidden w-full h-full rounded">
      <div className={containerStyle}>
        <table className="table table-xs rounded-lg bg-base-100 text-neutral-content table-fixed border-spacing-1 w-full max-w-full">
          <thead>
            <tr className="text-primary sticky top-0 bg-secondary">
              <th className="break-words whitespace-normal">Title</th>
              <th className="break-words whitespace-normal">Category</th>
              <th className="break-words whitespace-normal">Amount</th>
              <th className="break-words whitespace-normal">Remarks</th>
              <th className="break-words whitespace-normal">Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  isOpen={activeTransactionId === transaction.id}
                  toggleDetails={() => toggleDetails(transaction.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-error">No transaction history found for this account.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsList;
