import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import menuData from '../data/Menu.json';
import { BsFillStarFill } from "react-icons/bs";
import TruncatedTextComponent from '../components/TruncatedTextComponent';
import Banner from '../components/Banner';
// import { getStatus } from '../components/OutletStatus';
import Outlet from '../components/Outlet';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setOutlets(menuData.outlets);
  }, []);

  const handleOutletClick = (outletName) => {
    navigate(`/menu/${outletName}`);
  };

  const uniqueItems = new Map();

  menuData.outlets.forEach(outlet => {
    outlet.menu.forEach(menu => {
      menu.items.forEach(item => {
        if (!uniqueItems.has(item.item)) {
          uniqueItems.set(item.item, {
            name: item.item,
            image: item.image,
            outletName: outlet.name,
          });
        }
      });
    });
  });

  const itemsArray = Array.from(uniqueItems.values());


  return (
    <div style={{ backgroundColor: theme.backgroundColor }} className=" text-gray-200 w-screen min-h-screen flex flex-col">
      <Navbar />

      <div className='mt-16 ' />

      <Banner />

      <h1 style={{ fontFamily: 'Montserrat', color: theme.mainTextColor }} className="text-lg md:text-xl lg:text-3xl font-semibold tracking-widest my-4 text-center uppercase">
        What's on your Heart?
      </h1>
      <div className="flex overflow-x-auto space-x-4">
        {itemsArray.map((item) => (
          <div
            key={item.name}
            className="flex-shrink-0 w-20 md:w-24 lg:w-32 flex flex-col items-center cursor-pointer"
            onClick={() => handleOutletClick(item.outletName)} // Attach the click handler
          >
            <div style={{ borderColor: theme.secComponentColor }} className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 shadow-lg">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <p style={{ color: theme.textColor }} className="mt-2 text-center text-lg md:text-xl lg:text-2xl truncate">
              <TruncatedTextComponent text={item.name} maxLength={11} />
            </p>
          </div>
        ))}
      </div>



      <h1 style={{ fontFamily: 'Montserrat', color: theme.mainTextColor }} className="text-lg md:text-xl lg:text-3xl font-semibold tracking-widest my-4 text-center uppercase">All Outlets</h1>
      <div className=" px-4 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outlets.map((outlet) => (
            <div onClick={() => handleOutletClick(outlet.name)}>
              <Outlet outlet={outlet} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
