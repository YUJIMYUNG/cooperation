import React, { useState } from 'react';
import ProjectBlockInner from './projectBlockInner';
import Dropdown from '../dropdown/dropdown';
import DeleteConfirmModal from '../modal/deleteConfirmModal';
import { useNavigate } from 'react-router-dom';

export default function ProjectBlock({ idx, title, creator, description, startDate, endDate, onEdit, onDelete }){    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDeleteClick = () => {
        setIsDropdownOpen(false);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        setIsDeleteModalOpen(false);
        onDelete();
    };


    return (
        <div className='relative'>
            <div className='h-20 border border-black w-full rounded-xl shadow-md drop-shadow-lg mt-5 cursor-pointer' onClick={()=>navigate(`/project/${idx}/tasks`)}>
                <ProjectBlockInner 
                    title={title}
                    creator={creator}
                    description={description}
                    startDate={startDate}
                    endDate={endDate}
                    extraAction={
                        <button onClick={toggleDropdown} className="cursor-pointer text-3xl w-4">
                            ⋮
                        </button>
                    }
                />
            </div>
            <Dropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)}>
                <button 
                    className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                        console.log('수정 clicked for', title);
                        setIsDropdownOpen(false);
                        onEdit();
                    }}
                >
                    수정
                </button>
                <button 
                    className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {handleDeleteClick()}}
                >
                    삭제
                </button>
            </Dropdown>
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                projectTitle={title}
            />
        </div>
    );
};