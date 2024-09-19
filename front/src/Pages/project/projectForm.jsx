// src/components/ProjectForm.js
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
        title: '',
        description: '',
        creator: '',
        startDate: new Date(),
        endDate: new Date()
    });

    useEffect(() => {
        if (idx && project) {
            setFormData({
                idx : idx || '',
                title: project.title || '',
                description: project.description || '',
                creator: project.creator || '',
                startDate: project.startDate ? new Date(project.startDate) : new Date(),
                endDate: project.endDate ? new Date(project.endDate) : new Date()
            });
        }
    }, [idx, project]);


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleDateChange = (idx, date) => {
        setFormData(prev => ({ ...prev, [idx]: date }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (id) {
        //     dispatch(updateProject({ id, updates: formData }));
        // } else {
        //     dispatch(createProject(formData));
        // }
        navigate('/');
    };

    return (
        <div className="w-11/12 mx-auto">
            <BodyHeader title={idx ? "프로젝트 수정" : "프로젝트 생성"} />
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex flex-col justify-center items-center gap-4">
                <div className="mb-4 flex flex-col gap-4">
                    <InputModules id={"title"} content={"프로젝트 명"} widthSize={"300"} placeholder={"프로젝트 명을 입력하세요."} onChange={handleInputChange} value={formData.title}/>
                    <InputModules id={"description"} content={"프로젝트 설명"} widthSize={"300"} placeholder={"프로젝트 설명을 입력하세요."} onChange={handleInputChange} value={formData.description}/>
                    <DatePickerModules content={"시작 날짜"} id={"startDate"} date={formData.startDate} onChange={(date)=>handleDateChange("startDate", date)} placeholder={"시작 날짜"}/>
                    <DatePickerModules content={"마감 날짜"} id={"endDate"} date={formData.endDate} onChange={(date)=>handleDateChange("endDate", date)} placeholder={"마감 날짜"}/>
                </div>
                {/* 다른 필드들도 위와 같은 방식으로 추가 */}
                <div className="flex items-center justify-between">
                    <Button text={idx ? "프로젝트 수정" : "프로젝트 생성"} color="yellow" type="submit" />
                </div>
            </form>
        </div>
    );
}