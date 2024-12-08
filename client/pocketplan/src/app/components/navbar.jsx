// components/navbar
'use client'

import { 
  usePathname, 
  useRouter 
} from 'next/navigation';
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
    <div className="navbar bg-base-100 shadow-[0_1_60px_rgba(0,0,0,0.15)] sticky top-0">
      <div className="flex-1">
        <img
          className="pl-2"
          src="/assets/pocketPlanLogo.svg"
          alt="Logo"
          width={120}
          height={120}
          onClick={() => router.push('/pages/dashboard')}
        />
      </div>

      <div className="flex flex-1 justify-end items-center px-0">
        <div className="flex">
          <ul className="flex space-x-2">
            <li>
              <button
                aria-label="Dashboard"
                className={`flex items-center justify-center transition-transform hover:scale-110 w-8 h-8 btn-square ${
                    isActive('/pages/dashboard') ? 'text-primary bg-accent rounded' : 'text-neutral'
                }`}
                onClick={() => router.push('/pages/dashboard')}>
                <RectangleGroupIcon className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                aria-label="Charts"
                className={`flex items-center justify-center transition-transform hover:scale-110 w-8 h-8 btn-square ${
                    isActive('/pages/charts') ? 'text-primary bg-accent rounded' : 'text-neutral'
                }`}
                onClick={() => router.push('/pages/charts')}>
                <PresentationChartBarIcon className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                aria-label="Transactions"
                className={`flex items-center justify-center transition-transform hover:scale-110 w-8 h-8 btn-square ${
                    isActive('/pages/transactions') ? 'text-primary bg-accent rounded' : 'text-neutral'
                }`}
                onClick={() => router.push('/pages/transactions')}>
                <ReceiptPercentIcon className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                aria-label="Accounts"
                className={`flex items-center justify-center transition-transform hover:scale-110 w-8 h-8 btn-square ${
                    isActive('/pages/accounts') ? 'text-primary bg-accent rounded' : 'text-neutral'
                }`}
                onClick={() => router.push('/pages/accounts')}>
                <CreditCardIcon className="w-6 h-6" />
              </button>
            </li>
          </ul>
        </div>

        <hr className="border-l-2 border-neutral-content mx-5 my-2 h-7" />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar p-0 hover:bg-base-100">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-neutral">
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