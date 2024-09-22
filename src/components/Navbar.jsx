import React, { useState } from 'react';
import { FaBars, FaTimes, FaShoppingBasket, FaUserCircle, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 shadow fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-lg font-bold">
                    <a href="#home" className="text-white">Logo</a>
                </div>

                <div className="hidden md:flex space-x-4">
                    <a href="#home" className="text-gray-300 hover:text-white">Home</a>
                    <a href="#productions" className="text-gray-300 hover:text-white">Productions</a>
                    <a href="#about" className="text-gray-300 hover:text-white">About</a>
                    <a href="#favourites" className="text-gray-300 hover:text-white">Favourites</a>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="bg-gray-700 rounded-full flex justify-center items-center p-2 hover:bg-[#ff3c00] cursor-pointer">
                        <FaShoppingBasket className="text-white" size={20} />
                    </div>
                    <div className="bg-gray-700 rounded-full flex justify-center items-center p-2 hover:bg-[#ff3c00] cursor-pointer">
                        <FaShoppingCart className="text-white" size={20} />
                    </div>
                    <div className="bg-gray-700 rounded-full flex justify-center items-center p-2 hover:bg-[#ff3c00] cursor-pointer">
                        <FaUserCircle className="text-white" size={20} />
                    </div>
                    <button onClick={toggleMenu} className="md:hidden text-white">
                        {isOpen ? <FaTimes size={21} /> : <FaBars size={21} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-gray-700 p-4">
                    <a href="#home" className="block text-gray-300 hover:text-white py-2">Home</a>
                    <a href="#productions" className="block text-gray-300 hover:text-white py-2">Productions</a>
                    <a href="#about" className="block text-gray-300 hover:text-white py-2">About</a>
                    <a href="#favourites" className="block text-gray-300 hover:text-white py-2">Favourites</a>
                </div>
            )}
        </nav>
    );
}
