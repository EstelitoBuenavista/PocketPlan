// components/newAccModal
'use client';

import React, { useState } from 'react';

function NewCategoryModal({ onClose }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // category logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
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
