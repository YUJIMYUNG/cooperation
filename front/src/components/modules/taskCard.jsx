import { useState } from "react";
import UserIcon from "../../atom/userIcon";
import Dropdown from "../dropdown/dropdown";

const TaskCard = ({ task, onClick, onEdit, onDelete }) => {
    
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);


    // :버튼을 눌렀을 때 해당하는 놈의 드롭 박스 나타나기
    const toggleDropdown = (e, idx) => {
        e.stopPropagation();
        setOpenDropdownIndex(openDropdownIndex === idx ? null : idx);
    };

    // 수정하기 버튼을 눌렀을 때 작동하는 함수
    const handleEditClick = (e,taskIdx) => {
        e.stopPropagation(); // 이벤트 전파 중지
        setOpenDropdownIndex(null);
        onEdit(taskIdx);
    };
    
    //삭제 버튼을 눌렀을 때 작동하는 함수
    const handleDeleteClick = (e, taskIdx) => {
        e.stopPropagation(); // 이벤트 전파 중지
        setOpenDropdownIndex(null);
        onDelete(taskIdx);
    };

    return(
        <div className="bg-white p-3 rounded shadow cursor-pointer mb-4 flex flex-col gap-2">
            <div className="flex justify-between">
                <h3 className="font-bold">{task.taskName}</h3>
                <div className="relative">
                    <p className="align-top font-bold" onClick={e => toggleDropdown(e, task.taskIdx)}>···</p>
                    <Dropdown 
                        isOpen={openDropdownIndex === task.taskIdx} 
                        onClose={() => setOpenDropdownIndex(null)}
                    >
                        <button 
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => handleEditClick(e,task.taskIdx)}
                        >
                            수정
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => handleDeleteClick(e,task.taskIdx)}
                        >
                            삭제
                        </button>
                    </Dropdown>
                </div>
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