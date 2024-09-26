import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject } from '../../store/projectSlice';
import Button from '../../atom/button';
import InputModules from '../../components/modules/inputModules';
import DatePickerModules from '../../components/modules/datePickerModules';
import BodyHeader from "../../components/header/bodyHeader";

export default function ProjectForm() {
    const { idx } = useParams(); // URL에서 프로젝트 ID를 가져옵니다.
    const project = useSelector(state => state.projects.list.find(p => p.idx.toString() === idx));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        idx:'',
        title: '',
        description: '',
        author: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        if (idx && project) {
            setFormData({
                idx: idx || '',
                title: project.title || '',
                description: project.description || '',
                author: project.creator || '',
                startDate: project.startDate || '',
                endDate: project.endDate || ''
            });
        }
    }, [idx, project]);



    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(!idx){
            dispatch(createProject(formData));
        }
        
        navigate('/');
    };

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
                    <Button text={idx ? "프로젝트 수정" : "프로젝트 생성"} color="yellow" type="submit" />
                </div>
            </form>
        </div>
    );
}