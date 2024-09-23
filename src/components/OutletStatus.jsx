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

    // Convert opening and closing time from 24-hour format
    const [openHour, openMinutes] = openingTime.split(':').map(Number);
    const openingTimeInMinutes = openHour * 60 + openMinutes;

    const [closeHour, closeMinutes] = closingTime.split(':').map(Number);
    const closingTimeInMinutes = closeHour * 60 + closeMinutes;

    // Check if today is an off day
    if (offDays.includes(currentDay)) {
        return { color: theme.differentColorRed, text: 'Closed Today' };
    }

    // Handle overnight closing
    const isOvernight = closingTimeInMinutes < openingTimeInMinutes;

    if (isOvernight) {
        // Check if currently open
        if (
            (currentTimeInMinutes >= openingTimeInMinutes) || 
            (currentTimeInMinutes < closingTimeInMinutes)
        ) {
            // Check for closing soon within a 60-minute buffer
            if (currentTimeInMinutes >= closingTimeInMinutes - 60 && closingTimeInMinutes - currentTimeInMinutes > -60) {
                return { color: theme.differentColorYellow, text: `Closing in ${closingTimeInMinutes - currentTimeInMinutes} minutes` };
            }
            return { color: theme.differentColorGreen, text: 'Open' };
        }
    } else {
        // Regular open/close check
        if (currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes < closingTimeInMinutes) {
            // Check for closing soon within a 60-minute buffer
            if (currentTimeInMinutes >= closingTimeInMinutes - 60) {
                return { color: theme.differentColorYellow, text: `Closing in ${closingTimeInMinutes - currentTimeInMinutes} minutes` };
            }
            return { color: theme.differentColorGreen, text: 'Open' };
        }
    }

    // Check for opening soon within a 60-minute buffer
    if (currentTimeInMinutes < openingTimeInMinutes && 
        currentTimeInMinutes >= openingTimeInMinutes - 60) {
        return { color: theme.differentColorYellow, text: `Opening in ${openingTimeInMinutes - currentTimeInMinutes} minutes` };
    }

    // If not open and not within the opening or closing buffer, show closed
    return { color: theme.differentColorRed, text: 'Closed' };
};
