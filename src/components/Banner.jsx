import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const slides = [
  { id: 1, text: "Slide 1", bgColor: "bg-red-500" },
  { id: 2, text: "Slide 2", bgColor: "bg-green-500" },
  { id: 3, text: "Slide 3", bgColor: "bg-blue-500" },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval); // Clear interval on unmount
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full h-64 flex justify-center items-center text-white text-2xl ${slide.bgColor}`}
          >
            <h2>{slide.text}</h2>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'Montserrat' }} className=" uppercase absolute top-4 left-4 bg-yellow-500 text-black text-sm font-bold px-2 py-1 rounded">
        Featured
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-xl p-2 rounded"
        onClick={prevSlide}
      >
        <IoIosArrowBack />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-xl p-2 rounded"
        onClick={nextSlide}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Banner;
