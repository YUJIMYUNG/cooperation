import { useEffect, useState } from "react";
import Button from "../../atom/button";
import H1 from "../../atom/h1";
import AuthSection from "../../atom/AuthSection";
import InputModules from "../modules/inputModules";
import DatePickerModules from "../modules/datePickerModules";

const TasksFormModal = ({ task, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState(task || {
        taskName: '',
        taskDescription: '',
        status:'',
        priority: 1,
        startDate: '',
        endDate: '',
        assignedTo : 1
    });

    useEffect(() => {
        if (task) {
            setFormData({
                taskName: task.taskName || '',
                taskDescription: task.taskDescription || '',
                priority: task.priority || 1,
                startDate: task.startDate || '',
                endDate: task.endDate || '',
                status: task.status || '',
                assignedTo : task.assignedTo || 1
            });
        } else {
            setFormData({
                taskName: '',
                taskDescription: '',
                priority: 1,
                startDate: '',
                endDate: '',
                status : '',
                assignedTo: 1
            });
        }
    }, [task]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleCancleClick = () => {
        onClose();
        setFormData({
            taskName: '',
            taskDescription: '',
            priority: 1,
            startDate: '',
            endDate: '',
            status : '',
            assignedTo: 1
        })
    }

    if (!isOpen) return null;

    return (
        <AuthSection children={
            <div className="bg-white rounded-lg p-6 min-w-700 min-h-500 flex flex-col gap-4">
                <H1 title={task ? "작업 수정" : "작업 추가"} />
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                   <InputModules content={"작업 명"} id={"taskName"} onChange={(e)=>handleInputChange(e)} value={formData.taskName}/>
                   <InputModules content={"우선 순위"} id={"priority"} onChange={(e)=>handleInputChange(e)} value={formData.priority} type={"number"}/>
                   <InputModules content={"상태"} id={"status"} onChange={(e)=>handleInputChange(e)} value={formData.status} type={"select"}/>
                   <InputModules content={"담당자"} id={"assignedTo"} onChange={(e)=>handleInputChange(e)} value={formData.assignedTo}/>
                   <DatePickerModules content={"시작 날짜"} id={"startDate"} onChange={(e)=>handleInputChange(e)} date={formData.startDate}/>
                   <DatePickerModules content={"마감 날짜"} id={"endDate"} onChange={(e)=>handleInputChange(e)} date={formData.endDate}/>
                   <InputModules content={"작업 설명"} id={"taskDescription"} onChange={(e)=>handleInputChange(e)} value={formData.taskDescription} type={"textarea"}/>

                    {/* 다른 필드들도 추가 */}
                </form>
                <div className="flex justify-center gap-4 mt-4">
                    <Button 
                        color="yellow" 
                        text={task ? "수정" : "추가"}
                        type="submit"
                    />
                    <Button 
                        color="white" 
                        text="취소" 
                        onClickHandler={()=>handleCancleClick()}
                    />
                </div>
            </div>
        } />
    );
};

export default TasksFormModal;