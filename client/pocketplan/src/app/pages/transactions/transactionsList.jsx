// components/transactionsList
'use client';

import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect, useContext } from 'react';
import TransactionRow from './transactionRow';
import UpdateTransaction from './updateTransaction';
import { triggerContext } from '../dashboard/accountList';

function TransactionsList({ selectedAccount, renderTrigger, trigger }) { 
  const router = useRouter()
  const [accountTrigger, setAccountTrigger] = useContext(triggerContext)
  const [flag, setFlag] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [updateTransaction, setUpdateTransaction] = useState({})

  const renderTransactions = () => {
    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } 
    if (!token){
      router.push('/pages/login')
    }
    fetch(`http://localhost:4000/transaction/user/${id}`)
      .then(response => response.json())
      .then(data => {
        setTransactions(data)
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
  
  useEffect(() => {
    renderTransactions()
   }, [])
   useEffect(() => {
    renderTransactions()
    setAccountTrigger(!accountTrigger)
   }, [isModalOpen, renderTrigger, flag])
  
  const filteredTransactions = selectedAccount
    ? transactions.filter(transaction => transaction.account_id === selectedAccount.id)
    : transactions;

  const [activeTransactionId, setActiveTransactionId] = useState(null);

  const toggleDetails = (id) => {
    setActiveTransactionId(prev => prev === id ? null : id);
  };

  const containerStyle = filteredTransactions.length > 0
    ? "overflow-x-auto max-h-[75vh] md:h-[60vh] rounded"
    : "rounded py-0";

  return (
    <div className="border-2 border-error w-full h-full">
      <div className={containerStyle}>
        <table className="table table-xs rounded-xl bg-base-100 text-neutral-content table-fixed border-spacing-1 w-full min-w-[600px]">
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
                  toggleDetails={() => {toggleDetails(transaction.id); setFlag(!flag); trigger()}}
                  update = {() => setIsModalOpen(true)}
                  setUpdateTransaction = {setUpdateTransaction}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-error">No transaction history found for this account.</td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && <UpdateTransaction onClose={() => {setIsModalOpen(false);setFlag(!flag); trigger()}} transaction={updateTransaction}/>}
      </div>
    </div>
  );
}

export default TransactionsList;
