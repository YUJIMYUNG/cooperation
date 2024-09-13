import React, { useEffect, useState } from 'react';

const ModalFrame = ({children, handleModal}) => {
    return (
        <div>
            <div className='fixed z-50 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black bg-opacity-50'>
                {children}
            </div>
        </div>
    );
};


export default ModalFrame;