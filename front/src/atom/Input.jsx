import React from 'react';


const Input = ({widthSize,placeholder,onChange, value, type, id,onBlur}) => {

    // 5열은 기본적으로 설정 되는 스타일들
    const inputClasses = `
    h-10 border rounded-md shadow-sm font-nanum-squareL text-sm p-1
    ${widthSize === '300' ? 'w-300' : ''}
    ${widthSize === '140' ? 'w-140' : ''}
    ${widthSize === '200' ? 'w-48' : ''}
    ${widthSize ? '':'w-400'}
    `.trim();


    return (
        <div>
            <input className={inputClasses} placeholder={placeholder} onChange={onChange} value={value} type={type} id={id} onBlur={onBlur}></input>
        </div>
    );
};




export default Input;