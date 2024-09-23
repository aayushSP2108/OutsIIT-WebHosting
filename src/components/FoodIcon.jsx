import React from 'react';
import { IoEllipse, IoTriangle } from 'react-icons/io5';

const FoodIcon = ({ type, size, padding }) => {
    const iconConfig = {
        PureVeg: {
            Icon: IoEllipse,
            borderColor: 'green',
            iconColor: 'green',
            // bgColor: 'bg-gray-50',
        },
        Veg: {
            Icon: IoEllipse,
            borderColor: 'green',
            iconColor: 'green',
            // bgColor: '#FFFFFF',
        },
        NonVeg: {
            Icon: IoTriangle,
            borderColor: 'rgb(185 28 28)',
            iconColor: 'rgb(185 28 28)',
            // bgColor: 'bg-red-300',
        },
    };

    const { Icon, borderColor, iconColor, bgColor } = iconConfig[type] || {};

    return (
        <div
            className={`food-icon-container ${bgColor} mr-1 flex justify-center items-center`}
            style={{ borderColor, borderWidth: 2, padding, borderRadius: '4px', display: 'inline-flex' }}
        >
            {Icon && <Icon size={size} color={iconColor} />}
        </div>
    );
};

export default FoodIcon;
