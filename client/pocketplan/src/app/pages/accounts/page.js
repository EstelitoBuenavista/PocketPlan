// pages/accounts
'use client';

import { useEffect, useState } from 'react';
import Navbar from "../../components/navbar";
import NewAccModal from './newAccModal';
import AccountCard from '@/app/pages/accounts/accountCard';
import CategoryBadge from './categoryBadge';
import NewCategoryModal from './newCategoryModal';
import { PlusIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

export default function Accounts() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const handleAddCategoryClick = () => setIsCategoryModalOpen(true);
  const handleAddAccountClick = () => setIsAccountModalOpen(true);
  
  const handleCloseModal = () => {
    setIsAccountModalOpen(false);
    setIsCategoryModalOpen(false);
  };
  
  const router = useRouter();

  // const categories = [ "music", "food", "shopping", "this is a long category" ];

  useEffect(() => {
    // Fetch accounts from the backend
    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } else {
    router.push('/pages/login')
    }
    fetch(`http://localhost:4000/account/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts:', error));

      fetch(`http://localhost:4000/category/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    // Optionally, you can also perform a fetch DELETE request here if it
    // hasn't been handled inside CategoryBadge.
    setCategories(prevCategories => prevCategories.filter(c => c.id !== categoryId));
  };

  const handleNewCategoryCreated = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <div className="background flex flex-col min-h-screen">
      <Navbar className="fixed top-0 w-full" />

      <div className="md:px-32 sm:px-16 m-4 overflow-x-hidden">
        <h1 className="text-2xl font-bold my-4 text-primary">Manage Accounts and Categories</h1>
        {/* fixing how it should like listed */}
        <div className="bg-base-100 p-5 mb-4 rounded-xl flex flex-col justify-start">
          <div className="flex items-center justify-between">
            <p className="text-neutral font-medium text-xl pb-4">Categories</p>
            <button
              className="btn btn-primary btn-outline btn-sm "
              onClick={handleAddCategoryClick}
              aria-label="Create New Category"
            >
              <PlusIcon className="w-4 h-4 stroke-[3]" />
              New Category
            </button>
          </div>
          <div className="flex items-center justify-start gap-2 flex-wrap">
            {categories.map((category, index) => (
              <CategoryBadge key={category.id} category={category} onDelete={handleDeleteCategory}/>
            ))}
          </div>
        </div>
        <div className=" bg-base-100 p-5 rounded-xl h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <p className="text-neutral font-medium text-xl pb-4">Accounts</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddAccountClick}
              aria-label="Create New Account"
            >
              <PlusIcon className="w-4 h-4 stroke-[3]" />
              New Account
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accounts.map(account => (
              <AccountCard key={account.id} account={account} />
            ))} 
          </div>
        </div>
      </div>

      {isAccountModalOpen && <NewAccModal onClose={handleCloseModal} />}
      {isCategoryModalOpen && <NewCategoryModal onClose={handleCloseModal} onCategoryCreated={handleNewCategoryCreated}/>}
    </div>
  );
}
