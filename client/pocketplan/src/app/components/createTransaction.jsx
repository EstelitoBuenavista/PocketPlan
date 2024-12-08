// components/createTransaction
'use client';

import React, { useState } from 'react';

function CreateTransaction({ onClose }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectAccount, setselectAccount] = useState('Select Account');
  const [selectCategory, setselectCategory] = useState('Select Category');
  const [selectedTransactionType, setSelectedTransactionType] = useState('');

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="modal-box bg-base-100 text-neutral relative p-8">
        <h3 className="font-bold text-xl sm:text-lg">Create Transaction</h3>
        <p className="py-2 text-sm sm:text-base">Fill in the fields to create a new transaction.</p>
        
        
          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Title</span>
            </div>
            <input
              type="text"
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
                type="text"
                placeholder="ex. 100.00"
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
              />
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Remarks</span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
              placeholder="Place remarks here..."
            />
          </label>

            <div className="flex items-center justify-center gap-4">
                <label className="form-control w-full">
                    <div className="label">
                    <span className="font-light text-xs">Account Type</span>
                    </div>
                    <div className="dropdown w-full relative">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-success btn-sm w-full text-left"
                        onClick={() => {toggleDropdown();}}
                    >
                        {/* make this to select category */}
                        {selectAccount}
                    </div>

                    {isDropdownOpen && (
                        <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-full"
                        >
                        {/* list the accounts of the user here  */}
                        </ul>
                    )}
                    </div>
                </label>

                <label className="form-control w-full">
                    <div className="label">
                    <span className="font-light text-xs">Category</span>
                    </div>
                    <div className="dropdown w-full relative">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-success btn-sm w-full text-left"
                        onClick={() => {toggleDropdown()}}
                    >
                        {selectCategory}
                    </div>

                    {isDropdownOpen && (
                        <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-full"
                        >
                        {/* list the accounts of the user here  */}
                        </ul>
                    )}
                    </div>
                </label>
            </div>

            <div className="flex items-center justify-between px-[15%]">
                <div className="form-control">
                    <label className="cursor-pointer label gap-2 flex align-center justify-center mt-4">
                        <input 
                            type="checkbox" 
                            className="checkbox checkbox-neutral" 
                            checked={selectedTransactionType === 'Expense'}
                            onChange={() => {handleCheckboxChange('Expense')}}
                        />
                        <span className="label-text font-bold">Expense</span>
                    </label>
                </div>
                <div className="form-control flex align-center justify-center">
                        <label className="cursor-pointer label gap-2 flex align-center justify-center mt-4">
                            <input 
                                type="checkbox" 
                                className="checkbox checkbox-neutral" 
                                checked={selectedTransactionType === 'Income'}
                                onChange={() => {handleCheckboxChange('Income')}}
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
            >
              Continue
            </button>
          </div>
        
      </div>
    </div>
  );
}

export default CreateTransaction;
