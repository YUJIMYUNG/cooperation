import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../atom/button";
import ProjectBlock from "../../components/projects/projectBlock";
import ProjectHeader from "../../components/projects/projectHeader";
import Search from "../../atom/search";
import { fetchProjects, deleteProject } from "../../store/projectSlice";

export default function ProjectPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const projects = useSelector(state => state.projects.list);
    const status = useSelector(state => state.projects.status);
    const error = useSelector(state => state.projects.error);
    
    useEffect(() => {
        if (status === 'idle') {
            // dispatch(fetchProjects());
        }
    }, [status, dispatch]);

    const createProjectHandler = () => {
        navigate("/create-project");
    }

    const editProjectHandler = (id) => {
        navigate(`/edit-project/${id}`);
    }

    const deleteProjectHandler = (id) => {
        console.log(id);
            // dispatch(deleteProject(id));
    }
    
    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div className="w-11/12 mx-auto">
            <ProjectHeader 
                title={"프로젝트"} 
                children={
                    <div className="flex gap-4">
                        <Search placeholder={"검색"}/>
                        <Button text={"프로젝트 생성"} color={"yellow"} type={"button"} onClickHandler={createProjectHandler}/>
                    </div>
                }
            />       
            <div className="grid grid-cols-11 mt-5 text-center align-middle">
                <p className="col-span-2">제목</p>
                <p className="col-span-1">생성자</p>
                <p className="col-span-3">설명</p>
                <p className="col-span-2">시작 날짜</p>
                <p className="col-span-2">마감 날짜</p>
                <p className="col-span-1">추가 작업</p>
            </div>
            <div>
                {projects.map((project, i) => (
                    <ProjectBlock 
                        key={project.idx} 
                        {...project}
                        index={i}
                        onEdit={() => editProjectHandler(project.idx)}
                        onDelete={() => deleteProjectHandler(project.idx)}
                    />
                ))}
            </div>
        </div>
    )
}