import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useTheme } from '../context/ThemeContext';

const slides = [
  { id: 1, text1: "Food Truck on campus,", text2: "Sawariya", bgImage: "https://lh5.googleusercontent.com/p/AF1QipPB6yR5hSg3AtLevYuaUb4p0A-w75r-5y3Sxq-P=w1080-k-no", bgColor: "bg-red-500" },
  { id: 2, text1: "Food Truck on campus,", text2: "Sawariya", bgImage: "https://lh5.googleusercontent.com/p/AF1QipPB6yR5hSg3AtLevYuaUb4p0A-w75r-5y3Sxq-P=w1080-k-no", bgColor: "bg-red-500" },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-[35vh] md:h-[50vh] lg:h-[55vh] relative flex items-center justify-center text-white text-2xl"
            style={{
              backgroundImage: slide.bgImage ? `url(${slide.bgImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div style={{ backgroundColor: theme.backgroundColor }} className="absolute inset-0 opacity-20"></div>
            <div className="flex-col items-center justify-center z-10">
              <h1 className='text-center text-2xl md:text-xl lg:text-3xl font-semibold'>{slide.text1}</h1>
              <h2 className='text-center text-3xl md:text-2xl lg:text-9xl font-bold'>{slide.text2}</h2>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'Montserrat' }} className="uppercase absolute top-4 left-4 bg-yellow-500 text-black text-sm font-bold px-2 py-1 rounded">
        Featured
      </div>
      <button
        style={{ backgroundColor: theme.mainTextColor, color: theme.backgroundColor }}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-opacity-50 text-xl p-2 rounded"
        onClick={prevSlide}
      >
        <IoIosArrowBack />
      </button>
      <button
        style={{ backgroundColor: theme.mainTextColor, color: theme.backgroundColor }}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-50 text-xl p-2 rounded"
        onClick={nextSlide}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Banner;
