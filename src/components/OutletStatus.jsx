import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const getStatus = (outlet) => {
    const { theme, toggleTheme } = useTheme();

    const { offDays, openingTime, closingTime } = outlet;
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;

    const [openHour, openMinutes] = openingTime.split(':').map(Number);
    const openingTimeInMinutes = openHour * 60 + openMinutes;

    const [closeHour, closeMinutes] = closingTime.split(':').map(Number);
    const closingTimeInMinutes = closeHour * 60 + closeMinutes;

    if (offDays.includes(currentDay)) {
        return { color: theme.differentColorRed, text: 'Closed Today' };
    }

    const isOvernight = closingTimeInMinutes < openingTimeInMinutes;

    if (isOvernight) {
        if (
            (currentTimeInMinutes >= openingTimeInMinutes) ||
            (currentTimeInMinutes < closingTimeInMinutes)
        ) {
            if (currentTimeInMinutes >= closingTimeInMinutes - 60 && closingTimeInMinutes - currentTimeInMinutes > -60) {
                return { color: theme.differentColorYellow, text: `Closing in ${closingTimeInMinutes - currentTimeInMinutes} minutes` };
            }
            return { color: theme.differentColorGreen, text: 'Open' };
        }
    } else {
        if (currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes < closingTimeInMinutes) {
            if (currentTimeInMinutes >= closingTimeInMinutes - 60) {
                return { color: theme.differentColorYellow, text: `Closing in ${closingTimeInMinutes - currentTimeInMinutes} minutes` };
            }
            return { color: theme.differentColorGreen, text: 'Open' };
        }
    }

    if (currentTimeInMinutes < openingTimeInMinutes &&
        currentTimeInMinutes >= openingTimeInMinutes - 60) {
        return { color: theme.differentColorYellow, text: `Opening in ${openingTimeInMinutes - currentTimeInMinutes} minutes` };
    }

    return { color: theme.differentColorRed, text: 'Closed' };
};
