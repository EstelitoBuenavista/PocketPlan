// pages/profile
'use client';

import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/app/components/navbar";

export default function Profile() {
  const [isError, setIsError] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passconfirm, setPassconfirm] = useState("")
  const [oldPassword, setOldPassword] = useState('')
  const router = useRouter();

  const renderUser = ()=> {
    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } else {
    router.push('/pages/login')
    }
    fetch(`http://localhost:4000/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setEmail(data.email);
      setUsername(data.username);
      setOldPassword(data.password)
    })
    .catch(err => console.error('Error fetching accounts:', err));
  }

  useEffect(() => {
    renderUser()
  }, [])
  useEffect(() => {
    renderUser()
  }, [isEditing])

  const handleSaveChanges = (e) => {
    e.preventDefault()

    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } else {
    router.push('/pages/login')
    }

    const newUser = {
      email : email,
      username : username,
      password : password,
      passconfirm: passconfirm,
      oldPassword: oldPassword
    };
    
    fetch(`http://localhost:4000/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then((data) => {
      renderUser()
      if (data.error){
        setIsError(true)
      }
    }).then(()=>{toggleEdit()})
    .catch(error => {
      console.error('Error updating user:', error);
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    router.push('/pages/login');
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setPassconfirm('')
    setPassword('')
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
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder="Show username here***"
                    className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                  />
                  <div className="label">
                    <span className="font-light text-xs text-neutral">E-mail</span>
                  </div>
                  <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Show user email here***"
                    className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                  />
                  <div className="flex gap-4 w-full">
                    <div className="flex flex-col items-start w-full sm:w-1/2">
                      <div className="label">
                        <span className="font-light text-xs text-neutral">New Password</span>
                      </div>
                      <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="sample password"
                        className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary"
                      />
                    </div>
                    <div className="flex flex-col items-start w-full sm:w-1/2">
                      <div className="label">
                        <span className="font-light text-xs text-neutral">Old Password</span>
                      </div>
                      <input
                        onChange={e => setPassconfirm(e.target.value)}
                        value={passconfirm}
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
                    value={username || ''}
                    readOnly
                    className="input input-bordered w-full bg-neutral-200 text-neutral-800"
                  />
                  <div className="label">
                    <span className="font-light text-xs text-neutral">E-mail</span>
                  </div>
                  <input
                    type="text"
                    value={email || ''}
                    readOnly
                    className="input input-bordered w-full bg-neutral-200 text-neutral-800"
                  />
                  {isError && <p className="text-error">Something went wrong</p>}
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
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary w-full sm:w-auto" onClick={()=>{toggleEdit(); setIsError(false)}}>
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
