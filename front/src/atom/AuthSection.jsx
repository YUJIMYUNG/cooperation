import React from 'react';

const AuthSection = ({children}) => {
    return (
        <div className='fixed z-50 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='border bg-white rounded-lg shadow-md p-2 m-auto flex flex-col items-center align-middle '>
                {children}
            </div>
        </div>
    );
};

export default AuthSection;