import React from 'react';

const Label = ({id, content}) => {
    return (
        <div>
            <label htmlFor={id}>{content}</label> 
        </div>
    );
};

export default Label;