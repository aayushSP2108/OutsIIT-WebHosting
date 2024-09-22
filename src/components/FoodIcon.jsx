import React from 'react';
import { IoEllipse, IoTriangle } from 'react-icons/io5';

const FoodIcon = ({ type, size, padding }) => {
    const iconConfig = {
        PureVeg: {
            Icon: IoEllipse,
            borderColor: 'green',
            iconColor: 'green',
            bgColor: 'bg-green-300',
        },
        Veg: {
            Icon: IoEllipse,
            borderColor: '#a3e635',
            iconColor: '#a3e635',
            bgColor: 'bg-lime-600',
        },
        NonVeg: {
            Icon: IoTriangle,
            borderColor: 'red',
            iconColor: 'red',
            bgColor: 'bg-red-300',
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
