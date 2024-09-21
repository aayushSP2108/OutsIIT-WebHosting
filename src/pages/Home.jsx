import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';
import menuData from '../data/Menu.json';

export default function Home() {
  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    setOutlets(menuData.outlets); // Load outlets from the JSON
  }, []);

  // Function to handle navigation to the menu page
  const handleOutletClick = (outletName) => {
    navigate(`/menu/${outletName}`);
  };

  return (
    <div className="bg-gray-900 text-gray-200 w-screen">
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl mb-4">Outlets</h1>
        {outlets.map((outlet) => (
          <div
            key={outlet.id}
            className="mb-6 cursor-pointer"
            onClick={() => handleOutletClick(outlet.name)} // Navigate on click
          >
            <h2 className="text-2xl">{outlet.name}</h2>
            <p>Location: {outlet.location}</p>
            <p>Menu Types: {outlet.menuType.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
