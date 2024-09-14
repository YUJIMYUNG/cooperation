import React, { useEffect, useRef, useState } from 'react';
import ProjectBlockInner from './project_block_inner';

const ProjectBlock = ({ key, index, title, creator, description, startDate, endDate }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative'>
            <div className='h-20 border border-black w-full rounded-xl shadow-md drop-shadow-lg mt-5'>
                <ProjectBlockInner 
                    title={title}
                    creator={creator}
                    description={description}
                    startDate={startDate}
                    endDate={endDate}
                    extraAction={
                        <button onClick={toggleDropdown} className="cursor-pointer">
                            ⋮
                        </button>
                    }
                />
            </div>
            {isDropdownOpen && (
                <div 
                    ref={dropdownRef}
                    className="absolute right-0 top-11 mt-2 w-44 bg-white rounded-md shadow-lg z-10"
                >
                    <div className="py-1">
                        <button 
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                                console.log('수정 clicked for', title);
                                setIsDropdownOpen(false);
                            }}
                        >
                            수정
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                                console.log('삭제 clicked for', title);
                                setIsDropdownOpen(false);
                            }}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectBlock;