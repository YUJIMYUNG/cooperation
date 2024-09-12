import React from 'react';
import ProjectBlockInner from './project_block_inner';

const ProjectBlock = () => {
    return (
        <div className='h-20 border border-black w-full rounded-xl shadow- drop-shadow-lg shadow-black mt-5 '>
            <ProjectBlockInner name={"name"} member={"member"} description={"설명"} startDate={"0000년 00월 00일"} endDate={"0000년 00월 00일"} extraAction={"..."}/>
        </div>
    );
};

export default ProjectBlock;