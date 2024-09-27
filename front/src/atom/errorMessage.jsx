import React from 'react';

const ErrorMessage = ({text}) => {
    
    
    return (
        <div className='pt-1 pl-1'>
            <p className="font-nanum-squareL text-xs text-red-600">{text}</p>
        </div>
    );
};

export default ErrorMessage;