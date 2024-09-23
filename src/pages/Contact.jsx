import React from "react";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div id="contact-us" style={{ backgroundColor: theme.backgroundColor }} className="">
            <Navbar />
            <h2 style={{ color: theme.differentColorOrange }} className="pt-24 px-3 md:px-10 text-6xl font-extrabold">Contact Us</h2>

            <div className="pt-3 px-3 md:pt-10 md:px-10 flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col gap-6 md:w-1/2">
                    <p style={{ color: theme.mainTextColor }} className="text-4xl font-medium ">
                        We're here to assist you!
                    </p>
                    <p style={{ color: theme.textColor }} className="text-2xl">
                        Whether you have inquiries about your order, suggestions for improvement, or just want to chat, we’re here for you!
                        Feel free to reach out, and we’ll get back to you as soon as possible. Thank you for being a valued part of our community!
                    </p>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap justify-between sm:justify-start md:gap-8">
                            <ContactCard theme={theme} icon={<MdCall size={30} />} title="Call" number="+91 1234567789" buttonText="Call now" />
                            <ContactCard theme={theme} icon={<BsFillChatDotsFill size={30} />} title="Chat" number="+91 1234567789" buttonText="Chat now" />
                        </div>

                        <div className="flex flex-wrap justify-between sm:justify-start md:gap-8">
                            <ContactCard theme={theme} icon={<BsFillChatDotsFill size={30} />} title="Video Call" number="+91 1234567789" buttonText="Video Call now" />
                            <ContactCard theme={theme} icon={<HiChatBubbleBottomCenter size={30} />} title="Message" number="+91 1234567789" buttonText="Message now" />
                        </div>
                    </div>
                </div>

                <div className="flex mt-10 justify-center items-center md:w-1/2">
                    <div className="relative h-[30rem] overflow-hidden rounded-[15px] border-4 border-white/20 shadow-lg">
                        <img src="https://news.iitgn.ac.in/wp/wp-content/uploads/2019/07/ANK383_2224a-1280x640.jpg" alt="houses" className="w-full h-full object-cover transition-transform transform hover:scale-105" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const ContactCard = ({ icon, title, number, buttonText, theme }) => (
    <div style={{ backgroundColor: theme.shadowColor }} className="flex flex-col items-center border border-gray-300 rounded-lg p-3 transition-transform hover:shadow-lg hover:scale-101 ">
        <div className="flex items-center mb-3">
            <div style={{ color: theme.mainTextColor, backgroundColor: theme.secComponentColor }} className="flex items-center justify-center w-12 h-12 rounded-full">
                {icon}
            </div>
            <div className="flex flex-col ml-3">
                <span style={{ color: theme.mainTextColor }} className="text-lg md:text-xl font-semibold ">{title}</span>
                <span style={{ color: theme.textColor }} className="text-sm md:text-base">{number}</span>
            </div>
        </div>
        <button style={{ backgroundColor: theme.differentColorOrange, color: theme.backgroundColor }} className="mt-1 w-full font-semibold py-1 rounded transition-all duration-200">
            {buttonText}
        </button>
    </div>
);

export default Contact;
