// getStatus.jsx
import React from 'react';
import colors from '../styles/colors'; // Adjust the path based on your folder structure

export const getStatus = (outlet) => {
    const { offDays, openingTime, closingTime } = outlet;
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;

    const [openHour, openMinutes] = openingTime.split(' ')[0].split(':').map(Number);
    const openPeriod = openingTime.includes('pm') && openHour !== 12 ? openHour + 12 : openHour;
    const openingTimeInMinutes = openPeriod * 60 + openMinutes;

    const [closeHour, closeMinutes] = closingTime.split(' ')[0].split(':').map(Number);
    const closePeriod = closingTime.includes('pm') && closeHour !== 12 ? closeHour + 12 : closeHour;
    const closingTimeInMinutes = closePeriod * 60 + closeMinutes;

    if (offDays.includes(currentDay)) {
        return { color: colors.differentColorRed, text: 'Closed Today' };
    }

    const closingBufferStart = closingTimeInMinutes - 60;
    const closingBufferEnd = closingTimeInMinutes;
    const openingBufferStart = openingTimeInMinutes;
    const openingBufferEnd = openingTimeInMinutes + 60;

    if (currentTimeInMinutes >= closingBufferStart && currentTimeInMinutes < closingBufferEnd) {
        return { color: colors.differentColorYellow, text: `Closing in ${closingTimeInMinutes - currentTimeInMinutes} minutes` };
    } else if (currentTimeInMinutes >= openingBufferStart && currentTimeInMinutes < openingBufferEnd) {
        return { color: colors.differentColorYellow, text: `Opening in ${openingTimeInMinutes - currentTimeInMinutes} minutes` };
    } else if (currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes < closingTimeInMinutes) {
        return { color: colors.differentColorGreen, text: 'Open' };
    } else {
        return { color: colors.differentColorRed, text: 'Closed' };
    }
};
