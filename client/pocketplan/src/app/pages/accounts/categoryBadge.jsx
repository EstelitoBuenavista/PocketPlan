// components/categoryBadge
'use client';

import { useState } from 'react';
import DeleteModal from '@/app/components/deleteModal';
import { XMarkIcon } from "@heroicons/react/24/outline";

function CategoryBadge( {category} ) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteClick = () => setIsModalOpen(true);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="badge badge-outline badge-primary flex items-center hover:badge-outline hover:badge-secondary">
      <span className="font-medium text-xs p-2">{category}</span>
      <button
        onClick={handleDeleteClick}
        className="btn btn-ghost p-0 m-0 w-auto h-auto hover:bg-transparent focus:outline-none"
        aria-label={`Remove ${category}`}
      >
        <XMarkIcon className="w-3 h-3" />
      </button>

      {isModalOpen && <DeleteModal onClose={handleCloseModal} />}
    </div>
  );
}

export default CategoryBadge;