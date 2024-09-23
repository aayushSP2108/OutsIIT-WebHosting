import React from 'react'
import fssaiLogo from "./../data/fssai.png";
import { FaCaretRight, FaRegQuestionCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function FooterMenu() {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="mb-56 text-white p-4">
            <div className="gap-3">
                <h2 style={{ fontFamily: 'Montserrat', color: theme.mainTextColor }} className="font-black text-2xl sm:text-3xl">Disclaimer:</h2>
                <p style={{ fontFamily: 'Montserrat', color: theme.textColor }} className="text-sm sm:text-base font-bold mt-2">
                    Be mindful of portion sizes, especially when dining out, as restaurant portions are often larger than necessary.
                </p>
                <p style={{ fontFamily: 'Montserrat', color: theme.textColor }} className="text-sm sm:text-base font-bold mt-2">
                    Not all fats are bad. Omega-3 fatty acids, found in fish, flaxseeds, and walnuts, are beneficial for heart health.
                </p>
                <p style={{ fontFamily: 'Montserrat', color: theme.textColor }} className="text-sm sm:text-base font-bold mt-2">
                    The average adult needs about 8 cups (2 liters) of water per day, but individual needs may vary based on activity level, climate, and overall health.
                </p>
                <p style={{ fontFamily: 'Montserrat', color: theme.textColor }} className="text-sm sm:text-base font-bold mt-2">
                    An average active adult requires 2,000 kcal of energy per day; however, calorie needs may vary.
                </p>
            </div>
            <hr className="my-5 border-white" />
            <button className="flex justify-between items-center -my-2">
                <div className="flex items-center">
                    <FaRegQuestionCircle className="text-red-500" size={22} />
                    <span className="ml-2 text-red-500 text-xl sm:text-2xl">Report an issue with the menu</span>
                </div>
                <FaCaretRight className="text-red-500" size={22} />
            </button>
            <hr className="my-5 border-white" />
            <div className=" items-center">
                <img
                    src={fssaiLogo}
                    className="w-14 h-11"
                    alt="Logo"
                />
                <span className="ml-2 text-xl sm:text-2xl">Lic. No. 1234567891011</span>
            </div>
        </div>

    )
}
