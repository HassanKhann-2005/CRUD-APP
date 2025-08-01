import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchUser } from '../app/features/userDetailSlice';

const Navbar = () => {
  const allUsers = useSelector((state) => state.app.users || []); // we use useSelector to acces data from global state

  const dispatch = useDispatch();
  const [searchData, setsearchData] = useState("");
  
  useEffect(() => {
    dispatch(searchUser(searchData)); // Dispatch the correct action with searchData
  }, [searchData, dispatch])
  

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold">
              Logo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="flex space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/read"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition duration-300 flex items-center"
              >
                Users
                <span className="ml-2 bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {allUsers.length > 0 ? allUsers.length : '0'}
                </span>
              </Link>
              <a
                href="#services"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition duration-300"
              >
                Services
              </a>
              <a
                href="#contact"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition duration-300"
              >
                Contact
              </a>
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-2 rounded-md text-sm bg-blue-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setsearchData(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  value={searchData}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="hidden sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
          >
            About
          </a>
          <a
            href="#services"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
          >
            Services
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
          >
            Contact
          </a>
          {/* Mobile Search Input */}
          <div className="relative px-3 py-2">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e)=>setsearchData(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-sm bg-blue-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              value={searchData}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;