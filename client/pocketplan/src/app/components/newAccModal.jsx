// components/newAccModal
'use client';

import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode'

function NewAccModal({ onClose }) {
  const [selectedType, setSelectedType] = useState('Others'); // Default to 'Others'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] =  useState('')
  const [balance, setBalance] = useState(0)
  const token = localStorage.getItem('token');

  const handleSubmit = (e) =>{
    e.preventDefault()

    const newStudent = {
      user_id : (jwtDecode(token).userId).toString(),
      balance : balance,
      name : name,
      type : selectedType,
    };

    fetch(`http://localhost:4000/account/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error creating Account", error);
      });
  }

  const handleDropdownSelect = (value) => {
    setSelectedType(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
        
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle h-full" open>
        <div className="modal-box bg-neutral text-neutral-content relative p-8">
          <h3 className="font-bold text-xl sm:text-lg">Create a New Account</h3>
          <p className="py-2 text-sm sm:text-base">Fill in the details for the new account.</p>

          <label className="form-control w-full mb-4">
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

          <label className="form-control w-full mb-4">
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

          <label className="form-control w-full mb-4">
            <div className="label">
              <span className="font-light text-xs">Account Type</span>
            </div>
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 btn-success w-full text-left"
                onClick={toggleDropdown}
              >
                {selectedType}
              </div>

              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-neutral rounded-box z-[1] p-2 shadow absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-full "
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

          <div className="modal-action flex items-center justify-between space-x-4 flex-wrap">
            <button className="btn btn-accent btn-md w-full sm:w-auto" onClick={onClose}>
              Cancel
            </button>
            {/* IF continue then append the new account into the list */}
            <button className="btn btn-primary btn-md w-full sm:w-auto" onClick={(e) => {handleSubmit(e);onClose()}}>
              Continue
            </button>
          </div>
        </div>
      </dialog>
      
    </div>
  );
}

export default NewAccModal;