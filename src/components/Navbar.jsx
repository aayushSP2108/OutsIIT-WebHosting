import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes, FaShoppingBasket, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 shadow">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-lg font-bold">
                    <a href="#" className="text-white">Logo</a>
                </div>

                <div className="hidden md:flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white">Home</a>
                    <a href="#" className="text-gray-300 hover:text-white">Productions</a>
                    <a href="#" className="text-gray-300 hover:text-white">About</a>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{ height: '40px' }} 
                            className="border rounded-full pl-10 pr-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff3c00] bg-white"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FaSearch />
                        </span>
                    </div>
                        <div style={{ width: '40px', height: '40px' }} className="bg-gray-700 rounded-full flex justify-center items-center hover:bg-[#ff3c00] cursor-pointer">
                            <FaShoppingBasket className="text-white" size={20} />
                        </div>
                        <div style={{ width: '40px', height: '40px' }} className="bg-gray-700 rounded-full flex justify-center items-center hover:bg-[#ff3c00] cursor-pointer ">
                            <FaUserCircle className="text-white" size={20} />
                        </div>
                </div>

                <button onClick={toggleMenu} className="md:hidden text-white">
                    {isOpen ? <FaTimes size={21} /> : <FaBars size={21} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-gray-700 p-4">
                    <a href="#" className="block text-gray-300 hover:text-white">Home</a>
                    <a href="#" className="block text-gray-300 hover:text-white">Productions</a>
                    <a href="#" className="block text-gray-300 hover:text-white">About</a>
                </div>
            )}
        </nav>
    );
}
