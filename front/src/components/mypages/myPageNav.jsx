import React from 'react';
import { Link } from 'react-router-dom';

function MyPageNav(props) {
    return (
        <nav>
            <div>
                <ul>
                    <li>
                        <Link to={'/userInformation'}>회원정보</Link>
                    </li>
                    <li>
                        <Link to={'/userNicknameModify'}>닉네임 수정</Link>
                    </li>
                    <li>
                        <Link to={'/passwordModify'}>비밀번호 재설정</Link>
                    </li>
                    <li>
                        <Link to={'/deleteAccount'}>회원탈퇴</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default MyPageNav;