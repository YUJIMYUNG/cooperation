import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BodyHeader from '../../components/header/bodyHeader';
import { useSelector } from 'react-redux';
import Button from '../../atom/button';
import Search from '../../atom/search';
import UserIcon from '../../atom/userIcon';
import LayoutToggle from '../../atom/layoutToggle';
import TaskTable from '../../components/modules/taskTable';

function Task() {
    const { idx } = useParams();
    const project = useSelector(state => state.projects.list.find(p => p.idx.toString() === idx));

    const [isListView, setIsListView] = useState(true);

    const handleLayoutChange = (isList) => {
        setIsListView(isList);
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
    const task = [
        {
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
            taskName: 'UI 디자인',
            taskDescription: '사용자 인터페이스 디자인 및 프로토타입 제작',
            projectIdx: 2,
            priority: 2,
            status: 'TODO',
            startDate: '2023-02-15',
            endDate: '2023-03-15',
            assignedTo: 3
        },
        {
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
            taskName: '데이터 수집',
            taskDescription: '분석에 필요한 데이터 수집 및 전처리',
            projectIdx: 3,
            priority: 1,
            status: 'IN_PROGRESS',
            startDate: '2023-03-01',
            endDate: '2023-03-31',
            assignedTo: 5
        }
      ];

    const onClickHandler = () => {

    }

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

            <section className='w-full mt-5'>
                <TaskTable task={task} />
            </section>
        </div>
    );
}

export default Task;