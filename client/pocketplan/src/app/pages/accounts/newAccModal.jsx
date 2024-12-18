// components/newAccModal
'use client';

import React, { useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'


function NewAccModal({ onClose, onAccountCreated }) {
  const [selectedType, setSelectedType] = useState('Others'); // Default to 'Others'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] =  useState(null);
  const [balance, setBalance] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const newAccount = {
      user_id : (jwtDecode(token).userId).toString(),
      balance : balance,
      name : name,
      type : selectedType,
    };

    try {
    const response = await fetch(`http://localhost:4000/account/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newAccount),
    });

    if (!response.ok) {
      throw new Error('Failed to create account');
    }    
    const createdAccount = await response.json();
      onAccountCreated(createdAccount);
      onClose();
    } catch (error) {
      console.error("Error creating Account", error);
    }
  };

  const handleDropdownSelect = (value) => {
    setSelectedType(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100]">
        <div className="modal-box bg-base-100 text-neutral relative p-8">
          <h3 className="font-bold text-xl sm:text-lg">Create a New Account</h3>
          <p className="py-2 text-sm sm:text-base">Fill in the fields for a new account.</p>

          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Account Name</span>
            </div>
            <input
              type="text"
              placeholder="ex. Personal Funds"
              onChange={e => setName(e.target.value)}
              className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Balance</span>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-normal text-base">₱</p>
              <input
                type="text"
                placeholder="ex. 10892.00"
                onChange={e => setBalance(e.target.value)}
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
              />
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Account Type</span>
            </div>
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-success btn-sm w-full text-left"
                onClick={toggleDropdown}
              >
                {selectedType}
              </div>

              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-full "
                >
                  {['Miscellaneous', 'Personal', 'Savings', 'Work', 'Others'].map((type) => (
                    <li key={type} onClick={() => handleDropdownSelect(type)}>
                      <a>{type}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </label>

          <div className="modal-action flex items-center justify-between flex-wrap">
            <button className="btn btn-accent btn-md" onClick={onClose}>
              Cancel
            </button>
            {/* IF continue then append the new account into the list */}
            <button className="btn btn-primary btn-md" onClick={(e) => {handleSubmit(e);onClose()}}>
              Continue
            </button>
          </div>
        </div>
      
    </div>
  );
}

export default NewAccModal;