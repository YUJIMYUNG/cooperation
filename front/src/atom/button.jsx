import React from 'react';

const Button = ({text, color, onClickHandler, type}) => {

    const buttonClasses = `
        px-4 py-2 rounded-lg border cursor-pointer
        ${color === 'yellow' ? 'bg-yellow-400 text-white border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500' : ''}
        ${color === 'red' ? 'bg-red-600 text-white border-red' : ''}
        ${color === 'white' ? 'bg-white border-none text-black' : ''}
        ${color === '' ? 'border-none text-gray-400 text-sm	' : ''}
    `.trim();
    return (
        <button type={type} className={buttonClasses} onClick={onClickHandler}>
           {text}
           <div className='hover:'></div>
        </button>
    );
};

export default Button;      