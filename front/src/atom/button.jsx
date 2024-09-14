import React from 'react';

const Button = ({text, color, onClickHandler, type}) => {

    const buttonClasses = `
        px-2 py-2 h-10 rounded-lg border cursor-pointer font-nanum-squareL text-sm 
        ${color === 'yellow' ? 'bg-yellow-400 text-white border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500' : ''}
        ${color === 'red' ? 'bg-red-600 text-white border-red' : ''}
        ${color === 'white' ? 'bg-white border-none text-black' : ''}
        ${color === 'gray' ? 'bg-gray-400 border-none text-gray-800' : ''}
        ${color === '' ? 'border-none text-gray-400 text-sm	' : ''}
    `.trim();
    return (
        <button type={type} className={buttonClasses} onClick={onClickHandler}>
           {text}
           <div className=''></div>
        </button>
    );
};

export default Button;      