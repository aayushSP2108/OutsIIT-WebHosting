import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
    const { theme, toggleTheme } = useTheme();
    const savedCarts = localStorage.getItem('carts');
    const carts = savedCarts ? JSON.parse(savedCarts) : {};

    const handleCheckout = (outletName) => {
        console.log('YOUR ORDER IS SUCCESSFULLY PLACED');
        alert(`YOUR ORDER IS SUCCESSFULLY PLACED FROM OUTLET ${outletName}`);

        const updatedCarts = { ...carts };
        delete updatedCarts[outletName];
        localStorage.setItem('carts', JSON.stringify(updatedCarts));
        window.location.reload();
    };

    return (
        <div style={{ backgroundColor: theme.backgroundColor }} className=" min-h-screen ">
            <Navbar />
            <h1 style={{ color: theme.differentColorOrange }} className="pt-28 text-4xl font-bold text-center text-blue-600 mb-6">Your Cart</h1>
            <div className=' min-h-screen p-8'>
                {Object.keys(carts).length === 0 ? (
                    <p style={{ color: theme.textColor }} className="text-xl text-center">Your cart is empty.</p>
                ) : (
                    Object.entries(carts).map(([outletName, cart]) => {
                        const totalPrice = Array.isArray(cart.items)
                            ? cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
                            : 0;

                        return (
                            <div key={outletName} style={{ backgroundColor: theme.shadowColor }} className="rounded-lg shadow-lg p-4 mb-4">
                                <h2 style={{ color: theme.mainTextColor }} className="text-2xl font-semibold ">{cart.storeName}</h2>
                                <ul className="list-disc pl-6 mt-2">
                                    {Array.isArray(cart.items) ? (
                                        cart.items.map(item => (
                                            <li key={item.id} style={{ color: theme.mainTextColor }} className="text-lg mb-1">
                                                {item.item} -
                                                <span style={{ color: theme.textColor }} className="font-bold"> Quantity: {item.quantity}</span> -
                                                <span style={{ color: theme.textColor }}> Price: ₹{item.price}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li style={{ color: theme.textColor }} className="text-lg mb-1">No items found.</li>
                                    )}
                                </ul>
                                <div className="flex justify-between items-center mt-4">
                                    <span style={{ color: theme.mainTextColor }} className="text-xl font-bold ">Total: ₹{totalPrice}</span>
                                    <button
                                        style={{ color: theme.backgroundColor, backgroundColor: theme.mainTextColor }}
                                        className=" p-2 rounded hover:bg-orange-500 transition"
                                        onClick={() => handleCheckout(outletName)}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
