import React, { useEffect, useState } from 'react';
import Dropdown from '../dropdown/dropdown';
import StatusBadge from '../../atom/statusBadge';

const TaskTable = ({task, onEdit = null, onDelete = null, selectedTasks, setSelectedTasks, handleSelectAll, handleSelectTask, openTaskForm}) => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    
    useEffect(() => {
        // 모든 작업에 대해 선택 상태를 초기화합니다.
        const initialSelectedTasks = {};
        task.forEach(t => {
            initialSelectedTasks[t.taskIdx] = false;
        });
        setSelectedTasks(initialSelectedTasks);
    }, [task, setSelectedTasks]);

    // :버튼을 눌렀을 때 해당하는 놈의 드롭 박스 나타나기
    const toggleDropdown = (e, idx) => {
        e.stopPropagation();
        setOpenDropdownIndex(openDropdownIndex === idx ? null : idx);
    };

    // 수정하기 버튼을 눌렀을 때 작동하는 함수
    const handleEditClick = (e,task) => {
        setOpenDropdownIndex(null);
        openTaskForm(e, task);
    };
    
    //삭제 버튼을 눌렀을 때 작동하는 함수
    const handleDeleteClick = (e, taskIdx) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDropdownIndex(null);
        onDelete(e, taskIdx);
    };

    // 각각의 체크박스를 눌렀을 때 작동
    const handleCheckboxChange = (e, taskIdx) => {
        e.stopPropagation(); // 이벤트 전파 중지
        handleSelectTask(taskIdx);
    };

    const isAllSelected = task.length > 0 && task.every(t => selectedTasks[t.taskIdx]);

    return (
        <section className='w-full mt-5'>
            <div className='relative max-h-500 overflow-y-auto shadow-lg'>
                <table className="w-full border-collapse box-border">
                    <colgroup>
                        <col style={{width: '5%'}} />
                        <col style={{width: '15%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '20%'}} />
                        <col style={{width: '10%'}} />
                    </colgroup>
                    <thead className="bg-white sticky top-0 z-20 thead-border">
                        <tr className="bg-white text-base">
                            <th className="p-2 text-sm text-gray-500 bg-white border-gray-300 relative th-border">
                                <input type="checkbox" checked={isAllSelected} onChange={(e) => handleSelectAll(e.target.checked)}/>
                            </th>
                            <th className="p-2 text-sm text-gray-500 bg-white border border-gray-300 relative">작업명</th>
                            <th className="p-2 text-sm text-gray-500 bg-white border border-gray-300 relative">담당자</th>
                            <th className="p-2 text-sm text-gray-500 bg-white border border-gray-300 relative">상태</th>
                            <th className="p-2 text-sm text-gray-500 bg-white border border-gray-300 relative">우선순위</th>
                            <th className="p-2 text-sm text-gray-500 bg-white border border-gray-300 relative">시작날짜</th>
                            <th className="p-2 text-sm text-gray-500 bg-white border border-gray-300 relative">마감날짜</th>
                            <th className="p-2 text-sm text-gray-500 bg-white border border-gray-300 relative">설명</th>
                            <th className="p-2 text-sm text-gray-500 bg-white border border-gray-300 relative">추가 작업</th>
                            </tr>
                        </thead>
                    <tbody className="overflow-y-auto" >
                    {task.map((task, i) => (
                        <tr key={i} className='relative hover:bg-gray-100' onClick={() => handleSelectTask(task.taskIdx)}>
                            <td className="p-2 border text-sm text-black items-center text-center">
                                <input type="checkbox" checked={selectedTasks[task.taskIdx] || false} onChange={(e) => handleCheckboxChange(e, task.taskIdx)} onClick={(e) => e.stopPropagation()}/>
                            </td>
                            <td className="p-2 border text-sm text-black items-center text-center">{task.taskName}</td>
                            <td className="p-2 border text-sm text-black items-center text-center">{task.assignedTo}</td>
                            <td className="p-2 border text-sm text-black items-center text-center">
                                <StatusBadge status={task.status} />
                            </td>
                            <td className="p-2 border text-sm text-black items-center text-center">{task.priority}</td>
                            <td className="p-2 border text-sm text-black items-center text-center">{task.startDate}</td>
                            <td className="p-2 border text-sm text-black items-center text-center">{task.endDate}</td>
                            <td className="p-2 border text-sm text-black items-center text-center truncate max-w-72">{task.taskDescription}</td>
                            <td className="p-2 border text-sm text-black relative items-center text-center">
                                <button onClick={(e) => toggleDropdown(e, i)} className="cursor-pointer text-3xl w-4">
                                    ⋮
                                </button>
                                <Dropdown 
                                    isOpen={openDropdownIndex === i} 
                                    onClose={() => setOpenDropdownIndex(null)}
                                >
                                    <button 
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={(e) => handleEditClick(e,task)}
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
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default TaskTable;