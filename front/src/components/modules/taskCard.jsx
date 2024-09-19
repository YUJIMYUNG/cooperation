import { useState } from "react";
import UserIcon from "../../atom/userIcon";

const TaskCard = ({ task, onClick, onEdit, onDelete }) => {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    return(
        <div className="bg-white p-3 rounded shadow cursor-pointer mb-4 flex flex-col gap-2">
            <div className="flex justify-between">
                <h3 className="font-bold">{task.taskName}</h3>
                <p className="align-top font-bold" onClick={onClick}>···</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 align-middle">
                    {task.endDate}
                </p>
                <UserIcon color={"gray"} nickname={"asdfa"} size={"sm"}/>
            </div>
        </div>
)};

export default TaskCard;