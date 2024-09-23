import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import menuData from '../data/Menu.json';
import Navbar from '../components/Navbar';
import { IoHeart } from "react-icons/io5";
import ImageGallery from '../components/ImageGallery';
import FoodIcon from '../components/FoodIcon';
import Rating from '../components/Rating';
import { FaCaretRight, FaMinus, FaPlus, FaRegQuestionCircle } from 'react-icons/fa';
import { IoMdArrowDroprightCircle } from "react-icons/io";

import TruncatedTextComponent from '../components/TruncatedTextComponent';
import FooterMenu from '../components/FooterMenu';
import { getStatus } from '../components/OutletStatus';
import { BsFillStarFill } from 'react-icons/bs';
import Footer from '../components/Footer';

import { useTheme } from '../context/ThemeContext';

export default function MenuPage() {
    const { theme, toggleTheme } = useTheme();
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

    const status = getStatus(outlet);

    return (
        <div style={{ backgroundColor: theme.backgroundColor }} className=" text-gray-200 w-screen">
            <Navbar />
            <div className='mt-16 p-4'>
                <div className='md:h-96 w-full flex gap-4'>
                    <div className='w-full md:w-[60%] h-64 md:h-full rounded shadow overflow-hidden'>
                        <img src={outlet.image} alt={outlet.name} className='w-full h-full object-cover' />
                    </div>
                    <div className='hidden md:w-[20%] md:flex md:flex-col md:gap-4 w-[20%] h-full flex-col gap-4'>
                        <div className='h-[50%] rounded shadow overflow-hidden'>
                            <img src={outlet.image4} alt={outlet.name} className='w-full h-full object-cover' />
                        </div>
                        <div className='h-[50%] rounded shadow overflow-hidden'>
                            <img src={outlet.image3} alt={outlet.name} className='w-full h-full object-cover' />
                        </div>
                    </div>
                    <div className='hidden md:w-[20%] md:flex md:h-full w-[20%] h-full rounded shadow overflow-hidden'>
                        <img src={outlet.image2} alt={outlet.name} className='w-full h-full object-cover' />
                    </div>
                </div>
                <div className='py-3 flex flex-col md:flex-row justify-between items-center'>
                    <div className='text-center md:text-left mb-4'>
                        <h1 style={{ color: theme.mainTextColor, marginBottom: 0 }} className="text-5xl md:text-7xl font-black">{outlet.name}</h1>
                        <p style={{ color: theme.textColor }} className="text-xl md:text-3xl text-gray-600">{outlet.menuType.join(', ')}</p>
                        <p style={{ color: theme.differentColorPurple }} className="text-lg md:text-2xl font-semibold text-gray-700 ">{outlet.location}</p>

                        <div className=' md:hidden flex items-center justify-center gap-2'>
                            <div style={{ fontFamily: 'Montserrat', backgroundColor: theme.differentColorGreen, color: 'white' }} className='flex items-center gap-1 rounded-lg px-2 text-white'>
                                <p className="text-lg md:text-xl font-semibold">{outlet.rating.$numberInt}</p>
                                <BsFillStarFill size={16} />
                            </div>
                            <div className=' flex gap-1 border-b-2 border-dotted' style={{ fontFamily: 'Montserrat', color: theme.mainTextColor }}>
                                <p className="text-xs md:text-sm font-bold">{outlet.ratingcount.$numberInt}</p>
                                <p className="text-xs md:text-sm font-bold">Store ratings</p>
                            </div>
                        </div>
                    </div>
                    <div className='  flex gap-3 items-start justify-center md:justify-start'>
                        <div className='hidden md:flex items-center gap-2'>
                            <div style={{ fontFamily: 'Montserrat', backgroundColor: theme.differentColorGreen, color: 'white' }} className='flex items-center gap-1 rounded-lg p-1 px-2 text-white'>
                                <p className="text-lg md:text-xl font-semibold">{outlet.rating.$numberInt}</p>
                                <BsFillStarFill size={16} />
                            </div>
                            <div style={{ fontFamily: 'Montserrat', color: theme.mainTextColor }}>
                                <p className="text-xs md:text-sm font-bold">{outlet.ratingcount.$numberInt}</p>
                                <p className="text-xs md:text-sm font-bold">Store ratings</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className=' hidden md:flex gap-3 items-center text-center md:text-left'>
                    {/* <OutletStatus outlet={outlet} /> */}
                    <p style={{ color: status.color, fontFamily: 'Montserrat' }} className='font-semibold text-3xl uppercase'>
                        {status.text}
                    </p>
                    <h1 style={{ color: theme.textColor, marginBottom: -2 }} className="text-lg md:text-xl">
                        Serving hours: <span style={{ color: theme.mainTextColor }} className="font-bold">{outlet.openingTime} – {outlet.closingTime}</span>
                    </h1>
                    <h1 style={{ color: theme.textColor, marginBottom: -2 }} className="text-lg md:text-xl">
                        Offdays: <span style={{ color: theme.mainTextColor }} className="font-bold">{outlet.offDays.join(', ')}</span>
                    </h1>
                </div>

                <div
                    className={`md:hidden rounded-lg h-20 flex flex-col justify-center items-center text-center md:text-left`}
                    style={{
                        background: `linear-gradient(to bottom, ${status.color}, transparent)`
                    }}
                >
                    {/* <p style={{ fontFamily: 'Montserrat' }} className='font-semibold text-3xl mt-3 uppercase'>
                        {status.text}
                    </p> */}
                    <h1 style={{ color: theme.mainTextColor, marginBottom: -2 }} className="text-lg md:text-xl">
                        Serving hours: <span style={{ color: theme.mainTextColor }} className="font-bold">{outlet.openingTime} – {outlet.closingTime}</span>
                    </h1>
                    <h1 style={{ color: theme.mainTextColor, marginBottom: -2 }} className="text-lg md:text-xl">
                        Offdays: <span style={{ color: theme.mainTextColor }} className="font-bold">{outlet.offDays.join(', ')}</span>
                    </h1>
                </div>


            </div>


            <div className="flex ">

                <div style={{ backgroundColor: theme.componentColor }} className='hidden sticky md:block top-16 left-0 p-4 w-[15%] h-[calc(100vh-4rem)] overflow-y-auto'>
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} onClick={() => scrollToCategory(index)} className="cursor-pointer">
                                <h2
                                    style={{ color: selectedCategory === index ? theme.differentColorOrange : theme.textColor }}
                                    className={`text-3xl font-semibold mb-2 uppercase `}>
                                    {category.title}
                                </h2>
                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                </div>

                <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 px-4 py-3 overflow-x-auto flex space-x-4 z-10">
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} onClick={() => scrollToCategory(index)} className="cursor-pointer">
                                <h2 style={{ color: selectedCategory === index ? theme.differentColorOrange : theme.textColor }} className={`text-2xl font-semibold `}>
                                    {category.title}
                                </h2>
                            </div>
                        ))
                    ) : (
                        <p>No menu available</p>
                    )}
                </div>


                <div className='flex-1 ml-0'>
                    {/* <h1 className="text-3xl mb-4">{outlet.name}</h1> */}
                    {/* <div className='flex gap-8 mb-4'>
                        <h1>Recommended</h1>
                        <h1>Popular</h1>
                        <h1>Veg</h1>
                    </div> */}
                    {outlet.menu && outlet.menu.length > 0 ? (
                        outlet.menu.map((category, index) => (
                            <div key={category._id} className="mb-6" ref={el => categoryRefs.current[index] = el}>

                                <h2
                                    style={{ color: theme.mainTextColor }} // backgroundColor: theme.componentColor
                                    className={`text-3xl font-semibold mb-2 p-3 md:bg-transparent`}
                                >
                                    {category.title}
                                </h2>
                                <ul className=' p-4 hidden md:flex flex-wrap w-full justify-between'>
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

                                                <div className='pt-2 pb-4 flex justify-between items-center' >
                                                    <div>
                                                        <span style={{ color: theme.mainTextColor }} className="font-bold">{item.item}</span>
                                                        <div style={{ marginTop: -8 }} className='flex justify-between'>
                                                            <span style={{ fontFamily: 'Montserrat', color: theme.textColor }} className="font-bold text-base">₹{item.price}</span>
                                                        </div>
                                                    </div>
                                                    {!status.text.includes("Closed") && (
                                                        <div style={{ fontFamily: 'Montserrat', backgroundColor: theme.componentColor, borderColor: theme.secComponentColor }} className='relative w-[70px] h-8 rounded border-2 flex items-center justify-center text-base'>
                                                            {quantity > 0 ? (
                                                                <div className='flex items-center justify-between'>
                                                                    <button onClick={() => removeFromCart(item.id)} style={{ color: theme.textColor }} className=' w-[50%] h-full absolute left-1 '><FaMinus size={12} /></button>
                                                                    <span style={{ color: theme.mainTextColor }}>{quantity}</span>
                                                                    <button onClick={() => addToCart(item)} style={{ color: theme.textColor }} className=' absolute w-[50%] h-full right-1  flex items-center justify-end'><FaPlus size={12} /></button>
                                                                </div>
                                                            ) : (
                                                                <button onClick={() => addToCart(item)} style={{ color: theme.mainTextColor }} className='uppercase w-full h-full'>Add</button>
                                                            )}
                                                        </div>
                                                    )}

                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {category.items.map((item) => {
                                    const cartItem = cart.items.find(cartItem => cartItem.id === item.id);
                                    const quantity = cartItem ? cartItem.quantity : 0;

                                    return (
                                        <li
                                            key={item.id}
                                            className="flex flex-col md:hidden mb-16 relative p-2 min-h-48 shadow-xl "
                                        >
                                            <div className='flex justify-between items-start'>
                                                <div className='w-[60%] p-2'>
                                                    <div className='flex items-center mb-2'>
                                                        <FoodIcon type={item.type} size={12} padding={3} />
                                                    </div>
                                                    <div style={{ color: theme.mainTextColor, marginBottom: -10 }} className=' text-2xl font-bold'>{item.item}</div>
                                                    <div style={{ color: theme.textColor, fontFamily: 'Montserrat' }} className='text-base font-bold mb-1'>₹{item.price}</div>
                                                    <div className='flex gap-2 my-2 '>
                                                        <Rating rating={item.rating.$numberInt} backGround={theme.componentColor} />
                                                        <div style={{ color: theme.mainTextColor }} className='text-lg '>{item.ratingcount.$numberInt} ratings</div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            color: theme.textColor,
                                                            fontFamily: 'Montserrat',
                                                            overflow: 'hidden',
                                                            display: '-webkit-box',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 2,
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                        className='text-sm '
                                                    >
                                                        {item.description}
                                                    </div>
                                                </div>
                                                <div className="relative w-[40%]">
                                                    <img src={item.image} alt={item.item} className="h-40 w-full object-cover rounded-2xl" />
                                                    {!status.text.includes("Closed") && (
                                                        <div style={{ backgroundColor: theme.componentColor, color: theme.textColor }} className='border-[1px] border-l-indigo-50 absolute flex items-center justify-center left-1/2 transform -translate-x-1/2 -bottom-4 w-28 h-10 rounded-lg'>
                                                            {quantity > 0 ? (
                                                                <>
                                                                    <button onClick={() => removeFromCart(item.id)} className='absolute h-full w-[50%] left-0 px-2 rounded'>
                                                                        <FaMinus size={15} />
                                                                    </button>
                                                                    <span style={{ color: theme.differentColorGreen, fontFamily: 'Montserrat' }} className='font-bold text-lg'>{quantity}</span>
                                                                    <button onClick={() => addToCart(item)} className='absolute h-full w-[50%] flex items-center justify-end right-0 px-2 rounded'>
                                                                        <FaPlus size={15} />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <div onClick={() => addToCart(item)} className='border-[1px] flex items-center justify-center h-full w-full rounded-lg'>
                                                                    <button style={{ color: theme.differentColorGreen, fontFamily: 'Montserrat' }} className='uppercase text-white font-bold text-lg'>
                                                                        Add
                                                                    </button>
                                                                    <div className='absolute top-0 right-2'>+</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
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


                <div style={{ backgroundColor: theme.componentColor }} className='p-8 w-[30%] shadow-md hidden md:block'>
                    <ImageGallery outletName={outletName} />

                    <div style={{ color: theme.mainTextColor }} className='flex justify-between items-center mt-6'>
                        <div className='text-2xl font-semibold -mb-1'>Recommended Add-ons</div>
                        {/* <IoHeart /> */}
                    </div>
                    <div style={{ color: theme.textColor }} className='pt-2 text-lg '>
                        Above are some recommended add-ons that pair well with your selections.
                    </div>

                    {status.text.includes("Closed") ? (
                        <p style={{ color: theme.mainTextColor }} className="leading-[1.05] pt-6">
                            Our shop is currently closed, but don’t worry! Your cart will be waiting for you as soon as we reopen. Feel free to come back later!
                        </p>
                    ) : (
                        <div>
                            <div className='flex justify-between items-center mt-6'>
                                <div>
                                    <div style={{ color: theme.mainTextColor }} className='text-3xl font-bold -mb-2'>₹{getCartTotal().toFixed(2)}</div>
                                    <div style={{ color: theme.textColor }} className='text-xl'>{cart.items.length} items</div>
                                </div>
                                <div
                                    onClick={() => {
                                        alert(`YOUR ORDER IS SUCCESSFULLY PLACED FROM OUTLET ${outletName}`);
                                        console.log("YOUR ORDER IS SUCCESSFULLY PLACED")
                                        const updatedCarts = { ...cart };
                                        delete updatedCarts[outletName];
                                        localStorage.setItem('carts', JSON.stringify(updatedCarts));
                                        window.location.reload();
                                    }}
                                    style={{ backgroundColor: theme.differentColorOrange, fontFamily: 'Montserrat' }} className=' cursor-pointer rounded-full text-xl px-4 py-2 font-bold'>
                                    Checkout
                                </div>
                            </div>

                            {cart.items.length === 0 ? (
                                <p>No items in cart</p>
                            ) : (
                                <ul className='mt-4'>
                                    {cart.items.map((item) => (
                                        <li key={item.id} className='flex justify-between mb-4'>
                                            <div className='flex'>
                                                <img
                                                    src={item.image}
                                                    alt={item.item}
                                                    style={{ borderColor: theme.secComponentColor }}
                                                    className="border-2 h-20 w-20 mr-4 object-cover rounded-lg"
                                                />
                                                <div className='flex flex-col justify-between'>
                                                    <div>
                                                        <div style={{ color: theme.mainTextColor, marginBottom: -8 }} className='text-xl font-bold'>
                                                            <TruncatedTextComponent text={item.item} maxLength={11} />
                                                        </div>
                                                        <div style={{ color: theme.textColor }} className='text-lg font-light'>
                                                            Quantity: {item.quantity} * Rs.{item.price}
                                                        </div>
                                                    </div>
                                                    <div style={{ fontFamily: 'Montserrat', color: theme.mainTextColor }} className='text-base font-bold'>
                                                        ₹{(item.quantity * item.price).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex flex-col items-end justify-between relative'>
                                                <div style={{ color: theme.differentColorGreen, fontFamily: 'Montserrat' }} className='text-base font-bold uppercase'>
                                                    In Stock
                                                </div>
                                                <div style={{ borderColor: theme.secComponentColor, color: theme.textColor }} className='border-2 px-2 py-1 flex items-center justify-center rounded-lg w-20'>
                                                    <button onClick={() => removeFromCart(item.id)} className='absolute left-2 rounded'>
                                                        <FaMinus size={13} />
                                                    </button>
                                                    <span style={{ color: theme.differentColorGreen, marginBottom: -2 }} className='mx-3 text-lg'>
                                                        {item.quantity}
                                                    </span>
                                                    <button onClick={() => addToCart(item)} className='absolute right-2 rounded'>
                                                        <FaPlus size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                </div>
                {cart.items.length > 0 &&
                    <div style={{ backgroundColor: theme.differentColorOrange, color: theme.backgroundColor }} className="md:hidden fixed bottom-14 left-0 w-full py-2 px-4 overflow-x-auto flex space-x-4 z-10 justify-between text-2xl font-semibold">
                        <div>
                            {cart.items.length} items added
                        </div>
                        <div
                            onClick={() => {
                                alert(`YOUR ORDER IS SUCCESSFULLY PLACED FROM OUTLET ${outletName}`);
                                console.log("YOUR ORDER IS SUCCESSFULLY PLACED")

                                const updatedCarts = { ...cart };
                                delete updatedCarts[outletName];
                                localStorage.setItem('carts', JSON.stringify(updatedCarts));
                                window.location.reload();
                            }}
                            className='flex gap-1 items-center cursor-pointer' style={{ cursor: 'pointer' }}>
                            Checkout
                            <IoMdArrowDroprightCircle style={{ marginBottom: 4 }} />
                        </div>
                    </div>
                }
            </div>

            <Footer />
        </div>
    );
}
