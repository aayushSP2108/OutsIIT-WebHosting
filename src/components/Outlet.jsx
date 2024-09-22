import React from 'react'
import { getStatus } from './OutletStatus';
import { BsFillStarFill } from 'react-icons/bs';
import colors from '../styles/colors';

const convertToAMPM = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; // Converts 0 to 12 for midnight
    return `${adjustedHours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
};


export default function Outlet({ outlet }) {
    const status = getStatus(outlet);

    // const handleOutletClick = (outletName) => {
    //     navigate(`/menu/${outletName}`);
    //   };
      
    return (
        <div
            key={outlet.id}
            style={{ backgroundColor: colors.shadowColor }}
            className={`p-4 rounded-lg transition-shadow duration-300 cursor-pointer ${status.text.includes("Closed") ? 'grayscale' : ''}`} //shadow-custom md:shadow-none md:hover:shadow-custom

            // onClick={() => handleOutletClick(outlet.name)}
        >

            <div className="relative w-full rounded-lg mb-2">
                <img className='h-52 w-full object-cover rounded-lg' src={outlet.image} alt={outlet.name} />
                <p
                    style={{
                        color: colors.backgroundColor,
                        background: `linear-gradient(to right, ${colors.differentColorPurple},${colors.differentColorPurple}, transparent, transparent)`,
                    }}
                    className="absolute bottom-3 p-1 w-full text-xl md:text-2xl lg:text-xl"
                >
                    {outlet.location}
                </p>
            </div>


            <div className='flex justify-between items-center'>
                <div className='  w-[67%]'>
                    <h2
                        className="text-2xl md:text-2xl lg:text-2xl"
                        style={{
                            color: colors.mainTextColor,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {outlet.name}
                    </h2>
                    <p style={{ color: colors.textColor, marginBottom: -6 }} className='text-xl md:text-xl lg:text-xl'>{outlet.menuType.join(', ')}</p>
                    <div className='flex gap-3 items-center text-left'>
                        {/* <OutletStatus outlet={outlet} /> */}
                        <p style={{ color: status.color, fontFamily: 'Montserrat' }} className='font-semibold text-base'>
                            {status.text.includes("Closed") ? (
                                <>
                                    <div style={{ color: colors.mainTextColor }} className="font-bold">
                                        {convertToAMPM(outlet.openingTime)} – {convertToAMPM(outlet.closingTime)}
                                    </div>
                                </>
                            ) : (
                                status.text
                            )}
                        </p>

                        {/* <h1 style={{ color: colors.textColor, marginBottom: -2 }} className="text-lg md:text-xl">
                            Serving hours: <span style={{ color: colors.mainTextColor }} className="font-bold">{outlet.openingTime} – {outlet.closingTime}</span>
                        </h1>
                        <h1 style={{ color: colors.textColor, marginBottom: -2 }} className="text-lg md:text-xl">
                            Offdays: <span style={{ color: colors.mainTextColor }} className="font-bold">{outlet.offDays.join(', ')}</span>
                        </h1> */}
                    </div>
                </div>
                <div className='flex flex-col justify-end items-end '>
                    <div style={{ fontFamily: 'Montserrat', backgroundColor: colors.differentColorGreen, color: 'white' }} className='flex items-center gap-1 rounded-lg px-2 text-white w-16'>
                        <p className="text-lg md:text-xl font-semibold">{outlet.rating.$numberInt}</p>
                        <BsFillStarFill size={16} />
                    </div>
                    <div className='flex gap-1 border-b-2 border-dotted' style={{ borderBlockColor: colors.textColor, fontFamily: 'Montserrat', color: colors.mainTextColor }}>
                        <p className="text-xs md:text-sm font-bold">{outlet.ratingcount.$numberInt}</p>
                        <p className="text-xs md:text-sm font-bold">Store ratings</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
