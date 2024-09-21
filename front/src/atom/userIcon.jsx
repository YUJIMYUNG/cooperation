import React from 'react';

const UserIcon = ({ size = 'md', color = 'gray',nickname ='User', onclick = null}) => {

    const truncatedNickname = nickname.slice(0, 4);
    
    const sizeClasses = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base'
    };

    const colorClasses = {
        black: 'bg-gray-800 text-white',
        blue: 'bg-blue-500 text-white',
        green: 'bg-green-500 text-white',
        yellow: 'bg-yellow-400 text-black',
        red: 'bg-red-500 text-white',
        skyBlue: 'bg-sky-400 text-white',
        purple: 'bg-purple-500 text-white',
        indigo: 'bg-indigo-500 text-white',
        fuchsia: 'bg-fuchsia-500 text-white',
        gray: 'bg-gray-200 text-gray-600'
    };

    return (
        <div className={`rounded-full flex items-center justify-center ${sizeClasses[size]} ${colorClasses[color]}`} onClick={onclick}>
            <span className="font-bold">{truncatedNickname}</span>
        </div>
    );
};

export default UserIcon;