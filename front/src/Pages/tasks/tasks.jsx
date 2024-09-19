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

function Task() {
    const { idx } = useParams();
    const project = useSelector(state => state.projects.list.find(p => p.idx.toString() === idx));
    // table에 보낼 check 여부 변서
    const [selectedTasks, setSelectedTasks] = useState({});
    const [isListView, setIsListView] = useState(true);
    const [selectedCount, setSelectedCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // 체크의 갯수에 따라 모달을 띄워주고 갯수를 변경해줘야해서 useEffect
    useEffect(() => {
        const count = Object.values(selectedTasks).filter(Boolean).length;
        setSelectedCount(count);
        setIsModalOpen(count > 0);
    }, [selectedTasks]);

    // 갤러리인지, 리스트인지
    const handleLayoutChange = (isList) => {
        setIsListView(isList);
        setSelectedTasks({});
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

    // 삭제 이벤트
    const handleDelete = () => {
        // 여기에 선택된 작업들을 삭제하는 로직을 구현합니다.
        // 삭제 후 선택 상태 초기화
        setSelectedTasks({});
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

    // 샘플데이터
    const [tasks, setTasks] = useState([
        {   
            taskIdx:1,
            taskName: '요구사항 분석',
            taskDescription: '프로젝트 요구사항 수집 및 분석',
            projectIdx: 1,
            priority: 1,
            status: 'TODO',
            startDate: '2023-01-01',
            endDate: '2023-01-15',
            assignedTo: 1
        },
        {
            taskIdx:2,
            taskName: '데이터베이스 설계',
            taskDescription: 'ERD 작성 및 데이터베이스 스키마 설계',
            projectIdx: 1,
            priority: 1,
            status: 'IN_PROGRESS',
            startDate: '2023-01-16',
            endDate: '2023-01-31',
            assignedTo: 2
        },
        {
            taskIdx:3,
            taskName: 'UI 디자인',
            taskDescription: '사용자 인터페이스 디자인 및 프로토타입 제작',
            projectIdx: 2,
            priority: 2,
            status: 'TODO',
            startDate: '2023-02-15',
            endDate: '2023-03-15',
            assignedTo: 3
        },
        {   taskIdx:4,
            taskName: '백엔드 개발',
            taskDescription: 'RESTful API 개발',
            projectIdx: 2,
            priority: 3,
            status: 'TODO',
            startDate: '2023-03-01',
            endDate: '2023-04-30',
            assignedTo: 4
        },
        {
            taskIdx:5,
            taskName: '데이터 수집',
            taskDescription: '분석에 필요한 데이터 수집 및 전처리aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            projectIdx: 3,
            priority: 1,
            status: 'IN_PROGRESS',
            startDate: '2023-03-01',
            endDate: '2023-03-31',
            assignedTo: 5
        },
        {
            taskIdx:6,
            taskName: '데이터 수집1',
            taskDescription: '분석에 필요한 데이터 수집 및 전처리aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            projectIdx: 3,
            priority: 1,
            status: 'IN_PROGRESS',
            startDate: '2023-03-01',
            endDate: '2023-03-31',
            assignedTo: 5
        },
        {
            taskIdx:7,
            taskName: '데이터 수집2',
            taskDescription: '분석에 필요한 데이터 수집 및 전처리aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            projectIdx: 3,
            priority: 1,
            status: 'IN_PROGRESS',
            startDate: '2023-03-01',
            endDate: '2023-03-31',
            assignedTo: 5
        },
        {
            taskIdx:8,
            taskName: '데이터 수집3',
            taskDescription: '분석에 필요한 데이터 수집 및 전처리aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            projectIdx: 3,
            priority: 1,
            status: 'IN_PROGRESS',
            startDate: '2023-03-01',
            endDate: '2023-03-31',
            assignedTo: 5
        },
        {
            taskIdx:9,
            taskName: '데이터 수집4',
            taskDescription: '분석에 필요한 데이터 수집 및 전처리aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            projectIdx: 3,
            priority: 1,
            status: 'IN_PROGRESS',
            startDate: '2023-03-01',
            endDate: '2023-03-31',
            assignedTo: 5
        },
        {
            taskIdx:10,
            taskName: '데이터 수집5',
            taskDescription: '분석에 필요한 데이터 수집 및 전처리aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            projectIdx: 3,
            priority: 1,
            status: 'DONE',
            startDate: '2023-03-01',
            endDate: '2023-03-31',
            assignedTo: 5
        }
      ]);

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
                    <TaskCard task={task} /> 
                </div>
            )}
        </Draggable>
    ), []);

    return (
        <div className='w-11/12 mx-auto'>
            <div>
                <BodyHeader title={project.title} subtitle={project.description} children={
                    <div>
                        <Button color={"yellow"} onClickHandler={()=>onClickHandler()} text={"작업 생성"}/>
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
                        onDelete={null} 
                        onEdit={null} 
                        selectedTasks={selectedTasks} 
                        setSelectedTasks={setSelectedTasks}
                        handleSelectAll={handleSelectAll}
                        handleSelectTask={handleSelectTask}
                    />
                    {isModalOpen && (
                        <div className='mt-10 w-400 h-11 bottom-0 sticky z-20 mx-auto'>
                            <div className="fixed bg-white p-4 border border-black flex items-center gap-3">
                                <p>{selectedCount}개의 작업이 선택되었습니다.</p>
                                <Button color={"red"} onClickHandler={handleDelete} text={"선택한 작업 삭제"} />
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
            
             
        </div>
    );
}

export default Task;