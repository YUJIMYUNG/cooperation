import React, { useState } from 'react';
import AuthSection from '../../atom/AuthSection';
import Button from '../../atom/button';
import Input from '../../atom/Input';
import ModalTop from './modalTop';
import ModalBottom from './modalBottom';
import ModalBody from './modalBody';

const RegisterModal = ({handleModal, switchToLogin}) => {

    //이메일 도메인
    const [emailDomain, setEmailDomain] = useState('');

    //도메인 선택기능
    const hadleDomainChange = (e) => {
        setEmailDomain(e.target.value);
    }

    return (
        <div handleModal={handleModal}>
            <AuthSection>
                {/* modal top 영역 */}
                <ModalTop category={"회원가입"}/>

                {/* modal body 영역 */}
                <ModalBody>
                    <div className='grid gap-y-6'>
                        <div>
                            <Input placeholder={"아이디를 입력하세요. (영어 소문자, 숫자 입력 가능 8~15자"} />
                        </div>
                        <div className='flex space-x-2 '>
                            <div>
                                <Input widthSize={"140"} placeholder={"이메일을 입력하세요."} />    
                            </div>
                            <div>
                                <select className="border w-36 h-10 rounded-md shadow-sm font-nanum-squareL text-sm p-1" onChange={hadleDomainChange}>
                                    <option value="">직접입력</option>
                                    <option value="@gmail.com">@gmail.com</option>
                                    <option value={"@naver.com"}>@naver.com</option>
                                    <option value={"@daum.net"}>@daum.net</option>
                                    <option value={"@nate.com"}>@nate.com</option>
                                    <option value={"@icloud.com"}>@icloud.com</option>
                                </select>
                            </div>
                            <div className='w-100'>
                                <Button color={"yellow"} onClickHandler={null} text={"인증번호 발송"} type={"button"}/>
                            </div>

                        </div>
                        <div>
                            <Input placeholder={"닉네임을 입력하세요.(영어, 숫자 10자 이내, 한글 5자 이내)"} />
                        </div>
                        <div>
                            <Input placeholder={"비밀번호를 입력하세요.(영어 소문자, 숫자, 특수문자 혼용 8~20자)"} />
                        </div>
                        <div className='pb-3'>
                            <Input placeholder={"비밀번호를 확인 해주세요."} />
                        </div>

                        <div>
                            <Button color={"yellow"} onClickHandler={handleModal} text={"회원가입"} type={"button"} />
                        </div>
                    </div>
                </ModalBody>

                {/* modal bottom 영역  */}
                <ModalBottom>
                        <div className='h-10 p-2 text-gray-400 text-sm font-nanum-square border-black'>
                            <p>이미 아이디가 있으신가요?</p>
                        </div>
                        <div>
                            <Button color={""} onClickHandler={switchToLogin} text={"로그인"} type={"button"} />
                        </div>
                </ModalBottom>
            </AuthSection>
        </div>
    );
};

export default RegisterModal;