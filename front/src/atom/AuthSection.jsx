import React from 'react';

const AuthSection = ({children}) => {
    return (
        <div className='w-500 h-600 border bg-white rounded-lg shadow-md p-2 m-auto flex flex-col items-center align-middle '>
            {children}
        </div>
    );
};

export default AuthSection;