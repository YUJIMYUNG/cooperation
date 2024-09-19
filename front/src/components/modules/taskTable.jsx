import React, { useState } from 'react';
import Dropdown from '../dropdown/dropdown';

const TaskTable = ({task, onEdit, onDelete}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    console.log(task);

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
        <section className='w-full mt-5'>
            <table className="w-full border-collapse">
                <colgroup>
                    <col style={{width: '5%'}} />   {/* 체크박스 */}
                    <col style={{width: '20%'}} />  {/* 작업명 */}
                    <col style={{width: '10%'}} />  {/* 담당자 */}
                    <col style={{width: '10%'}} />  {/* 상태 */}
                    <col style={{width: '10%'}} />  {/* 우선순위 */}
                    <col style={{width: '10%'}} />  {/* 시작날짜 */}
                    <col style={{width: '10%'}} />  {/* 마감날짜 */}
                    <col style={{width: '20%'}} />  {/* 설명 */}
                    <col style={{width: '5%'}} />   {/* ... 버튼 */}
                </colgroup>
                <thead>
                    <tr className="bg-white text-base" >
                        <th className="p-2 border text-sm text-gray-500">
                            <input type="checkbox" />
                        </th>
                        <th className="p-2 border text-sm text-gray-500">작업명</th>
                        <th className="p-2 border text-sm text-gray-500">담당자</th>
                        <th className="p-2 border text-sm text-gray-500">상태</th>
                        <th className="p-2 border text-sm text-gray-500">우선순위</th>
                        <th className="p-2 border text-sm text-gray-500">시작날짜</th>
                        <th className="p-2 border text-sm text-gray-500">마감날짜</th>
                        <th className="p-2 border text-sm text-gray-500">설명</th>
                        <th className="p-2 border text-sm text-gray-500">추가 작업</th>
                    </tr>
                </thead>
                {task.map((task, i) => (
                    <tbody>
                        <td className="p-2 text-sm text-black">
                            <input type="checkbox" />
                        </td>
                        <td className="p-2 text-sm text-black"></td>
                        <td className="p-2 text-sm text-black"></td>
                        <td className="p-2 text-sm text-black"></td>
                        <td className="p-2 text-sm text-black"></td>
                        <td className="p-2 text-sm text-black"></td>
                        <td className="p-2 text-sm text-black"></td>
                        <td className="p-2 text-sm text-black"></td>
                        <td className="p-2 text-sm text-black"></td>
                    </tbody>
                ))}
            </table>
            <Dropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)}>
                <button 
                    className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
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
        </section>
    );
};

export default TaskTable;