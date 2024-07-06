"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CustomButton from "./CustomButton";
import SearchBar from './Searchbar';

const Navbar = () => {
  const router = useRouter(); // Move useRouter() inside the component
  const [navbarSolid, setNavbarSolid] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavbarSolid(true);
    } else {
      setNavbarSolid(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  const redirectPage = (link: string) => {
    router.push(`${link}`); // Navigate to product info page with motorcycle ID
  };

  return (
    <nav className={` w-full z-30 top-0 ${navbarSolid ? 'bg-blue-950 bg-opacity-99' : 'bg-blue-900 '} transition duration-300`}>
      <>
        {/* Top Navbar with Search */}
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between py-2 border-x-amber-50 ">
          <div className="pl-4 flex items-center">
            <a onClick={()=>redirectPage('/')} className="text-white no-underline hover:no-underline font-bold text-2xl lg:text-3xl flex items-center" href="#">
              <img className="w-16 h-16 mr-6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkgAY4mKZt6epgecA2464tA34o5Acxztddw&s" alt="Logo" />
              Superbikes
            </a>
          </div>

          <SearchBar />
          <div className="block lg:hidden pr-4">
            <button id="nav-toggle" className="flex items-center p-1 text-white hover:text-gray-300 focus:outline-none focus:shadow-outline">
              <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0zM0 7h20v2H0zM0 11h20v2H0z" />
              </svg>
            </button>
          </div>
          
          
        </div>

        {/* Second Navbar with Navigation Links */}
        <div className="w-full container mx-auto flex flex-wrap items-center justify-center py-2 ">
          <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
            <ul className="list-reset lg:flex justify-center flex-1 items-center">
             
              <li className="mr-3">
                <a onClick={()=>redirectPage('/')}  className="inline-block py-2 px-4 text-white no-underline hover:text-gray-300 hover:text-underline font-bold" href="#">Home</a>
              </li>
              <li className="mr-3">
                <a onClick={()=>redirectPage('/motorcycles')}  className="inline-block py-2 px-4 text-white no-underline hover:text-gray-300 hover:text-underline font-bold" href="#">Motorcycles</a>
              </li>
              <li className="mr-3">
                <a onClick={()=>redirectPage('/about')}  className="inline-block py-2 px-4 text-white no-underline hover:text-gray-300 hover:text-underline font-bold" href="#">About</a>
              </li>
              <li className="mr-3">
                <a className="inline-block py-2 px-4 text-white no-underline hover:text-gray-300 hover:text-underline font-bold" href="#">Contact</a>
              </li>
          
              <li className="mr-3">
                <a className="inline-block py-2 px-4 text-white no-underline hover:text-gray-300 hover:text-underline font-bold" href="#">FAQ</a>
              </li>
           
            </ul>
          </div>
        </div>
      </>
    </nav>
  );
};

export default Navbar;
