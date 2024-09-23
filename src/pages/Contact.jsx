import React from "react";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import colors from "../styles/colors";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <div id="contact-us" style={{backgroundColor: colors.backgroundColor}} className="">
            <Navbar />
            <h2 style={{color: colors.differentColorOrange}} className="pt-24 px-3 md:px-10 text-6xl font-extrabold">Contact Us</h2>
            
            <div className="pt-3 px-3 md:pt-10 md:px-10 flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col gap-6 md:w-1/2">
                    <p style={{color: colors.mainTextColor}} className="text-4xl font-medium ">
                        We're here to assist you!
                    </p>
                    <p style={{color: colors.textColor}} className="text-2xl">
                        Our team is dedicated to providing you with exceptional service. A great living environment can enhance your quality of life.
                    </p>
                    <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap justify-between sm:justify-start md:gap-8">
                            <ContactCard icon={<MdCall size={30} />} title="Call" number="021 123 145 14" buttonText="Call now" />
                            <ContactCard icon={<BsFillChatDotsFill size={30} />} title="Chat" number="021 123 145 14" buttonText="Chat now" />
                        </div>

                        <div className="flex flex-wrap justify-between sm:justify-start md:gap-8">
                            <ContactCard icon={<BsFillChatDotsFill size={30} />} title="Video Call" number="021 123 145 14" buttonText="Video Call now" />
                            <ContactCard icon={<HiChatBubbleBottomCenter size={30} />} title="Message" number="021 123 145 14" buttonText="Message now" />
                        </div>
                    </div>
                </div>

                <div className="flex mt-10 justify-center items-center md:w-1/2">
                    <div className="relative h-[30rem] overflow-hidden rounded-[15px] border-4 border-white/20 shadow-lg">
                        <img src="https://news.iitgn.ac.in/wp/wp-content/uploads/2019/07/ANK383_2224a-1280x640.jpg" alt="houses" className="w-full h-full object-cover transition-transform transform hover:scale-105" />
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

const ContactCard = ({ icon, title, number, buttonText }) => (
    <div style={{backgroundColor: colors.shadowColor}} className="flex flex-col items-center border border-gray-300 rounded-lg p-3 transition-transform hover:shadow-lg hover:scale-101 ">
        <div className="flex items-center mb-3">
            <div style={{color: colors.mainTextColor, backgroundColor: colors.secComponentColor}} className="flex items-center justify-center w-12 h-12 rounded-full">
                {icon}
            </div>
            <div className="flex flex-col ml-3">
                <span style={{color: colors.mainTextColor}} className="text-lg md:text-xl font-semibold ">{title}</span>
                <span style={{color: colors.textColor}} className="text-sm md:text-base">{number}</span>
            </div>
        </div>
        <button style={{backgroundColor: colors.differentColorOrange, color: colors.backgroundColor}} className="mt-1 w-full font-semibold py-1 rounded transition-all duration-200">
            {buttonText}
        </button>
    </div>
);

export default Contact;
