// components/categoryBadge
'use client';

import { useState } from 'react';
import DeleteModal from '@/app/components/deleteModal';
import { XMarkIcon } from "@heroicons/react/24/outline";

function CategoryBadge( {category, onDelete} ) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteClick = () => setIsModalOpen(true);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:4000/category/${category.id}/${category.user_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      onDelete(category.id); // Call the onDelete function passed as a prop
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="badge badge-outline badge-primary flex items-center hover:badge-outline hover:badge-secondary">
      <span className="font-medium text-xs p-2">{category.name}</span>
      <button
        onClick={handleDeleteClick}
        className="btn btn-ghost p-0 m-0 w-auto h-auto hover:bg-transparent focus:outline-none"
        aria-label={`Remove ${category.name}`}
      >
        <XMarkIcon className="w-3 h-3" />
      </button>

      {isModalOpen && <DeleteModal onClose={handleCloseModal} onDelete={handleDelete}/>}
    </div>
  );
}

export default CategoryBadge;