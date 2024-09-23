import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import ContentComponent from '../components/ContentComponent';
import LaptopDark from './../data/LaptopDark.mp4';
import LaptopLight from './../data/LaptopLight.mp4';
import Phone from './../data/Phone.mp4';

import './MenuPage.css';
import Footer from '../components/Footer';

export default function About() {
  const { theme, toggleTheme } = useTheme();

  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 1;
      videoElement.play();
    }
  }, []);
  return (
    <div style={{ backgroundColor: theme.backgroundColor }} className="min-h-screen">
      <Navbar />

      <h2 style={{ color: theme.differentColorOrange }} className="pt-24 px-3 md:px-10 text-6xl font-extrabold text-center">Project Overview</h2>
      <ContentComponent
        div1Content={
          <p style={{ color: theme.textColor }}>
            This project is a web-based platform designed to make ordering food from various campus outlets easier. The website provides a simple and user-friendly interface for students, faculty, and visitors to explore available outlets, check menus, place orders, and manage carts efficiently. The design is inclusive and ensures accessibility, adhering to government guidelines on web accessibility.
          </p>
        }
        div2Content={
          <div className="relative h-[30rem] overflow-hidden rounded-[15px] border-4 border-white/20 shadow-lg">
            <img
              src="https://news.iitgn.ac.in/wp/wp-content/uploads/2019/07/ANK383_2224a-1280x640.jpg"
              alt="Campus view"
              className="w-full h-full object-cover transition-transform transform hover:scale-105"
            />
          </div>
        }
      />

      <h2 style={{ color: theme.mainTextColor }} className="text-4xl flex justify-center items-center font-semibold mb-4 text-center">Why I Chose a Basic Template Over More Animated and Contrast-rich Designs</h2>
      <ContentComponent
        div1Content={
          <div className="relative h-[30rem] overflow-hidden rounded-[15px] border-4 border-white/20 shadow-lg">
            <img
              src="https://news.iitgn.ac.in/wp/wp-content/uploads/2019/07/ANK383_2224a-1280x640.jpg"
              alt="Campus view"
              className="w-full h-full object-cover transition-transform transform hover:scale-105"
            />
          </div>
        }
        div2Content={
          <p style={{ color: theme.textColor }} className=" mb-4">
            While flashy and highly animated designs can be visually appealing, this website is built to cater to a broad community of users, including those with disabilities such as motion sickness and visual impairments. According to the Government of India’s Web Accessibility Guidelines, websites should prioritize simplicity and ease of use for everyone. This is why we focused on a design that is clean, minimal, and functional rather than being overly animated or distracting.
          </p>
        }
      />

      <h2 style={{ color: theme.mainTextColor }} className="text-4xl flex justify-center items-center font-semibold my-4">Features</h2>
      <ContentComponent
        div1Content={
          <div className="relative flex-col items-center justify-center overflow-hidden group">
            <video ref={videoRef} className='videoTag absolute inset-0 object-contain w-full h-full opacity-15 group-hover:opacity-100' autoPlay loop muted>
              <source src={LaptopDark} type='video/mp4' />
            </video>
            <div className="relative p-12 opacity-100 group-hover:opacity-5">
              <h3 style={{ color: theme.differentColorOrange }} className="text-3xl text-center font-semibold mb-3">
                Core Features
              </h3>
              <ul style={{ color: theme.textColor }} className="list-inside text-center space-y-2">
                <li>Persistent Cart with Local Storage</li>
                <li>Featured Section</li>
                <li>Dark Mode and Light Mode</li>
                <li>User-Friendly Interface</li>
                <li>Responsive Design</li>
                <li>Outlet-Specific Menus and Pricing</li>
              </ul>
            </div>
          </div>

        }
        div2Content={
          <div className="relative flex-col items-center justify-center overflow-hidden group">
            <video className='videoTag absolute inset-0 object-contain w-full h-full opacity-15 group-hover:opacity-100' autoPlay loop muted>
              <source src={LaptopLight} type='video/mp4' />
            </video>
            <div className="relative p-12 opacity-100 group-hover:opacity-5">
              <h3 style={{ color: theme.differentColorOrange }} className="text-3xl text-center font-semibold mb-3">
                Additional Features
              </h3>
              <ul style={{ color: theme.textColor }} className="list-inside space-y-2 text-center">
                <li>Multiple Outlets Support</li>
                <li>Outlet Timing & Grayscale for Closed Outlets</li>
                <li>Disabled Buttons for Closed Outlets</li>
                <li>Real-time Cart Updates</li>
                <li>Custom Banners for Each Outlet</li>
                <li>Accessibility-focused Design</li>
              </ul>
            </div>
          </div>
        }
      />

      <h3 style={{ color: theme.differentColorOrange }} className="text-3xl text-center font-semibold mb-3">Future Improvements</h3>
      <div className="relative flex-col items-center justify-center overflow-hidden group">
        <video className='videoTag absolute inset-0 object-contain scale-110 w-full h-full opacity-15 group-hover:opacity-100' autoPlay loop muted>
          <source src={Phone} type='video/mp4' />
        </video>
        <ul style={{ color: theme.textColor }} className="list-inside space-y-2 mb-4 opacity-100 group-hover:opacity-5 text-center">
          <li>Two-Way Integration (Shopkeeper to Customer Communication)</li>
          <li>Payment Gateway Integration</li>
          <li>Light Mode Enhancement</li>
          <li>Interactive Elements</li>
          <li>Expanded Content</li>
          <li>Multilingual Support</li>
          <li>Order History & Tracking</li>
          <li>Review and Rating System</li>
        </ul>
      </div>

      <h2 style={{ color: theme.mainTextColor }} className="text-4xl text-center flex justify-center items-center font-semibold my-6">Conclusion</h2>
      <p style={{ color: theme.textColor }} className="text-gray-700 mb-4 text-center ">
        This website aims to make the campus dining experience seamless, accessible, and efficient. With constant improvements and new features in the pipeline, we are committed to offering the best possible user experience. Feel free to explore the project and contribute!
      </p>
      <div className="mt-8 text-center ">
        <h2 style={{ color: theme.mainTextColor }} className="text-4xl text-center flex justify-center items-center font-semibold my-6">Vote of Thanks</h2>
        <p style={{ color: theme.textColor }} className="mt-2 text-gray-700">
          I would like to express my heartfelt gratitude to all the creators and photographers for their outstanding work that made these images available. Their contributions enrich the content and help create a visually appealing experience.
        </p>
        {/* <p style={{ color: theme.textColor }} className="mt-2 text-gray-700">
          Special thanks to the developers and designers who worked tirelessly to bring this project to life. Your dedication and expertise have been invaluable.
        </p> */}
        <p style={{ color: theme.mainTextColor }} className="mt-2 text-gray-700">
          Lastly, a big thank you to our users for their continued support and feedback, which drives us to improve and innovate constantly.
        </p>
      </div>

      <p className="mt-4 text-center  text-2xl">
        Note: This material is for personal use only and not intended for production or commercial purposes.
      </p>


      <h2 style={{ color: theme.mainTextColor }} className="text-4xl flex justify-center items-center font-semibold my-6">References</h2>
      <ul style={{ color: theme.textColor }} className=" flex-col text-center items-center justify-center list-inside space-y-2">
        <li>
          <span className="font-bold">Amul Store Image 1:</span>
          <a href="https://iitgn.ac.in/student/lifeoncampus/facilities/images/fac-img/amul.JPG" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Amul Store Image 2:</span>
          <a href="https://iitgn.ac.in/student/lifeoncampus/facilities/images/fac-img/amul.JPG" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Amul Store Image 3:</span>
          <a href="https://news.iitgn.ac.in/wp/wp-content/uploads/2020/05/amul-1-999x640.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Amul TriCone Image:</span>
          <a href="https://i.pinimg.com/736x/33/e6/ff/33e6ff011d887758fa255ea000d3be4c.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Amul Chocominis Image:</span>
          <a href="https://www.shutterstock.com/shutterstock/photos/1878842344/display_1500/stock-photo-india-april-chocolate-brand-amul-chocominis-1878842344.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Amul Kool Image:</span>
          <a href="https://www.shutterstock.com/shutterstock/photos/1257639893/display_1500/stock-photo-pune-india-september-amul-kool-on-white-background-shot-in-studio-1257639893.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">2 Degree Café Image 1:</span>
          <a href="https://img.restaurantguru.com/r515-2-degree-cafe-interior.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">2 Degree Café Image 2:</span>
          <a href="https://img.restaurantguru.com/r376-2-degree-cafe-design-2023-12.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">2 Degree Café Image 3:</span>
          <a href="https://img.restaurantguru.com/r8d6-2-degree-cafe-picture-2021-09-35620.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">2 Degree Café Image 4:</span>
          <a href="https://img.restaurantguru.com/r9db-2-degree-cafe-photo.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Masala Chai Image:</span>
          <a href="https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-10-20_at_11.07.13_AM.png?v=1697780292" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Cold Coffee Image:</span>
          <a href="https://www.funfoodfrolic.com/wp-content/uploads/2020/09/Cold-Coffee-Thumbnail.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Cold Coco Image:</span>
          <a href="https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/cre8krdqeeuyq74gbpsy" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Iced Tea Image:</span>
          <a href="https://www.funfoodfrolic.com/wp-content/uploads/2017/05/Iced-Tea-3.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">Sandwich Image:</span>
          <a href="https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-4.jpg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
        <li>
          <span className="font-bold">App Icon:</span>
          <a href="https://www.svgviewer.dev/s/363041/shop" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> View Image</a> [Accessed: Sep. 23, 2024]
        </li>
      </ul>
      <Footer />
    </div >
  );
}