import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BodyHeader from '../../components/header/bodyHeader';
import { useSelector } from 'react-redux';
import Button from '../../atom/button';
import Search from '../../atom/search';
import UserIcon from '../../atom/userIcon';
import LayoutToggle from '../../atom/layoutToggle';
import TaskTable from '../../components/modules/taskTable';
import TaskCard from '../../components/modules/taskCard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TasksFormModal from '../../components/modal/tasksFormModal';
import DeleteConfirmModal from '../../components/modal/deleteConfirmModal';



function Task() {
    const { idx } = useParams();
    const idxN = Number(idx);
    const project = useSelector(state => state.projects.list.find(p => p.idx === idxN));
    // 샘플데이터
    const [tasks, setTasks] = useState([]);

    // table에 보낼 check 여부 변서
    const [selectedTasks, setSelectedTasks] = useState({});
    const [isListView, setIsListView] = useState(true);
    const [selectedCount, setSelectedCount] = useState(0);
    // 밑에 삭제를 위해 나타나는 모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    // TasksFormModal을 위한 상태
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    // 삭제 모달
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isBulkDelete, setIsBulkDelete] = useState(false);

    // tasks가 변경될 때마다 selectedTasks를 초기화합니다.
    // 갤러리에서 상태를 변경할 수 있기 때문에
    useEffect(() => {
        const initialSelectedTasks = {};
        tasks.forEach(task => {
            initialSelectedTasks[task.taskIdx] = false;
        });
        setSelectedTasks(initialSelectedTasks);
    }, [tasks]);
    
    // 체크의 갯수에 따라 모달을 띄워주고 갯수를 변경해줘야해서 useEffect
    useEffect(() => {
        const count = Object.values(selectedTasks).filter(Boolean).length;
        setSelectedCount(count);
        setIsModalOpen(count > 0);
    }, [selectedTasks]);

    // 갤러리인지, 리스트인지
    const handleLayoutChange = (isList) => {
        setIsListView(isList);
    };

    // table에 보낼 thead 선택 시
    const handleSelectAll = (isChecked) => {
        const newSelectedTasks = {};
        tasks.forEach(t => {
            newSelectedTasks[t.taskIdx] = isChecked;
        });
        setSelectedTasks(newSelectedTasks);
    };

    // 체크박스 체크 이벤트
    const handleSelectTask = (taskIdx) => {
        setSelectedTasks(prev => ({
            ...prev,
            [taskIdx]: !prev[taskIdx]
        }));
        console.log(selectedTasks);
    };

    // 샘플 데이터
    const projectMember = [
        {
            color : "gray",
            nickname : "gogogogo"
        },
        {
            color : "blue",
            nickname : "abcdefg"    
        },
        {   
            color: "red",
            nickname : "kkkkkkkkk"
        },
    ]

    const onClickHandler = () => {

    }

    // 마감일 기준 정렬 함수
    const sortByDeadline = (tasks) => {
        return [...tasks].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    };
    

    const getTasksByStatus = useCallback((status) => {
        return sortByDeadline(tasks.filter(t => t.status === status));
    }, [tasks]);

    // 작업별 상태 갯수
    const todoTasks = getTasksByStatus('TODO');
    const inProgressTasks = getTasksByStatus('IN_PROGRESS');
    const doneTasks = getTasksByStatus('DONE');

    // 높이 계산 함수 (기본 높이 + 작업 개수 * 작업 카드 높이)
    const calculateHeight = (taskCount) => {
        const baseHeight = 70; // 기본 높이 (제목 등을 위한 공간)
        const cardHeight = 80; // 예상되는 작업 카드의 높이
        const blank = 16; // magin
        return baseHeight + taskCount  * (cardHeight + blank);
    };


    const onDragEnd = useCallback((result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        setTasks(prevTasks => {
            const newTasks = Array.from(prevTasks);

            // 같은 상태 내에서의 이동
            if (source.droppableId === destination.droppableId) {
                const statusTasks = newTasks.filter(t => t.status === source.droppableId);
                const [movedItem] = statusTasks.splice(source.index, 1);
                statusTasks.push(movedItem); // 임시로 끝에 추가
                
                // 마감일 기준으로 재정렬
                const sortedTasks = sortByDeadline(statusTasks);
                
                return newTasks.map(task => 
                    task.status === source.droppableId ? sortedTasks.shift() : task
                );
            } 
            // 다른 상태로의 이동
            else {
                const sourceStatusTasks = newTasks.filter(t => t.status === source.droppableId);
                const destStatusTasks = newTasks.filter(t => t.status === destination.droppableId);
                
                const [movedItem] = sourceStatusTasks.splice(source.index, 1);
                movedItem.status = destination.droppableId;
                destStatusTasks.push(movedItem); // 임시로 끝에 추가
                
                // 출발지와 목적지 상태의 작업들을 각각 마감일 기준으로 재정렬
                const sortedSourceTasks = sortByDeadline(sourceStatusTasks);
                const sortedDestTasks = sortByDeadline(destStatusTasks);

                return newTasks.map(task => {
                    if (task.status === source.droppableId) return sortedSourceTasks.shift();
                    if (task.status === destination.droppableId) return sortedDestTasks.shift();
                    return task;
                });
            }
        });
    }, []);

    const renderDraggableTask = useCallback((task, index) => (
        <Draggable key={task.taskIdx.toString()} draggableId={task.taskIdx.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <TaskCard 
                        task={task} 
                        onEdit={handleIndividualEdit}
                        onDelete={handleIndividualDelete}
                        isSelected={selectedTasks[task.taskIdx]}
                        onSelect={() => handleSelectTask(task.taskIdx)}
                        openTaskForm={openTaskForm}
                    />
                </div>
            )}
        </Draggable>
    ), []);


    // TasksFormModal 열기 함수
    const openTaskForm = (task = null) => {
        setEditingTask(task);
        setIsTaskFormOpen(true);
    };

    // TasksFormModal 닫기 함수
    const closeTaskForm = () => {
        setIsTaskFormOpen(false);
        setEditingTask(null);
    };

    // 작업 생성 버튼 핸들러
    const handleCreateTask = () => {
        openTaskForm();
    };

     // 선택된 작업들을 삭제하는 로직 구현
    // ...이나 :을 클릭했을 때 작동
    const handleIndividualEdit = (task) => {
        console.log("작업 수정:", task);
        closeTaskForm();
    };

    // 작업 저장/수정 핸들러
    const handleSaveTask = (taskData) => {
        console.log("작업 생성 :", taskData);
        closeTaskForm();
    };

    // 삭제 모달 열기 (개별 삭제)
    const openDeleteModal = (task) => {
        setTaskToDelete(task);
        setIsBulkDelete(false);
        setIsDeleteModalOpen(true);
    }

    // 삭제 모달 열기 (일괄 삭제)
    const openBulkDeleteModal = () => {
        setIsBulkDelete(true);
        setIsDeleteModalOpen(true);
    }

    // 삭제 모달 닫기
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
    } 

    // 개별 작업 삭제 로직
    const handleIndividualDelete = (task) => {
        if (task && task.taskIdx) {
            openDeleteModal(task);
        } else {
            console.error('Invalid task object:', task);
        }
    };

    // 일괄 작업 삭제 로직
    const handleBulkDelete = () => {
        openBulkDeleteModal();
    };

    // 작업 삭제 확인
    const confirmDelete = () => {
        if (isBulkDelete) {
            // 일괄 삭제 로직
            const tasksToKeep = tasks.filter(task => !selectedTasks[task.taskIdx]);
            setTasks(tasksToKeep);
            setSelectedTasks({});
        } else if (taskToDelete) {
            // 개별 삭제 로직
            setTasks(prevTasks => prevTasks.filter(task => task.taskIdx !== taskToDelete.taskIdx));
        }
        closeDeleteModal();
    }

    return (
        <div className='w-11/12 mx-auto'>
            <div>
                <BodyHeader title={project.title} subtitle={project.description} children={
                    <div>
                        <Button color={"yellow"} onClickHandler={(e)=>openTaskForm(e)} text={"작업 생성"}/>
                    </div>
                } />
            </div>

            <section className='flex items-center justify-between'>
                <div className='flex gap-6 items-center'>
                    <Search placeholder={"검색"} />
                    <div className='flex gap-2'>
                        {projectMember.map((member, i)=>(
                            <UserIcon color={member.color} nickname={member.nickname} key={i}/>
                        ))}
                    </div>
                </div>
                
                <div>
                    <LayoutToggle onLayoutChange={handleLayoutChange} />
                </div>
            </section>
            
            {/* 리스트 버튼 눌렀을 때 보여지는 화면 */}
            {isListView ? (
                <section className='w-full mt-5'>
                    <TaskTable 
                        task={tasks} 
                        onDelete={handleIndividualDelete} 
                        onEdit={handleIndividualEdit} 
                        selectedTasks={selectedTasks} 
                        setSelectedTasks={setSelectedTasks}
                        handleSelectAll={handleSelectAll}
                        handleSelectTask={handleSelectTask}
                        openTaskForm={openTaskForm}
                    />
                    {isModalOpen && (
                        <div className='mt-10 w-400 h-11 bottom-0 sticky z-20 mx-auto'>
                            <div className="fixed bg-white p-4 border border-black flex items-center gap-3">
                                <p>{selectedCount}개의 작업이 선택되었습니다.</p>
                                <Button color={"red"} onClickHandler={handleBulkDelete} text={"선택한 작업 삭제"} />
                            </div>
                        </div>
                    )}
                </section>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <section className="w-full mt-5 flex gap-4">
                        <Droppable droppableId="TODO">
                            {(provided) => (
                                <div 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="w-1/3 bg-blue-100 p-4 rounded" 
                                    style={{ height: `${calculateHeight(todoTasks.length)}px` }}
                                >
                                    <h2 className="font-bold mb-4">할 일 ({todoTasks.length})</h2>
                                    {todoTasks.map((task, index) => renderDraggableTask(task, index))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="IN_PROGRESS">
                            {(provided) => (
                                <div 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="w-1/3 bg-yellow-100 p-4 rounded" 
                                    style={{ height: `${calculateHeight(inProgressTasks.length)}px` }}
                                >
                                    <h2 className="font-bold mb-4">진행 중 ({inProgressTasks.length})</h2>
                                    {inProgressTasks.map((task, index) => renderDraggableTask(task, index))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="DONE">
                            {(provided) => (
                                <div 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="w-1/3 bg-green-100 p-4 rounded" 
                                    style={{height: `${calculateHeight(doneTasks.length)}px` }}
                                >
                                    <h2 className="font-bold mb-4">완료 ({doneTasks.length})</h2>
                                    {doneTasks.map((task, index) => renderDraggableTask(task, index))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </section>
                </DragDropContext>
            )}
            <TasksFormModal 
                task={editingTask}
                isOpen={isTaskFormOpen}
                onClose={closeTaskForm}
                onSave={handleSaveTask}
            />
            <DeleteConfirmModal 
                type={isBulkDelete ? "선택된 작업들" : "작업"}
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                name={isBulkDelete ? `${selectedCount}개의 작업` : (taskToDelete ? taskToDelete.taskName : '')}
            />
        </div>

    );
}

export default Task;