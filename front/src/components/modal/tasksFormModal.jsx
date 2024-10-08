import { useEffect, useMemo, useState } from "react";
import Button from "../../atom/button";
import H1 from "../../atom/h1";
import AuthSection from "../../atom/AuthSection";
import InputModules from "../modules/inputModules";
import DatePickerModules from "../modules/datePickerModules";

const TasksFormModal = ({ task, isOpen, onClose, onCreate, onUpdate }) => {
    const statusOptions = [
        { value: 'TODO', label: '할 일' },
        { value: 'IN_PROGRESS', label: '진행 중' },
        { value: 'DONE', label: '완료' }
    ];

    const priorityOptions = [
        { value: 'LOW', label: '낮음' },
        { value: 'MEDIUM', label: '중간' },
        { value: 'HIGH', label: '높음' }
    ];

    const initialFormData = {
        idx: 0,
        name: '',
        description: '',
        status: 'TODO',
        priority: "LOW",
        startDate: '',
        endDate: '',
        assignedToIdx: 1
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const isEditing = !!task;

    const isFormChanged = useMemo(() => {
        if (!isEditing) return true;
        return JSON.stringify(formData) !== JSON.stringify({
            idx: task.idx || 0,
            name: task.name || '',
            description: task.description || '',
            priority: task.priority || "LOW",
            startDate: task.startDate || '',
            endDate: task.endDate || '',
            status: task.status || '',
            assignedToIdx: task.assignedToIdx || 1
        });
    }, [formData, task, isEditing]);

    useEffect(() => {
        if (isEditing) {
            setFormData({
                name: task.name || '',
                description: task.description || '',
                priority: task.priority || "LOW",
                startDate: task.startDate || '',
                endDate: task.endDate || '',
                status: task.status || '',
                assignedToIdx: task.assignedToIdx || 1
            });
        } else {
            setFormData(initialFormData);
        }
    }, [task, isEditing]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting || (isEditing && !isFormChanged)) return;
        setIsSubmitting(true);
        
        if (isEditing) {
            onUpdate(task.idx, formData);
        } else {
            onCreate(formData);
        }
        
    };

    const handleCancelClick = () => {
        onClose();
        if (!isEditing) {
            setFormData(initialFormData);
        }
    };

    if (!isOpen) return null;

    return (
        <AuthSection>
            <div className="bg-white rounded-lg p-6 min-w-700 min-h-500 flex flex-col gap-4">
                <H1 title={isEditing ? "작업 수정" : "작업 추가"} />
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <InputModules content="작업 명" id="name" onChange={handleInputChange} value={formData.name} />
                    <InputModules content="우선 순위" id="priority" onChange={handleInputChange} value={formData.priority} type="select" options={priorityOptions} />
                    <InputModules content="상태" id="status" onChange={handleInputChange} value={formData.status} type="select" options={statusOptions}/>
                    <InputModules content="담당자" id="assignedToIdx" onChange={handleInputChange} value={formData.assignedToIdx} />
                    <DatePickerModules content="시작 날짜" id="startDate" onChange={handleInputChange} date={formData.startDate} />
                    <DatePickerModules content="마감 날짜" id="endDate" onChange={handleInputChange} date={formData.endDate} />
                    <InputModules content="작업 설명" id="description" onChange={handleInputChange} value={formData.description} type="textarea" />
                    
                    <div className="col-span-2 flex justify-center gap-4 mt-4">
                        <Button 
                            color="yellow" 
                            text={isEditing ? "수정" : "추가"}
                            type="submit"
                            disabled={isSubmitting || (isEditing && !isFormChanged)}
                        />
                        <Button 
                            color="white" 
                            text="취소" 
                            onClickHandler={handleCancelClick}
                        />
                    </div>
                </form>
            </div>
        </AuthSection>
    );
};

export default TasksFormModal;