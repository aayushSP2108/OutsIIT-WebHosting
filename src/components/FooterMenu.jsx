import React from 'react'
import fssaiLogo from "./../data/fssai.png";
import { FaCaretRight, FaRegQuestionCircle } from 'react-icons/fa';

export default function FooterMenu() {
  return (
    <div className="p-6 bg-gray-800 h-[90vh] text-white">
                        <div className="gap-3">
                            <h2 className="font-bold text-2xl">Disclaimer:</h2>
                            <p className="mt-2">
                                Be mindful of portion sizes, especially when dining out, as restaurant portions are often larger than necessary.
                            </p>
                            <p className="mt-2">
                                Not all fats are bad. Omega-3 fatty acids, found in fish, flaxseeds, and walnuts, are beneficial for heart health.
                            </p>
                            <p className="mt-2">
                                The average adult needs about 8 cups (2 liters) of water per day, but individual needs may vary based on activity level, climate, and overall health.
                            </p>
                            <p className="mt-2">
                                An average active adult requires 2,000 kcal of energy per day; however, calorie needs may vary.
                            </p>
                        </div>
                        <hr className="my-5 border-white" />
                        <button className="flex justify-between items-center py-3">
                            <div className="flex items-center">
                                <FaRegQuestionCircle className="text-red-500" size={22} />
                                <span className="ml-2 text-red-500">Report an issue with the menu</span>
                            </div>
                            <FaCaretRight className="text-red-500" size={22} />
                        </button>
                        <hr className="my-5 border-white" />
                        <div className="flex items-center mb-7">
                            <img
                                src={fssaiLogo}
                                className="w-14 h-11"
                                alt="Logo"
                            />
                            <span className="ml-2">Lic. No. 1234567891011</span>
                        </div>
                    </div>
  )
}
