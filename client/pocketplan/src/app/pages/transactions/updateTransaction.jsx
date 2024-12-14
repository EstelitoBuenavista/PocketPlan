// components/createTransaction
'use client';

import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

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


function UpdateTransaction({ onClose, transaction }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [title, setTitle] = useState(transaction.title);
  const [selectCategory, setSelectCategory] = useState(transaction.category_id);
  const [amount, setAmount] = useState(transaction.amount);
  const [description, setDescription] = useState(transaction.remarks);
  const [categories, setCategories] = useState([]);
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const id = (jwtDecode(token).userId).toString()
  useEffect(() => {
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
      account_id : transaction.account_id,
      category_id : selectCategory,
      title : title,
      amount : parseFloat(amount),
      type : transaction.type,
      remarks : description,
      transaction_date : transaction.transaction_date,
    };
    
    fetch(`http://localhost:4000/transaction/${transaction.id}`, {
      method: 'PUT',
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

  const handleCategorySelect = (categoryId) => {
    setSelectCategory(categoryId);
    setIsCategoryDropdownOpen(false);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="modal-box bg-base-100 text-neutral relative p-8">
        <h3 className="font-bold text-xl sm:text-lg">Update Transaction</h3>
        <p className="py-2 text-sm sm:text-base">Change the fields to update the transactions.</p>
        
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
            label="Category"
            placeholder="Select Category" 
            items={categories}
            selectedId={selectCategory}
            onSelect={handleCategorySelect}
            isOpen={isCategoryDropdownOpen}
            toggleOpen={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          />
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

export default UpdateTransaction;
