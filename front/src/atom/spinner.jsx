import React from 'react';

const Spinner = ({ size = 'md', color = 'blue' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };
  
    const colorClasses = {
      blue: 'border-blue-500',
      green: 'border-green-500',
      red: 'border-red-500',
      yellow: 'border-yellow-500',
      gray: 'border-gray-500'
    };
  
    return (
      <div className="flex justify-center items-center">
        <div
          className={`
            ${sizeClasses[size] || sizeClasses.md}
            ${colorClasses[color] || colorClasses.blue}
            border-4 border-t-transparent rounded-full animate-spin
          `}
        ></div>
      </div>
    );
  };
  
  export default Spinner;