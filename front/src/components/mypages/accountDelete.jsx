import React from 'react';
import Button from '../../atom/button';
import UserIcon from '../../atom/userIcon';

const AccountDelete = () => {
    return (
        <div className='w-600 h-800 m-auto place-content-center'>
            {/* 아이디, 닉네임, 이메일 정보 */}
            <div className='h-80'>
                {/* 아이디라벨, 아이디 정보 */}
                <div className='flex p-2 h-20'>
                    <label className='p-4 flex justify-start items-center w-48'>ID</label>
                    <p className='p-4 flex justify-center w-96'>ID</p>
                </div>
                 {/* 닉네임라벨, 닉네임 정보 */}
                <div className='flex p-2 h-20 items-center'>
                    <label className='p-4 flex justify-start  w-48'>NICK NAME</label>
                    <div className='p-4 w-96 flex justify-center'>
                        <div className='m-2'>
                            <UserIcon />
                        </div>
                        <div className='flex items-center'>
                            <label>NICK NAME</label>
                        </div>
                    </div>
                </div>
                {/* 이메일라벨, 이메일 정보 */}
                <div className='flex p-2 h-20  items-center'>
                    <label className='p-4 flex justify-start w-48'>EMAIL</label>
                    <p className='p-4 w-96 flex justify-center'>asdf123@gmail.com</p>
                </div>
            </div>


            {/* 탈퇴하기 버튼 */}
            <div className='flex justify-center h-48'>
                <Button text={"탈퇴하기"} color={"yellow"}/>
            </div>
        </div>
    );
};

export default AccountDelete;