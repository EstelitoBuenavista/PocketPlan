// pages/profile
'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/app/components/navbar";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    router.push('/pages/login');
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDiscard = () => {
    setIsEditing(false);
  };

  return (
    <div className="background flex flex-col min-h-screen w-screen">
      <Navbar className="fixed top-0 w-full" />

      <div className="sm:px-8 md:px-32 m-4 overflow-x-hidden">
        <h1 className="text-2xl font-bold my-4 text-primary">Profile and Settings</h1>

        <div className="bg-base-100 rounded-xl border-2 overflow-hidden">
          <div className="w-full flex justify-center items-center">
            <div className="w-full h-[15vh] bg-primary"/>
          </div>
          <div className="p-8 rounded-xl flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="flex flex-col items-center justify-center w-full">
              {isEditing ? (
                <div className="form-control w-full">
                  <div className="label">
                    <span className="font-light text-xs text-neutral">Username</span>
                  </div>
                  <input
                     // onChange={e => setUsername(e.target.value)}
                    type="text"
                    placeholder="Show username here***"
                    className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                  />
                  <div className="label">
                    <span className="font-light text-xs text-neutral">E-mail</span>
                  </div>
                  <input
                    // onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="Show user email here***"
                    className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                  />
                  <div className="flex gap-4 w-full">
                    <div className="flex flex-col items-start w-full sm:w-1/2">
                      <div className="label">
                        <span className="font-light text-xs text-neutral">Change Password</span>
                      </div>
                      <input
                        // onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="sample password"
                        className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                      />
                    </div>
                    <div className="flex flex-col items-start w-full sm:w-1/2">
                      <div className="label">
                        <span className="font-light text-xs text-neutral">Confirm Password</span>
                      </div>
                      <input
                        // onChange={e => setPassconfirm(e.target.value)}
                        type="password"
                        placeholder="sample password"
                        className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="label">
                    <span className="font-light text-xs text-neutral">Username</span>
                  </div>
                  <input
                    type="text"
                    value="Emong mama"
                    readOnly
                    className="input input-bordered w-full bg-neutral-200 text-neutral-800"
                  />
                  <div className="label">
                    <span className="font-light text-xs text-neutral">E-mail</span>
                  </div>
                  <input
                    type="text"
                    value="mamamo@example.com" // Display the email here
                    readOnly
                    className="input input-bordered w-full bg-neutral-200 text-neutral-800"
                  />
                </div>
              )}
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-8 gap-2">
              <button
                className="btn btn-neutral btn-outline w-full sm:w-auto"
                onClick={handleLogOut}
              >
                Log out
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto">
                {isEditing ? (
                  <>
                    <button 
                        className="btn btn-accent w-full sm:w-auto" 
                        onClick={handleDiscard}
                      >
                      Discard
                    </button>
                    <button
                      className="btn btn-primary w-full sm:w-auto"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary w-full sm:w-auto" onClick={toggleEdit}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
