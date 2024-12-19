// components/createTransaction
'use client';

import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';

function Dropdown({ 
  label, 
  placeholder, 
  items, 
  selectedId, 
  onSelect, 
  isOpen, 
  toggleOpen 
}) {
  const selectedItemName = items.find(item => item.id === selectedId)?.name || placeholder;

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="font-light text-xs">{label}</span>
      </div>
      <div className="dropdown w-full relative">
        <button
          tabIndex={0}
          type="button"
          className="btn btn-success btn-sm w-full text-left"
          onClick={toggleOpen}
        >
          {selectedItemName}
        </button>

        {isOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-full"
          >
            {items.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => onSelect(item.id)}>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
}


function CreateTransaction({ onClose, account }) {
  const defaultAccount = account ? account.id : ''
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [selectAccount, setSelectAccount] = useState(defaultAccount);
  const [selectCategory, setSelectCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTransactionType, setSelectedTransactionType] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const id = (jwtDecode(token).userId).toString()
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    // Fetch accounts
    fetch(`http://localhost:4000/account/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setAccounts(data);
    })
    .catch(err => console.error('Error fetching accounts:', err));

    // Fetch categories
    fetch(`http://localhost:4000/category/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setCategories(data);
    })
    .catch(err => console.error('Error fetching categories:', err));
  }, [token, id]); 

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTransaction = {
      account_id : selectAccount,
      category_id : selectCategory,
      title : title,
      amount : parseFloat(amount),
      type : selectedTransactionType,
      remarks : description,
      transaction_date : transactionDate,
    };
    
    fetch('http://localhost:4000/transaction/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newTransaction),
    })
    .then(response => response.json())
    .then(data => {
      onClose();
    })
    .catch(error => {
      console.error('Error creating transaction:', error);
    });
  };
  

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleDropdownSelect = (type) => {
    setselectAccount(type);
    setIsDropdownOpen(false);
  };

  const handleCheckboxChange = (type) => {
    setSelectedTransactionType((prev) => (prev === type ? '' : type));
  };

  const handleAccountSelect = (accountId) => {
    setSelectAccount(accountId);
    setIsAccountDropdownOpen(false);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectCategory(categoryId);
    setIsCategoryDropdownOpen(false);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100]">
      <div className="modal-box bg-base-100 text-neutral relative p-8">
        <h3 className="font-bold text-xl sm:text-lg">Create Transaction</h3>
        <p className="py-2 text-sm sm:text-base">Fill in all the fields to create a new transaction. Missing fields will discard the transaction.</p>
        
        <form onSubmit={handleSubmit} >
          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Title</span>
            </div>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Transaction title..."
              className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Amount</span>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-normal text-base">₱</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
              />
            </div>
          </label>

          <label className="label">
            <span className="font-light label-text text-xs">Transaction Date</span>
          </label>
          <input
            type="date"
            max={today}
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
          />

          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Remarks</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
              placeholder="Place remarks here..."
            />
          </label>

          <div className="flex items-left justify-center gap-4">
          <Dropdown
            label="Account"
            placeholder="Select Account"
            items={accounts}
            selectedId={selectAccount}
            onSelect={handleAccountSelect}
            isOpen={isAccountDropdownOpen}
            toggleOpen={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
          />
          

          <Dropdown
            label="Category"
            placeholder="Select Category" 
            items={categories}
            selectedId={selectCategory}
            onSelect={handleCategorySelect}
            isOpen={isCategoryDropdownOpen}
            toggleOpen={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          />
        </div>

            <div className="flex items-center justify-between px-[15%]">
                <div className="form-control">
                    <label className="cursor-pointer label gap-2 flex align-center justify-center mt-4">
                        <input 
                            type="checkbox" 
                            className="checkbox checkbox-neutral" 
                            checked={selectedTransactionType === 'expense'}
                            onChange={() => {handleCheckboxChange('expense')}}
                        />
                        <span className="label-text font-bold">Expense</span>
                    </label>
                </div>
                <div className="form-control flex align-center justify-center">
                        <label className="cursor-pointer label gap-2 flex align-center justify-center mt-4">
                            <input 
                                type="checkbox" 
                                className="checkbox checkbox-neutral" 
                                checked={selectedTransactionType === 'income'}
                                onChange={() => {handleCheckboxChange('income')}}
                            />
                            <span className="label-text font-bold">Income</span>
                        </label>
                    </div>
            </div>
                                
          <div className="modal-action flex items-center justify-between flex-wrap">
            <button
              className="btn btn-accent btn-md"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary btn-md"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTransaction;
