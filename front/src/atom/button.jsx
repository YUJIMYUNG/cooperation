import React from 'react';

const Button = ({text, color}) => {

    const buttonClasses = `
        px-4 py-2 rounded-lg border
        ${color === 'yellow' ? 'bg-yellow-500 text-white border-yellow-500' : ''}
        ${color === 'red' ? 'bg-red-600 text-white border-red' : ''}
        ${color === 'white' ? 'bg-white border-none text-black' : ''}
    `.trim();
    return (
        <div className={buttonClasses}>
           {text}
        </div>
    );
};
export default Button;      