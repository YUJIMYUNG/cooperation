import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyPageNav(props) {

    const [activeItem, setActiveItem] = useState('/mypage/information'); //기본 선택되는 nav 상태

    const handleClick = (path) => {
        setActiveItem(path); // 클릭한 항목의 path를 active 상태로 설정
    }
    return (
        <div >
            <div>
                <nav>
                    <ul className='flex p-4 font-nanum-squareB text-lg'>
                        <li className={`p-4 ${activeItem === '/mypage/information' ? 'font-bold' : ''}`}>
                            <Link to={'/mypage/information'} onClick={()=> handleClick('/mypage/information')}>회원정보</Link>
                        </li>
                        <li className={`p-4 ${activeItem === '/mypage/nicknameModify' ? 'font-bold' : ''}`}>
                            <Link to={'/mypage/nicknameModify'} onClick={()=> handleClick('/mypage/nicknameModify')}>닉네임 수정</Link>
                        </li>
                        <li className={`p-4 ${activeItem === '/mypage/passwordModify' ? 'font-bold' : ''}`}> 
                            <Link to={'/mypage/passwordModify' } onClick={()=> handleClick('/mypage/passwordModify')}>비밀번호 재설정</Link>
                        </li>
                        <li className={`p-4 ${activeItem === '/mypage/deleteAccount' ? 'font-bold' : ''}`}>
                            <Link to={'/mypage/deleteAccount'} onClick={()=> handleClick('/mypage/deleteAccount')}>회원탈퇴</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <div className='border border-t-stone-400 w-11/12 ' />
            
        </div>
    );
}

export default MyPageNav;