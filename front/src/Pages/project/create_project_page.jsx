import React, { useState } from 'react';
import ProjectHeader from '../../components/projects/project_header';
import InputModules from '../../components/modules/inputModules';
import Button from '../../atom/button';
import DatePickerModules from '../../components/modules/datePickerModules';

function CreateProjectPage() {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ startDate, setStartDate ] = useState(new Date()); 

    const onClickHandler = () => {

    }
    /**
     * 선택날자 설정
     * @param {startDate} v 
     */
    const startDateChangeHandler = (v) => {
        setStartDate(v);
    }

    return (
        <div className="w-11/12 mx-auto">
            <ProjectHeader title={"프로젝트 생성"} />
            <div className='w-4/6 mx-auto flex flex-col items-center justify-center'>
                <InputModules id={title} content={"프로젝트 명"} widthSize={"300"} placeHolder={"프로젝트 명을 입력하세요."} />
                <InputModules id={description} content={"프로젝트 설명"} widthSize={"300"} placeHolder={"프로젝트 설명을 입력하세요."} />
                <DatePickerModules date={startDate} onChange={startDateChangeHandler}/>
            </div>
            <div className='flex items-center justify-center'>
                <Button color={"yellow"} onClickHandler={onClickHandler()} text={"생성"} type={"button"} />
            </div>

        </div>
    );
}

export default CreateProjectPage;