import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../atom/button";
import ProjectBlock from "../../components/projects/projectBlock";
import BodyHeader from "../../components/header/bodyHeader";
import Search from "../../atom/search";
import { fetchProjects, deleteProject, setCurrentPage, clearError } from "../../store/projectSlice";
import Spinner from "../../atom/spinner";

export default function ProjectPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const projects = useSelector(state => state.projects?.list);
    const status = useSelector(state => state.projects.status);
    const error = useSelector(state => state.projects.error);
    const currentPage = useSelector(state => state.projects.currentPage);
    const totalPages = useSelector(state => state.projects.totalPages);
    const pageSize = useSelector(state => state.projects.pageSize);

    const loadProjects = useCallback((page) => {
        dispatch(fetchProjects({ page, size: pageSize }));
    }, [dispatch, pageSize]);
    
    useEffect(() => {
        loadProjects(currentPage);
    }, [loadProjects, currentPage]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const createProjectHandler = () => {
        navigate("/create-project");
    }

    const editProjectHandler = (idx) => {
        navigate(`/edit-project/${idx}`);
    }

    const deleteProjectHandler = async (idx) => {
        try {
            await dispatch(deleteProject(idx)).unwrap();
            loadProjects();
        } catch (error) {
            
        }
    }
    // 페이징
    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    }


    return (
        <div className="w-11/12 mx-auto">
            <BodyHeader 
                title={"프로젝트"} 
                children={
                    <div className="flex gap-4">
                        <Search placeholder={"검색"}/>
                        <Button text={"프로젝트 생성"} color={"yellow"} type={"button"} onClickHandler={createProjectHandler}/>
                    </div>
                }
            />       
            <div className="grid grid-cols-11 text-center align-middle">
                <p className="col-span-2">제목</p>
                <p className="col-span-1">생성자</p>
                <p className="col-span-3">설명</p>
                <p className="col-span-2">시작 날짜</p>
                <p className="col-span-2">마감 날짜</p>
                <p className="col-span-1">추가 작업</p>
            </div>
            {status === 'loading' ? <Spinner size="xl" color="yellow" /> : null}
            <div>
                {projects && projects.map((project, i) => (
                    <ProjectBlock 
                        key={i} 
                        title={project?.title}
                        idx={project?.idx}
                        description={project?.description}
                        author={project?.nickname}
                        startDate={project?.startDate}
                        endDate={project?.endDate}
                        onEdit={() => editProjectHandler(project.idx)}
                        onDelete={() => deleteProjectHandler(project.idx)}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center gap-5 mt-4 mb-4">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                        key={i} 
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 rounded ${currentPage === i ? 'bg-yellow-400 hover:bg-yellow-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    다음
                </button>
            </div>
        </div>
    )
}