// components/navbar
'use client'

import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
  RectangleGroupIcon,
  PresentationChartBarIcon,
  ReceiptPercentIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <img
          className="btn btn-ghost cursor-pointer p-1"
          src="/assets/pocketPlanLogo.svg"
          alt="Logo"
          width={120}
          height={120}
          onClick={() => router.push('/pages/dashboard')}
        />
      </div>

      <div className="flex flex-1 justify-end items-center px-0">
        <div className="flex">
          <ul className="flex space-x-4">
            <li>
              <button
                aria-label="Dashboard"
                className={`flex items-center justify-center transition-transform hover:scale-110 ${
                    isActive('/pages/dashboard') ? 'text-primary' : 'text-neutral-content'
                }`}
                onClick={() => router.push('/pages/dashboard')}>
                <RectangleGroupIcon className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                aria-label="Charts"
                className={`flex items-center justify-center transition-transform hover:scale-110 ${
                    isActive('/pages/charts') ? 'text-primary' : 'text-neutral-content'
                }`}
                onClick={() => router.push('/pages/charts')}>
                <PresentationChartBarIcon className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                aria-label="Transactions"
                className={`flex items-center justify-center transition-transform hover:scale-110 ${
                    isActive('/pages/transactions') ? 'text-primary' : 'text-neutral-content'
                }`}
                onClick={() => router.push('/pages/transactions')}>
                <ReceiptPercentIcon className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                aria-label="Accounts"
                className={`flex items-center justify-center transition-transform hover:scale-110 ${
                    isActive('/pages/accounts') ? 'text-primary' : 'text-neutral-content'
                }`}
                onClick={() => router.push('/pages/accounts')}>
                <CreditCardIcon className="w-6 h-6" />
              </button>
            </li>
          </ul>
        </div>

        <hr className="border-l border-neutral-content mx-5 my-2 h-6" />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar p-0">
            <div className="w-9 h-9 rounded-lg">
              {/* Image of user should be here */}
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow text-neutral-content">
            <li>
              <a>
                <UserIcon className="w-4 h-4" />
                Profile
              </a>
            </li>
            <li>
              <a className="text-custom-gray">
                <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;