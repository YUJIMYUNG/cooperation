import React from 'react';

const AuthSection = ({children}) => {
    return (
        <div className='w-500 h-600 border rounded-lg shadow-md p-2 m-auto flex flex-col items-center align-middle translate-y-1/4'>
            {children}
        </div>
    );
};

export default AuthSection;