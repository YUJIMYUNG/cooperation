import React from 'react';
import H1 from '../../atom/h1';
import Button from '../../atom/button';
import AuthSection from '../../atom/AuthSection';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, projectTitle }) => {
    
    if (!isOpen) return null;

    return (
        <AuthSection onClose={onClose}>
            <div className=" p-6 rounded-lg max-w-md w-full">
                <div onClick={e => e.stopPropagation()}>
                    
                    <H1 title={`정말로 "${projectTitle}"을(를) 삭제하시겠습니까?`} />
                    <p className="mt-4 mb-6">
                        한번 삭제된 프로젝트는 영구적으로 삭제되어 복구가 불가능합니다.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button text="삭제" color="red" onClickHandler={onConfirm} />
                        <Button text="취소" color="white" onClickHandler={onClose} />
                    </div>
                </div>
            </div>
        </AuthSection>
    );
};

export default DeleteConfirmModal;