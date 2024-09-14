import React, { useEffect, useState } from 'react';

const ModalBody = ({children, handleModal}) => {
    return (
        <div>
            <div className='h-400 align-middle flex flex-col items-center justify-center'>
                {children}
            </div>
        </div>
    );
};


export default ModalBody;