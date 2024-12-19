'use client';
import { useState } from 'react';

function UpdateDeleteModal({ account, onClose, onAccountDeleted, onAccountUpdated }) {
    const [name, setName] = useState(account?.name || '');
    const [balance, setBalance] = useState(account?.balance || 0);
    const [type, setType] = useState(account?.type || '');
  
  // Handle account update
    const handleUpdate = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:4000/account/${account.id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            balance,
            type,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update account');
        }
        const updatedAccount = await response.json();
        // If the update succeeds, you might want to refetch accounts in the parent
        // or directly update state if you have a callback to the parent.
        onAccountUpdated(updatedAccount);
        onClose(); 
      } catch (error) {
        console.error('Error updating account:', error);
      }
    };
  
  // Handle account deletion
    const handleDelete = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:4000/account/${account.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete account');
        }
  
        // If the deletion succeeds, you should remove the account from the list in the parent.
        // You can either refetch accounts in the parent or handle it there.
        onAccountDeleted(account.id);
        onClose();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="modal-box bg-base-100 text-neutral relative p-8">
            <h2 className="font-bold text-xl sm:text-lg">Update Account</h2>
            <div className="mb-4">
              <label className="font-light text-xs">Name</label>
              <input 
                type="text" 
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
    
            <div className="mb-4">
              <label className="font-light text-xs">Balance</label>
              <input 
                type="number" 
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>
    
            <div className="mb-4">
              <label className="font-light text-xs">Type</label>
              <input 
                type="text" 
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
    
            <div className="modal-action flex justify-between">
              <button className="btn btn-error" onClick={handleDelete}>Delete</button>
              <div>
                <button className="btn btn-ghost mr-2" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default UpdateDeleteModal;