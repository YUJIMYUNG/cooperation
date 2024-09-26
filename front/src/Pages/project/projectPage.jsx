import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../atom/button";
import ProjectBlock from "../../components/projects/projectBlock";
import BodyHeader from "../../components/header/bodyHeader";
import Search from "../../atom/search";
import { fetchProjects, deleteProject } from "../../store/projectSlice";

export default function ProjectPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const projects = useSelector(state => state.projects?.list ?? []);
    const status = useSelector(state => state.projects.status);
    const error = useSelector(state => state.projects.error);
    const totalPages = useSelector(state => state.projects?.totalPages ?? 0);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    
    useEffect(() => {
        const abortController = new AbortController();
        dispatch(fetchProjects({ page: currentPage, size: pageSize, signal: abortController.signal }));
        
        return () => {
          abortController.abort();
        };
      }, [dispatch, currentPage, pageSize]);

    useEffect(() => {
        return () => {
          dispatch({ type: 'projects/resetState' });
        };
      }, [dispatch]);

    const createProjectHandler = () => {
        navigate("/create-project");
    }

    const editProjectHandler = (idx) => {
        navigate(`/edit-project/${idx}`);
    }

    const deleteProjectHandler = (id) => {
        console.log(id);
            // dispatch(deleteProject(id));
    }
    // 페이징
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }
    
    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

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
            <div>
                {projects && projects.map((project, i) => (
                    <ProjectBlock 
                        key={i} 
                        title={project.title}
                        idx={project.idx}
                        description={project.description}
                        author={project.author}
                        startDate={project.startDate}
                        endDate={project.endDate}
                        onEdit={() => editProjectHandler(project.idx)}
                        onDelete={() => deleteProjectHandler(project.idx)}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center gap-5">
                {/* 페이지네이션 컨트롤 */}
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => handlePageChange(i)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}