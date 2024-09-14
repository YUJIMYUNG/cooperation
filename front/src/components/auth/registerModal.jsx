import React, { useState } from 'react';
import ModalFrame from './ModalFrame';
import AuthSection from '../../atom/AuthSection';
import Button from '../../atom/button';
import Input from '../../atom/Input';

const RegisterModal = ({handleModal, switchToLogin}) => {

    //이메일 도메인
    const [emailDomain, setEmailDomain] = useState('');

    //도메인 선택기능
    const hadleDomainChange = (e) => {
        setEmailDomain(e.target.value);
    }

    return (
        <ModalFrame handleModal={handleModal}>
            <AuthSection>
            <div className="h-32 align-middle flex flex-col items-center justify-center gap-3">
                    <p>LOGO</p>
                    <h2 className="text-yellow-400 font-nanum-squareB">회원가입</h2>
                </div>
                <div>
                    <Input placeholder={"아이디를 입력하세요. (영어 소문자, 숫자 입력 가능 8~15자"} />
                    <div className='flex'>
                        <Input widthSize={"140"} placeholder={"이메일을 입력하세요."} />
                        {/* <Input widthSize={"140"} placeholder={"직접입력"} onChange={hadleDomainChange} /> */}
                        <select className="border h-10 rounded-md m-4 shadow-sm font-nanum-squareL text-sm p-1" onChange={hadleDomainChange}>
                            <option value="">직접입력</option>
                            <option value="@gmail.com">@gmail.com</option>
                            <option value={"@naver.com"}>@naver.com</option>
                            <option value={"@daum.net"}>@daum.net</option>
                            <option value={"@nate.com"}>@nate.com</option>
                            <option value={"@icloud.com"}>@icloud.com</option>
                        </select>
                        <Button color={"yellow"} onClickHandler={null} text={"인증번호 발송"} type={"button"}/>
                    </div>
                    <Input placeholder={"닉네임을 입력하세요.(영어, 숫자 10자 이내, 한글 5자 이내)"} />
                    <Input placeholder={"비밀번호를 입력하세요.(영어 소문자, 숫자, 특수문자 혼용 8~20자)"} />
                    <Input placeholder={"비밀번호를 확인 해주세요."} />
                </div>
                <div>
                    <Button color={"yellow"} onClickHandler={handleModal} text={"회원가입"} type={"button"} />
                </div>
                <div className="m-6 border-t-2 p-10 flex">
                    <p className=' text-gray-800 text-sm font-nanum-squareL'>이미 아이디가 있으신가요?</p>
                    <Button color={""} onClickHandler={switchToLogin} text={"로그인"} type={"button"} />
                </div>
            </AuthSection>
        </ModalFrame>
    );
};

export default RegisterModal;