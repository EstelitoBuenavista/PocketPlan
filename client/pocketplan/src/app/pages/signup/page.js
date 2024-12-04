// signup page
"use client"
import Link from 'next/link';
import { 
  ChevronLeftIcon,
  ShieldExclamationIcon
 } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SignUpPage() {

const [isError, setIsError] = useState(false)
const [isSamePW, setIsSamePW] = useState(true)
const [Email,setEmail] = useState("")
const [Username,setUsername] = useState("")
const [Password,setPassword] = useState("") 
const [Passconfirm, setPassconfirm] = useState("")

const handleRegister = (e) =>{
  e.preventDefault()

  if (Passconfirm !== Password){
    setIsSamePW(false)
    return
  } else {
    setIsSamePW(true)
  }

  const newUser = {
    password: Password,
    email: Email,
    username: Username
  };

  fetch(`http://localhost:4000/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.email){
        setIsError(true)
        return
      }
      window.location.href = "./login";
    })
    .catch((error) => {
      console.error("Error creating Account", error);
      console.log(JSON.stringify(newUser))
    });
}
  return (
    <div>
      <div 
      className="hero min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style= {{ backgroundImage: 'url("/assets/signuploginbg.jpg")' }}>

        <div className="absolute top-8 left-8">
          <Link href="/" className=" flex items-center gap-2 text-neutral-content hover:text-primary">
            <ChevronLeftIcon className="w-4 h-4"/>
            <p className="text-sm font-normal">Back</p>
          </Link>
        </div>

        <div className="card glass shadow-[0_0_60px_rgba(0,0,0,0.15)] w-full max-w-[450px] mx-8 my-8 p-2">
          <figure>
            <Link href="/">
              <img className="mt-8 mx-auto btn btn-ghost cursor-pointer p-1" src="/assets/pocketPlanLogo.svg" alt="Logo" width={120} height={120} />
            </Link>
          </figure>

          <div className="card-body text-neutral-content">
            <h2 className="font-normal text-center mb-2">Welcome! Sign up to get started.</h2>
            
            <label className="form-control w-full">
              <div className="label">
                <span className="font-light text-xs">Username</span>
              </div>
              <input 
                onChange={e => setUsername(e.target.value)}
                type="text" 
                placeholder="Bryanarra" 
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary" />
              <div className="label">
                <span className="font-light text-xs">E-mail</span>
              </div>
              <input 
                onChange={e => setEmail(e.target.value)}
                type="text" 
                placeholder="bryanarra@email.com" 
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary" />
              <div className="label">
                <span className="font-light text-xs">Set Password</span>
              </div>
              <input 
                onChange={e => setPassword(e.target.value)}
                type="password" 
                placeholder="sample password" 
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary" />
              <div className="label">
                <span className="font-light text-xs">Confirm Password</span>
              </div>
              <input 
                onChange={e => setPassconfirm(e.target.value)}
                type="password" 
                placeholder="sample password" 
                className="input input-bordered w-full bg-neutral-200 text-neutral-800 hover:border-secondary focus:ring-secondary focus:border-secondary" />
            </label>

            <button className="btn mt-4 btn-primary w-wide" onClick={handleRegister}>Sign up</button>

            {!isSamePW && <p className="font-medium text-error text-center text-xs w-full">Password Mismatch!</p>}
            {isError && <p className="font-medium text-error text-center text-xs w-full">Error Registering!</p>}

            <div className="flex items-center justify-center gap-2 w-full max-w-[200px] mx-auto">
              <p className="text-xs font-normal">Already have an account?</p>
              <Link href="/pages/login" className="text-primary text-xs font-normal">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}