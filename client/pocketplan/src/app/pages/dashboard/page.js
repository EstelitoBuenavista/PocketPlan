// pages/dashboard
'use client'

import { useState } from "react";
import Navbar from "../../components/navbar";
import AccountListContent from "@/app/components/accountListContent";

export default function Dashboard() {
  return (
    <div className="background flex flex-col min-h-screen">
        <Navbar className="fixed top-0 w-full z-10"/>

        {/* tabs of accounts, overview shall be a default */}
        <div className="md:px-32 sm:px-16 m-4">
          <h1 className="text-2xl font-bold my-4 text-primary">Dashboard</h1>
          <AccountListContent />
        </div>
        
    </div>
  );
}