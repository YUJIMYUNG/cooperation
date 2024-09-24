import React from 'react';
import Input from '../../atom/Input';
import Button from '../../atom/button';

const UserInformation = () => {
    return (
        <div className='w-600 h-800 m-auto place-content-center'>
            <div className='pb-28 flex justify-center'>
                <Input widthSize={''} placeholder={"비밀번호를 입력하세요."}/>
            </div>

            <div className='flex justify-center'>
                <Button text={"확인"} color={"yellow"} type={"button"}/>
            </div>
        </div>
    );
};

export default UserInformation;