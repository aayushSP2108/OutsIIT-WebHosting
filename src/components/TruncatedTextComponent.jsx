import React from 'react';

const TruncatedTextComponent = ({ text, maxLength }) => {
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

    return <span>{truncatedText}</span>;
};

export default TruncatedTextComponent;
