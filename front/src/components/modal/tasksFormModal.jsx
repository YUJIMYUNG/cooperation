import { useEffect, useState } from "react";
import Button from "../../atom/button";
import H1 from "../../atom/h1";
import AuthSection from "../../atom/AuthSection";

const TasksFormModal = ({ task, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState(task || {
        taskName: '',
        taskDescription: '',
        priority: 1,
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        if (task) {
            setFormData(task);
        } else {
            setFormData({
                taskName: '',
                taskDescription: '',
                priority: 1,
                startDate: '',
                endDate: ''
            });
        }
    }, [task]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <AuthSection children={
            <div className="bg-white rounded-lg p-6 min-w-700 min-h-500">
                <H1 title={task ? "작업 수정" : "작업 추가"} />
                <form onSubmit={handleSubmit}>
                    <input
                        name="taskName"
                        value={formData.taskName}
                        onChange={handleInputChange}
                        placeholder="작업명"
                    />
                    <textarea
                        name="taskDescription"
                        value={formData.taskDescription}
                        onChange={handleInputChange}
                        placeholder="작업 설명"
                    />
                    {/* 다른 필드들도 추가 */}
                    <div className="flex justify-end gap-4 mt-4">
                        <Button 
                            color="white" 
                            text="취소" 
                            onClickHandler={onClose}
                        />
                        <Button 
                            color="yellow" 
                            text={task ? "수정" : "추가"}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        } />
    );
};

export default TasksFormModal;