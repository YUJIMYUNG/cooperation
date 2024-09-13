import React from 'react';

const Input = ({widthSize, placeholder,onChange}) => {
    // 5열은 기본적으로 설정 되는 스타일들
    const inputClasses = `
    h-10 border rounded-md m-4 shadow-sm 
    ${widthSize === '300' ? 'w-300' : ''}
    ${widthSize === '140' ? 'w-140' : ''}
    ${widthSize ? '':'w-400'}
    `.trim();


    return (
        <div>
            <input className={inputClasses} placeholder={placeholder} onChange={onChange}></input>
        </div>
    );
};




export default Input;