import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import menuData from '../data/Menu.json'; // Adjust the path as needed
import Navbar from '../components/Navbar';

export default function MenuPage() {
    const { outletName } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const outlet = menuData.outlets?.find((outlet) => outlet.name === outletName);
    const categoryRefs = useRef([]);

    const scrollToCategory = (index) => {
        if (categoryRefs.current[index]) {
            const offset = 100; // Adjust this value based on your fixed menu height
            const element = categoryRefs.current[index];
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });

            setSelectedCategory(index);
        }
    };

    const handleScroll = () => {
        const categories = categoryRefs.current;
        const scrollPosition = window.scrollY;

        categories.forEach((category, index) => {
            const categoryPosition = category.getBoundingClientRect().top + scrollPosition;
            const isInView = scrollPosition >= categoryPosition - 100 && scrollPosition < categoryPosition + category.offsetHeight;

            if (isInView) {
                setSelectedCategory(index);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!outlet) {
        return <div>Outlet not found</div>;
    }

    return (
        <div className="bg-gray-900 text-gray-200 w-screen">
            <Navbar />
            <div className="flex pt-16">
                {/* Fixed Menu for Desktop */}
                <div className='hidden md:block fixed top-16 left-0 p-4 w-[15%] h-[calc(100vh-4rem)] overflow-y-auto'>
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} onClick={() => scrollToCategory(index)} className="cursor-pointer">
                                <h2
                                    className={`text-2xl font-semibold mb-2 ${selectedCategory === index ? 'text-blue-500' : 'text-gray-200'}`}
                                >
                                    {category.title}
                                </h2>
                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                </div>

                {/* Fixed Horizontal Scroll for Mobile */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 p-2 overflow-x-auto flex space-x-4 z-10">
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} onClick={() => scrollToCategory(index)} className="cursor-pointer">
                                <h2
                                    className={`text-lg font-semibold ${selectedCategory === index ? 'text-blue-500' : 'text-gray-200'}`}
                                >
                                    {category.title}
                                </h2>
                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                </div>

                <div className='flex-1 ml-[15%] p-4'>
                    <h1 className="text-3xl mb-4">Menu for {outlet.name}</h1>

                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} className="mb-6" ref={el => categoryRefs.current[index] = el}>
                                <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
                                <ul className='flex flex-wrap w-full justify-between'>
                                    {category.items.map((item) => (
                                        <li key={item.id} className="mb-2 w-full sm:w-[48%] md:w-[30%] flex-shrink-0">
                                            <img src={item.image} alt={item.item} className="h-64 w-full mr-4 object-cover rounded-xl overflow-hidden" />
                                            <span className="font-bold">{item.item}</span> - ${item.price} ({item.type})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                </div>
                
                <div className='p-4 w-[30%]'>
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category) => (
                            <div key={category._id}>
                                <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
