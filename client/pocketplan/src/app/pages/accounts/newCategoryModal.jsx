// components/newAccModal
'use client';

import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function NewCategoryModal({ onClose, onCategoryCreated}) {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // category logic here

    const token = localStorage.getItem('token');

    if (!categoryName) {
      setError('Category name is required');
      return;
    }

    const newCategory = {
      name: categoryName,
      user_id: jwtDecode(token).userId.toString(),
    };

    try {
      const response = await fetch('http://localhost:4000/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const data = await response.json();
      onCategoryCreated(data);
      console.log('Category created:', data);
      onClose(); // Close the modal after successful creation
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Failed to create category');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100]">
      <div className="modal-box bg-base-100 text-neutral relative p-8">
        <h3 className="font-bold text-xl sm:text-lg">Create a New Category</h3>
        <p className="py-2 text-sm sm:text-base">Fill in the field for a new category.</p>

        <form onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="font-light text-xs">Category Name</span>
            </div>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="ex. food"
              className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
            />
          </label>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <div className="modal-action flex items-center justify-between flex-wrap">
            <button
              type="button"
              className="btn btn-accent btn-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCategoryModal;
