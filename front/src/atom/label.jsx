import React from 'react';

const Label = ({id, content}) => {
    return (
        <div>
            <label className='font-nanum-squareB' htmlFor={id}>{content}</label> 
        </div>
    );
};

export default Label;