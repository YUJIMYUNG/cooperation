import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../atom/button';
import InputModules from '../../components/modules/inputModules';
import DatePickerModules from '../../components/modules/datePickerModules';
import BodyHeader from "../../components/header/bodyHeader";
import { createProject, fetchProjects, updateProject } from '../../store/projectSlice';

export default function ProjectForm() {
    const { idx } = useParams();
    const idxN = idx ? Number(idx) : undefined;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const project = useSelector(state => 
        idxN !== undefined ? state.projects.list.find(p => p && p.idx === idxN) : undefined
    );
    const projectsStatus = useSelector(state => state.projects.status);

    const [formData, setFormData] = useState({
        idx: '',
        title: '',
        description: '',
        startDate: '',
        endDate: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (projectsStatus === 'idle' || (idxN !== undefined && !project)) {
            dispatch(fetchProjects({page: 0, size: 10, sort: "endDate"}));
        }
    }, [dispatch, projectsStatus, idxN, project]);

    useEffect(() => {
        if (project) {
            setFormData({
                idx: project.idx,
                title: project.title || '',
                description: project.description || '',
                startDate: project.startDate || '',
                endDate: project.endDate || ''
            });
        }
    }, [project]);

    const handleInputChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        const submitData = {
            ...formData,
            author: 1
        };

        const submitAction = idxN === undefined
            ? createProject(submitData)
            : updateProject({ idx: idxN, updates: submitData });

            dispatch(submitAction)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Error submitting project:', error);
                setIsSubmitting(false);
            });
    }, [dispatch, formData, idxN, navigate, isSubmitting]);

    const isFormChanged = project ? 
        JSON.stringify(formData) !== JSON.stringify({
            idx: project.idx,
            title: project.title || '',
            description: project.description || '',
            startDate: project.startDate || '',
            endDate: project.endDate || ''
        }) : false;

    if (projectsStatus === 'loading' || (idxN !== undefined && !project)) {
        return <div>Loading...</div>;
    }
    
    if (idxN !== undefined && projectsStatus === 'succeeded' && !project) {
        return <div>Project not found</div>;
    }
    return (
        <div className="w-11/12 mx-auto">
            <BodyHeader title={idx ? "프로젝트 수정" : "프로젝트 생성"} />
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex flex-col justify-center items-center gap-4">
                <div className="mb-4 flex flex-col gap-4">
                    <InputModules id={"title"} content={"프로젝트 명"}  placeholder={"프로젝트 명을 입력하세요."} onChange={handleInputChange} value={formData.title}/>
                    <InputModules id={"description"} content={"프로젝트 설명"} placeholder={"프로젝트 설명을 입력하세요."} onChange={handleInputChange} value={formData.description}/>
                    <DatePickerModules content={"시작 날짜"} id={"startDate"} date={formData.startDate} onChange={handleInputChange} placeholder={"시작 날짜"}/>
                    <DatePickerModules content={"마감 날짜"} id={"endDate"} date={formData.endDate} onChange={handleInputChange} placeholder={"마감 날짜"}/>
                </div>
                {/* 다른 필드들도 위와 같은 방식으로 추가 */}
                <div className="flex items-center justify-between">
                    <Button 
                        text={isSubmitting ? "처리 중..." : (idx ? "프로젝트 수정" : "프로젝트 생성")} 
                        color="yellow" 
                        type="submit" 
                        disabled={isSubmitting || (idx && !isFormChanged)}
/>
                </div>
            </form>
        </div>
    );
}