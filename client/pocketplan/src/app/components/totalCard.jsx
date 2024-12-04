// components/totalCard
'use client';

import { useState } from "react";
import { 
    WalletIcon,
    BanknotesIcon,
    EyeIcon,
    EyeSlashIcon
} from "@heroicons/react/24/outline";

function TotalCard({ title, value }) {
    const [isVisible, setIsVisible] = useState(true);
    const formattedValue = typeof value === 'number' 
    ? new Intl.NumberFormat('en-US').format(value)  
    : "N/A";
    
    const icon = title === 'Balance' 
        ? <WalletIcon className="w-10 h-10 text-success sm:block hidden md:block hidden" /> 
        : <BanknotesIcon className="w-10 h-10 text-success sm:block hidden md:block hidden" />;

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="stats bg-neutral shadow-[0_1_60px_rgba(0,0,0,0.15)] bg-neutral w-full sm:w-[48%] lg:w-[30%] flex-grow">
            <div className="stat">
                <div className="stat-figure text-primary">
                    {icon}
                </div>
                <div className="flex items-center justify-start mb-2">
                    <div className="stat-title text-neutral-content mr-2">
                        Total {title}
                    </div>
                    <button onClick={toggleVisibility} className="ml-2">
                        {isVisible ? (
                            <EyeIcon className="w-4 h-4 text-custom-gray cursor-pointer" />
                        ) : (
                            <EyeSlashIcon className="w-4 h-4 text-custom-gray cursor-pointer" />
                        )}
                    </button>
                </div>
                <div className="stat-value flex align-center justify-start gap-2 text-neutral-content">
                    <p className="font-normal text-xl">₱</p> 
                    {isVisible ? formattedValue : '*****'}
                </div>
            </div>
        </div>
    );
}

export default TotalCard;
