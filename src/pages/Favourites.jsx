import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

export default function Favourites() {
    const { theme } = useTheme();
    return (
        <div style={{ backgroundColor: theme.backgroundColor }} className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex flex-col justify-center items-center p-8">
                <h1 style={{ color: theme.differentColorOrange }} className="text-4xl font-bold text-center text-blue-600 mb-6">
                    Your Favourites
                </h1>
                <h2 style={{ color: theme.mainTextColor }} className="text-4xl font-semibold mb-4 text-center">
                    We're Working on It!
                </h2>
                <p style={{ color: theme.textColor }} className="mb-4 text-center">
                    This section is under development. We're working hard to bring you new features. Stay tuned!
                </p>
            </div>
            <Footer />
        </div>
    );
}
