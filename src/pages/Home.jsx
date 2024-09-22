import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import menuData from '../data/Menu.json';
import { BsFillStarFill } from "react-icons/bs";
import colors from '../styles/colors';
import TruncatedTextComponent from '../components/TruncatedTextComponent';
import Banner from '../components/Banner';

const Home = () => {
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
    <div style={{ backgroundColor: colors.backgroundColor }} className=" text-gray-200 w-screen min-h-screen flex flex-col">
      <Navbar />

      <div className='mt-16 ' />

      <Banner />

      <h1 style={{ fontFamily: 'Montserrat', color: colors.mainTextColor }} className="text-lg md:text-xl lg:text-3xl font-semibold tracking-widest my-4 text-center uppercase">
        What's on your Heart?
      </h1>
      <div className="flex overflow-x-auto space-x-4">
        {itemsArray.map((item) => (
          <div
            key={item.name}
            className="flex-shrink-0 w-20 md:w-24 lg:w-32 flex flex-col items-center cursor-pointer"
            onClick={() => handleOutletClick(item.outletName)} // Attach the click handler
          >
            <div style={{ borderColor: colors.secComponentColor }} className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 shadow-lg">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <p style={{ color: colors.textColor }} className="mt-2 text-center text-lg md:text-xl lg:text-2xl truncate">
              <TruncatedTextComponent text={item.name} maxLength={11} />
            </p>
          </div>
        ))}
      </div>



      <h1 style={{ fontFamily: 'Montserrat', color: colors.mainTextColor }} className="text-lg md:text-xl lg:text-3xl font-semibold tracking-widest my-4 text-center uppercase">All Outlets</h1>
      <div className=" px-4 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outlets.map((outlet) => (
            <div
              key={outlet.id}
              style={{ backgroundColor: colors.shadowColor}}
              className="p-4 rounded-lg transition-shadow duration-300 cursor-pointer" //shadow-custom md:shadow-none md:hover:shadow-custom
              onClick={() => handleOutletClick(outlet.name)}
            >

              <div className="relative w-full rounded-lg mb-2">
                <img className='h-52 w-full object-cover rounded-lg' src={outlet.image} alt={outlet.name} />
                <p
                  style={{
                    color: colors.backgroundColor,
                    background: `linear-gradient(to right, ${colors.differentColorPurple},${colors.differentColorPurple}, transparent, transparent)`,
                  }}
                  className="absolute bottom-3 p-1 w-full text-xl md:text-2xl lg:text-xl"
                >
                  {outlet.location}
                </p>
              </div>


              <div className='flex justify-between items-center'>
                <div className='  w-[67%]'>
                  <h2
                    className="text-2xl md:text-2xl lg:text-2xl"
                    style={{
                      color: colors.mainTextColor,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {outlet.name}
                  </h2>
                  <p style={{ color: colors.textColor, marginBottom: -6 }} className='text-xl md:text-xl lg:text-xl'>{outlet.menuType.join(', ')}</p>
                </div>
                <div className='flex flex-col justify-end items-end '>
                  <div style={{ fontFamily: 'Montserrat', backgroundColor: colors.differentColorGreen, color: 'white' }} className='flex items-center gap-1 rounded-lg px-2 text-white w-16'>
                    <p className="text-lg md:text-xl font-semibold">{outlet.rating.$numberInt}</p>
                    <BsFillStarFill size={16} />
                  </div>
                  <div className='flex gap-1 border-b-2 border-dotted' style={{ borderBlockColor: colors.textColor, fontFamily: 'Montserrat', color: colors.mainTextColor }}>
                    <p className="text-xs md:text-sm font-bold">{outlet.ratingcount.$numberInt}</p>
                    <p className="text-xs md:text-sm font-bold">Store ratings</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{backgroundColor: colors.componentColor}} className=" text-gray-400 py-4 mt-10 text-center">
        <p className='text-xl md:text-3xl font-bold'>&copy; 2024 IIT Gandhinagar. All rights reserved.</p>
        <p className='text-xl md:text-2xl font-bold'>Follow us on social media!</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://x.com/iitgn?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="text-white hover:text-blue-400 text-xl md:text-3xl font-bold">Twitter</a>
          <a href="https://www.instagram.com/iit_gandhinagar/?hl=en" className="text-white hover:text-blue-400 text-xl md:text-3xl font-bold">Instagram</a>
          <a href="https://www.facebook.com/iitgn.official/" className="text-white hover:text-blue-400 text-xl md:text-3xl font-bold">Facebook</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
