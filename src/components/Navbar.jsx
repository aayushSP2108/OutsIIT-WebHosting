import React, { useState } from 'react';
import { FaBars, FaTimes, FaShoppingBasket, FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import colors from '../styles/colors';
import { Link } from 'react-router-dom';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    
    const toggleDarkMode = () => {
        setIsDark(!isDark)
    }
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav
            style={{
                backgroundColor: colors.subBackgroundColor,
                // boxShadow: '0 3px 10px rgba(155, 155, 155, 0.5)', // Adjust this to your needs
            }}
            className="shadow-custom fixed top-0 left-0 w-full z-10"
        >
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-4xl font-bold">
                    <a href="#" style={{ color: 'white' }}>OutsIIT</a>
                </div>

                <div className="hidden md:flex space-x-4">
                    <a href="#" style={{ color: colors.textColor }}>Home</a>
                    <a href="#" style={{ color: colors.textColor }}>Favourites</a>
                    <a href="#about" style={{ color: colors.textColor }} >About</a>
                    <a href="#Contact" style={{ color: colors.textColor }} >Contact Us</a>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="hidden md:block relative">
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

                    <div className="block md:hidden bg-gray-700 rounded-full justify-center items-center p-2 hover:bg-[#ff3c00] cursor-pointer">
                        <FaSearch className="text-white" size={20} />
                    </div>
                    <Link to="/cart">
                        <div className="bg-gray-700 rounded-full flex justify-center items-center p-2 hover:bg-[#ff3c00] cursor-pointer">
                            <FaShoppingCart className="text-white" size={20} />
                        </div>
                    </Link>
                    <div onClick={toggleDarkMode} className="bg-gray-700 rounded-full flex justify-center items-center p-2 hover:bg-[#ff3c00] cursor-pointer">
                    {isDark ? <MdLightMode className="text-white" size={20} /> : <MdDarkMode className="text-white" size={20} />}
                    </div>
                    <button onClick={toggleMenu} className="md:hidden text-white">
                        {isOpen ? <FaTimes size={21} /> : <FaBars size={21} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-gray-700 p-4">
                    <a href="#" className="block" style={{ color: colors.textColor }}>Home</a>
                    <a href="#" className="block" style={{ color: colors.textColor }}>Favourites</a>
                    <a href="#about" className="block" style={{ color: colors.textColor }} >About</a>
                    <a href="#Contact" className="block" style={{ color: colors.textColor }} >Contact Us</a>
                </div>
            )}
        </nav>
    );
}
