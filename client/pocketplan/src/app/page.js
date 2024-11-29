// landing page

import Image from "next/image";
import './globals.css';

export default function Home() {
  return (
    <div>
      <div className="hero min-h-screen bg-cover bg-center relative">
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8 mb-8">
          <Image src="/assets/pocketPlanLogo.svg" alt="Logo" width={120} height={120} />
        </div>

        <div className="hero-content text-neutral-content text-center">
          <div className="w-[60%] max-w-screen-lg">
            <h1 className="mb-8 text-5xl font-black">Plan for the money in your pocket.</h1>
            <p className="mb-8">
            Whether you're saving for a goal or managing everyday expenses, Pocket Plan provides the insights you need to make smarter financial decisions.            </p>
            <button className="btn btn-primary font-medium w-1/2">Get Started</button>
          </div>
        </div>
      </div>

      <footer className="footer footer-center bg-primary text-primary-content p-10">
        <aside>
          <p className="font-bold">
            A project by
            <br />
            Estelito Buenavista | Lawrence Tulod | Fabiola Villanueva
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
      </footer>
      
    </div>


    
  );
}
