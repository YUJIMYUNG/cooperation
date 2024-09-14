import React from 'react';
import Button from '../../atom/button';

const ModalBottom = ({children}) => {
    return (
        <div className="h-140 m-4 border-t-2 p-6 flex">

            {children}

        </div>
        
    );
};

export default ModalBottom;