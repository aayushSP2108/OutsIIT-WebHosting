import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { FaMicrophone } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Contact = () => {
    return (
        <section className="relative z-10 p-8 text-black">
            <Navbar />
            <div className="flex pt-20 justify-around items-end">
                <div className="flex flex-col gap-12 hero-left">
                    <div className="relative">
                        <div className="h-16 w-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full absolute right-1/4 top-[-2.5rem] z-[-1]" />
                        <h1 className="font-semibold text-4xl leading-[4rem]">
                            Discover <br />
                            the Best Meal<br />
                            for you
                        </h1>
                    </div>
                    <div className="flex flex-col gap-2 secondaryText flexhero-des">
                        <span>Find Your Favorite Meals Easily discover a variety of food options that cater to your taste.</span>
                        <span>Forget the hassle of meal planning—delicious dining is just a click away!</span>
                    </div>


                    <div className="flex justify-between stats w-full">
                        <div className="flex flex-col items-center stat">
                            <span className="text-2xl">
                                <CountUp start={1400} end={1500} duration={4} /> <span>+</span>
                            </span>
                            <span className="secondaryText">Dishes Available</span>
                        </div>

                        <div className="flex flex-col items-center stat">
                            <span className="text-2xl">
                                <CountUp start={49900} end={50000} /> <span>+</span>
                            </span>
                            <span className="secondaryText">Happy Customers</span>
                        </div>

                        <div className="flex flex-col items-center stat">
                            <span className="text-2xl">
                                <CountUp end={21} /> <span>+</span>
                            </span>
                            <span className="secondaryText">Available Outlets</span>
                        </div>
                    </div>
                </div>

                <div className="flex hero-right">
                    <div className="w-[30rem] h-[35rem] overflow-hidden rounded-tl-[15rem] rounded-tr-[15rem] border-8 border-white/12 image-container">
                        <img src="./hero-image.png" alt="houses" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
