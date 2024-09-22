import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import menuData from '../data/Menu.json';
import { BsFillStarFill } from "react-icons/bs";
import colors from '../styles/colors'; // Import the colors

const Home = () => {
  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setOutlets(menuData.outlets);
  }, []);

  const handleOutletClick = (outletName) => {
    navigate(`/menu/${outletName}`);
  };

  return (
    <div className="bg-gray-900 text-gray-200 w-screen min-h-screen flex flex-col">
      <Navbar />
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Our Outlets</h1>
        <p className="text-lg">Discover delicious meals from the best places in town!</p>
      </div>

      <div className="pt-10 p-4 flex-grow">
        <h1 className="text-3xl mb-4 text-center">Our Outlets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outlets.map((outlet) => (
            <div
              key={outlet.id}
              className="p-4 rounded-lg transition-shadow duration-300 cursor-pointer hover:border-[1px] hover:shadow-custom"
              onClick={() => handleOutletClick(outlet.name)}
            >
              <img src={outlet.image} className="h-48 w-full object-cover rounded-lg mb-2" alt={outlet.name} />
              <div className='flex justify-between items-center'>
                <div>
                  <h2 className="text-xl" style={{ color: colors.differentColorOrange }}>{outlet.name}</h2>
                  <p style={{ color: colors.secComponentColor }}>Location: {outlet.location}</p>
                  <p style={{ color: colors.secComponentColor }}>Menu Types: {outlet.menuType.join(', ')}</p>
                </div>
                <div className='flex items-center'>
                  <div className='bg-green-500 flex items-center gap-1 rounded-lg p-1'>
                    <p>{outlet.rating.$numberInt}</p>
                    <BsFillStarFill size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-400 py-4 text-center">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        <p>Follow us on social media!</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-white hover:text-blue-400">Facebook</a>
          <a href="#" className="text-white hover:text-blue-400">Twitter</a>
          <a href="#" className="text-white hover:text-blue-400">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
