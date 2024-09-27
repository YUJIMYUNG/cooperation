import React from 'react';

const Button = ({text, color, onClickHandler = null, type, disabled}) => {

    const buttonClasses = `
        px-2 py-2 h-10 rounded-lg border cursor-pointer font-nanum-squareL text-sm disabled:bg-gray-300
        ${color === 'yellow' ? 'bg-yellow-400 text-white  hover:bg-yellow-500 ' : ''}
        ${color === 'red' ? 'bg-red-600 text-white ' : ''}
        ${color === 'white' ? 'bg-white border-black ' : ''}
        ${color === 'gray' ? 'bg-gray-400 border-none ' : ''}
        ${color === '' ? 'border-none text-gray-400 text-sm	' : ''}
    `.trim();
    return (
        <button type={type} className={buttonClasses} onClick={onClickHandler} disabled={disabled}>
           {text}
        </button>
    );
};

export default Button;      