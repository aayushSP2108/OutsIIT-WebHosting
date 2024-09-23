import React from 'react';
import { BsFillStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Rating = ({ rating, border, gaps, backGround, size }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div
            style={{
                borderWidth: border,
                padding: '2px',
                paddingLeft: '6px',
                paddingRight: '6px',
                gap: gaps || '1px',
                backgroundColor: backGround || '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
            }}
            className='rating-container rounded-md border-[1px] border-[#F4BE1B] p-1'
        >
            {[...Array(fullStars)].map((_, index) => (
                <BsFillStarFill key={`full-${index}`} size={size || 14} color='#F4BE1B' />
            ))}
            {halfStars === 1 && (
                <BsStarHalf key='half' size={size || 14} color='#F4BE1B' />
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <BsStar key={`empty-${index}`} size={size || 14} color='#BCBDBB' />
            ))}
        </div>
    );
};

export default Rating;
