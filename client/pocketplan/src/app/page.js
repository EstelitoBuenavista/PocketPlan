// landing page
"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import './globals.css';

export default function LandingPage() {
  const router = useRouter();
  
  const navToSignUp = () => {
    router.push('/pages/signup');
  }

  return (
    <div>
      <div 
      className="hero min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style= {{ backgroundImage: 'url("/assets/PPbgNEW.jpg")' }}>
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8 mb-8">
          <Image src="/assets/pocketPlanLogo.svg" alt="Logo" width={120} height={120} />
        </div>

        <div className="hero-content text-neutral text-center">
          <div className="w-[60%] max-w-screen-lg">
            <h1 className="mb-8 text-5xl font-black">Plan for the money in your pocket.</h1>
            <p className="mb-8">
            Whether you&apos;re saving for a goal or managing everyday expenses, Pocket Plan provides the insights you need to make smarter financial decisions.            </p>
            <button 
              className="btn btn-primary font-medium w-1/2"
              onClick = {navToSignUp}
            >Get Started</button>
          </div>
        </div>
      </div>

      <footer className="footer footer-center bg-primary text-primary-content p-10">
        <aside>
          <p className="font-bold">A project by</p>
          <p className="font-medium">Estelito Buenavista | Lawrence Tulod | Fabiola Villanueva</p>
          <p className="font-light">Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
      </footer>
      
    </div>
  );
}
