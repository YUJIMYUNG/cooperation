import React from 'react';
import Button from '../../atom/button';

const ModalBottom = ({children}) => {
    return (
        <div className="h-100 m-4 border-t-2 p-4 flex justify-center">

            {children}

        </div>
        
    );
};

export default ModalBottom;