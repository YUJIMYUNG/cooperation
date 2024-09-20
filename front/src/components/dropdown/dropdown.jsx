import React, { useEffect, useRef } from 'react';

const Dropdown = ({ isOpen = null, onClose = null, children }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (    
        <div 
            ref={dropdownRef}
            className={`absolute right-0 top-11 mt-2 w-24 bg-white rounded-md shadow-lg z-10 `}
        >
            <div className="py-1">
                {children}
            </div>
        </div>
    );
};

export default Dropdown;