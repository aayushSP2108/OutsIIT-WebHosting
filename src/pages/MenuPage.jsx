import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import menuData from '../data/Menu.json';
import Navbar from '../components/Navbar';
import { IoHeart } from "react-icons/io5";
import ImageGallery from '../components/ImageGallery';
import FoodIcon from '../components/FoodIcon';
import Rating from '../components/Rating';
import { FaCaretRight, FaMinus, FaPlus, FaRegQuestionCircle } from 'react-icons/fa';

import TruncatedTextComponent from '../components/TruncatedTextComponent';
import FooterMenu from '../components/FooterMenu';

export default function MenuPage() {
    const { outletName } = useParams();

    const [cart, setCart] = useState(() => {
        const savedCarts = localStorage.getItem('carts');
        const carts = savedCarts ? JSON.parse(savedCarts) : {};
        return carts[outletName] || { storeName: outletName, items: [] };
    });

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [likedItems, setLikedItems] = useState(new Set());
    const outlet = menuData.outlets?.find((outlet) => outlet.name === outletName);
    const categoryRefs = useRef([]);

    useEffect(() => {
        const savedCarts = localStorage.getItem('carts');
        const carts = savedCarts ? JSON.parse(savedCarts) : {};
        carts[outletName] = cart;
        localStorage.setItem('carts', JSON.stringify(carts));
    }, [cart, outletName]);

    const scrollToCategory = (index) => {
        if (categoryRefs.current[index]) {
            const offset = 100;
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

    const toggleLikeItem = (itemId) => {
        setLikedItems((prevLikedItems) => {
            const newLikedItems = new Set(prevLikedItems);
            if (newLikedItems.has(itemId)) {
                newLikedItems.delete(itemId);
            } else {
                newLikedItems.add(itemId);
            }
            return newLikedItems;
        });
    };

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.items.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return {
                    ...prevCart,
                    items: prevCart.items.map(cartItem =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    )
                };
            }
            return { ...prevCart, items: [...prevCart.items, { ...item, quantity: 1 }] };
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            const existingItem = prevCart.items.find(item => item.id === itemId);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    return {
                        ...prevCart,
                        items: prevCart.items.map(item =>
                            item.id === itemId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                    };
                } else {
                    return {
                        ...prevCart,
                        items: prevCart.items.filter(item => item.id !== itemId)
                    };
                }
            }
            return prevCart;
        });
    };

    const deleteFromCart = (itemId) => {
        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items.filter(item => item.id !== itemId)
        }));
    };

    const getCartTotal = () => {
        return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (!outlet) {
        return <div>Outlet not found</div>;
    }

    return (
        <div className="bg-gray-900 text-gray-200 w-screen">
            <Navbar />
            <div className="flex pt-16">

                <div className='hidden md:block fixed top-16 left-0 p-4 w-[15%] h-[calc(100vh-4rem)] overflow-y-auto'>
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} onClick={() => scrollToCategory(index)} className="cursor-pointer">
                                <h2 className={`text-2xl font-semibold mb-2 ${selectedCategory === index ? 'text-blue-500' : 'text-gray-200'}`}>
                                    {category.title}
                                </h2>
                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                </div>

                <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 px-4 py-2 overflow-x-auto flex space-x-4 z-10">
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} onClick={() => scrollToCategory(index)} className="cursor-pointer">
                                <h2 className={`text-lg font-semibold ${selectedCategory === index ? 'text-blue-500' : 'text-gray-200'}`}>
                                    {category.title}
                                </h2>
                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                </div>


                <div className='flex-1 ml-0 md:ml-[15%] p-4'>
                    <h1 className="text-3xl mb-4">{outlet.name}</h1>
                    <div className='flex gap-8 mb-4'>
                        <h1>Recommended</h1>
                        <h1>Popular</h1>
                        <h1>Veg</h1>
                    </div>
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} className="mb-6" ref={el => categoryRefs.current[index] = el}>
                                <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
                                <ul className='hidden md:flex flex-wrap w-full justify-between'>
                                    {category.items.map((item) => {
                                        const cartItem = cart.items.find(cartItem => cartItem.id === item.id);
                                        const quantity = cartItem ? cartItem.quantity : 0;

                                        return (
                                            <li key={item.id} className="mb-2 w-full sm:w-[48%] md:w-[48%] lg:w-[31%] flex-shrink-0 relative">
                                                <div className="relative group overflow-hidden rounded-2xl">
                                                    <img
                                                        src={item.image}
                                                        alt={item.item}
                                                        className="h-64 w-full mr-4 object-cover  transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 flex items-center justify-center transition-opacity duration-300">
                                                        <p className="text-white text-center p-4">{item.description}</p>
                                                    </div>
                                                </div>


                                                <span className="absolute top-3 right-3 cursor-pointer" onClick={() => toggleLikeItem(item.id)}>
                                                    <IoHeart className={`p-2 rounded-full bg-slate-100 bg-opacity-80`} size={35} style={{ color: likedItems.has(item.id) ? 'red' : 'black' }} />
                                                </span>

                                                <div className='pt-2 pb-4'>
                                                    <span className="font-bold">{item.item}</span>
                                                    <div className='flex justify-between'>
                                                        <span className="font-bold">${item.price}</span>
                                                        {quantity > 0 ? (
                                                            <div className='flex items-center'>
                                                                <button onClick={() => removeFromCart(item.id)} className='bg-red-500 text-white rounded px-2 py-1'>-</button>
                                                                <span className='mx-2'>{quantity}</span>
                                                                <button onClick={() => addToCart(item)} className='bg-green-500 text-white rounded px-2 py-1'>+</button>
                                                            </div>
                                                        ) : (
                                                            <button onClick={() => addToCart(item)} className='bg-green-500 text-white rounded px-2 py-1'>Add</button>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {category.items.map((item) => {
                                    const cartItem = cart.items.find(cartItem => cartItem.id === item.id);
                                    const quantity = cartItem ? cartItem.quantity : 0;

                                    return (
                                        <li key={item.id} className='flex md:hidden  mb-16 relative p-2'>
                                            <div className='w-[60%]'>
                                                <div>
                                                    <FoodIcon type={item.type} size={12} padding={3} />
                                                </div>
                                                <div>{item.item}</div>
                                                <div>{item.price}</div>
                                                <div className='flex gap-2'>
                                                    <Rating rating={item.rating.$numberInt} />
                                                    <div> {item.ratingcount.$numberInt} ratings</div>
                                                </div>
                                                <div>{item.description}</div>
                                            </div>
                                            <img src={item.image} alt={item.item} className="h-40 w-[40%] object-cover rounded-2xl" />

                                            {quantity > 0 ? (
                                                <div className=' border-2 border-l-indigo-50 flex items-center justify-evenly absolute right-[9%] -bottom-4 w-28 h-10 bg-slate-600 rounded-lg'>
                                                    {/* <div className='flex items-center'> */}
                                                    <button onClick={() => removeFromCart(item.id)} className=' text-white rounded'><FaMinus /></button>
                                                    <span className='mx-2'>{quantity}</span>
                                                    <button onClick={() => addToCart(item)} className=' text-white rounded '><FaPlus /></button>
                                                    {/* </div> */}
                                                </div>
                                            ) : (
                                                <div className='border-2 border-l-indigo-50 absolute flex items-center justify-center right-[9%] -bottom-4 w-28 h-10 bg-slate-600 rounded-lg'>
                                                    <button onClick={() => addToCart(item)}>Add</button>
                                                </div>
                                            )}

                                        </li>
                                    );
                                })}



                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                    <FooterMenu />
                </div>


                <div className='p-8 w-[30%] shadow-md rounded-lg hidden md:block'>
                    <ImageGallery />

                    <div className='flex justify-between items-center mt-6'>
                        <div className='text-lg font-semibold '>Recommended Add-ons</div>
                        <IoHeart />
                    </div>
                    <div className='pt-2 text-sm text-gray-300'>
                        Above are some recommended add-ons that pair well with your selections.
                    </div>

                    <div className='flex justify-between items-center mt-6'>
                        <div>
                            <div className='text-xl font-bold '>${getCartTotal().toFixed(2)}</div>
                            <div className='text-sm text-gray-300'>{cart.items.length} items</div>
                        </div>
                        <div className='bg-orange-600 text-white h-full rounded-full text-xl px-4 py-2 font-semibold hover:bg-orange-500 transition duration-200'>
                            Checkout
                        </div>
                    </div>


                    {cart.items.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        <ul className='mt-4'>
                            {cart.items.map((item) => (
                                <li key={item.id} className='flex justify-between  mb-2'>
                                    <div className='flex '>
                                        <img src={item.image} alt={item.item} className=" border-2 h-20 w-20 mr-4 object-cover rounded-lg" />
                                        <div className=' flex flex-col justify-between'>
                                            <div>
                                                <div className='text-lg font-semibold text-gray-100'>
                                                    <TruncatedTextComponent text={item.item} maxLength={11} />
                                                    {/* {item.item.length} */}
                                                </div>
                                                <div className='text-sm text-gray-300'>quantity: {item.quantity} * ${item.price}</div>
                                            </div>
                                            <div className='text-lg font-bold text-gray-100'>${(item.quantity * item.price).toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end justify-between'>
                                        <div className='text-sm text-green-500 font-medium'>In Stock</div>
                                            <div className=' border-2 p-2 border-l-indigo-50 flex items-center justify-evenly  h-10 bg-slate-600 rounded-lg'>
                                                <button onClick={() => removeFromCart(item.id)} className=' text-white rounded'><FaMinus /></button>
                                                <span className='mx-3'>{item.quantity}</span>
                                                <button onClick={() => addToCart(item)} className=' text-white rounded '><FaPlus /></button>
                                        </div>
                                    </div>
                                </li>

                            ))}
                        </ul>
                    )}



                </div>
                {cart.items.length > 0 &&
                    <div className="md:hidden fixed bottom-10 left-0 w-full bg-[#ff3c00] py-2 px-4 overflow-x-auto flex space-x-4 z-10 justify-between">
                        <div>
                            {cart.items.length} items added
                        </div>
                        <div>
                            Checkout
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
