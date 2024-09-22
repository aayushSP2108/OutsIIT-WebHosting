import React from 'react';
import colors from '../styles/colors';

export const OutletStatus = ({ outlet }) => {
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
        return (
            <div>
                <p>Closed Today</p>
                <p>Off Days: {offDays.join(', ')}</p>
            </div>
        );
    }

    const closingBufferStart = closingTimeInMinutes - 60;
    const closingBufferEnd = closingTimeInMinutes;
    const openingBufferStart = openingTimeInMinutes;
    const openingBufferEnd = openingTimeInMinutes + 60;

    if (currentTimeInMinutes >= closingBufferStart && currentTimeInMinutes < closingBufferEnd) {
        return <p style={{ color: colors.differentColorYellow}} className=' text-3xl'>Closing in {closingTimeInMinutes - currentTimeInMinutes} minutes</p>;
    } else if (currentTimeInMinutes >= openingBufferStart && currentTimeInMinutes < openingBufferEnd) {
        return <p style={{ color: colors.differentColorYellow}} className=' text-yellow-400 text-3xl'>Opening in {openingTimeInMinutes - currentTimeInMinutes} minutes</p>;
    } else if (currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes < closingTimeInMinutes) {
        return <p style={{ color: colors.differentColorGreen, fontFamily: 'Montserrat'}} className=' font-semibold text-3xl uppercase'>Open</p>;
    } else {
        return <p style={{ color: colors.differentColorRed, fontFamily: 'Montserrat'}} className=' font-semibold text-3xl uppercase'>Closed</p>;
    }
};
