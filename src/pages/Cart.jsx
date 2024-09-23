import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
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
        <div className="bg-gray-100 min-h-screen p-8">
            <Navbar />
            <h1 className="pt-20 text-4xl font-bold text-center text-blue-600 mb-6">Your Cart</h1>
            {Object.keys(carts).length === 0 ? (
                <p className="text-xl text-gray-600 text-center">Your cart is empty.</p>
            ) : (
                Object.entries(carts).map(([outletName, cart]) => {
                    // Ensure cart.items is an array before using reduce
                    const totalPrice = Array.isArray(cart.items)
                        ? cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
                        : 0;

                    return (
                        <div key={outletName} className="bg-white rounded-lg shadow-lg p-4 mb-4">
                            <h2 className="text-2xl font-semibold text-blue-500">{cart.storeName}</h2>
                            <ul className="list-disc pl-6 mt-2">
                                {Array.isArray(cart.items) ? (
                                    cart.items.map(item => (
                                        <li key={item.id} className="text-lg text-gray-800 mb-1">
                                            {item.item} - 
                                            <span className="font-bold"> Quantity: {item.quantity}</span> - 
                                            <span className="text-green-600"> Price: ₹{item.price}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-lg text-gray-800 mb-1">No items found.</li>
                                )}
                            </ul>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold text-gray-800">Total: ₹{totalPrice}</span>
                                <button 
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    onClick={() => handleCheckout(outletName)}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    );
                })
            )}

<Footer/>
        </div>
    );
};

export default Cart;
