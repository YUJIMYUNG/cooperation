import React, { useState } from 'react';
import ProjectHeader from '../../components/projects/project_header';
import InputModules from '../../components/modules/inputModules';
import Button from '../../atom/button';
import DatePickerModules from '../../components/modules/datePickerModules';

function CreateProjectPage() {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ startDate, setStartDate ] = useState(new Date()); 
    const [ endDate, setEndDate] = useState(new Date());

    const onClickHandler = () => {

    }
    /**
     * 선택날자 설정
     * @param {startDate} v 
     */
    const startDateChangeHandler = (v) => {
        setStartDate(v);
    }

    const endDateChangeHandler = (v) => {
        setEndDate(v);
    }

    return (
        <div className="w-11/12 mx-auto">
            <ProjectHeader title={"프로젝트 생성"} />
            <div className='w-4/6 mx-auto flex flex-col items-center justify-center gap-4'>
                <InputModules id={"title"} content={"프로젝트 명"} widthSize={"300"} placeholder={"프로젝트 명을 입력하세요."} onChange={null}/>
                <InputModules id={"description"} content={"프로젝트 설명"} widthSize={"300"} placeholder={"프로젝트 설명을 입력하세요."} onChange={null}/>
                <DatePickerModules content={"시작 날짜"} id={"startDate"} date={startDate} onChange={startDateChangeHandler} placeholder={"시작 날짜"}/>
                <DatePickerModules content={"마감 날짜"} id={"startDate"} date={endDate} onChange={endDateChangeHandler} placeholder={"마감 날짜"}/>
                <Button color={"yellow"} onClickHandler={onClickHandler()} text={"생성"} type={"button"} />
            </div>
        </div>
    );
}

export default CreateProjectPage;