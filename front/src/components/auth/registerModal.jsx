import React, { useState } from 'react';
import AuthSection from '../../atom/AuthSection';
import Button from '../../atom/button';
import Input from '../../atom/Input';
import ModalTop from './modalTop';
import ModalBottom from './modalBottom';
import ModalBody from './modalBody';


const RegisterModal = ({handleModal, switchToLogin}) => {

    const [userEemailDomain, setUserEmailDomain] = useState('@gmail.com'); //이메일 도메인 (초기값 @gmail.com)
    const [isCustomDomain, setIsCustomDomain] = useState(false); //도메인 직접 입력 여부
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');    
    const [userEmailId, setUserEmailId] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [errorMessages, setErrorMessages] = useState({
        userId: '',
        userPassword: '',
        userPasswordConfirm: '',
        userNickname: '',
        userEmailId: '',
        userEmailDomain: ''
    });//에러메세지 필드별로 구분해서 관리
    
    const userIdRegex = /^[a-z0-9]{8,15}$/ //아이디 (유효성검사)정규식 : 영문 소문자, 숫자로 구성된 문자열만 허용 최소5자-최대20자
    const userNicknameRegex = /^[a-zA-Z가-힣0-9]{1,10}$/ //닉네임 유효성 검사 : 영어 대소문자, 한글, 10자이내
    const userPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/ //영어 대소문자+숫자+특수문자 혼용
    const userEmailIdRegex = /^[0-9a-zA-Z]([-_.])]$/ //이메일 유효성 검사 : 영어대소문자, 숫자 구성
    const userEmailDomainRegex = /^@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/ //도메인 유효성 검사

    //도메인 선택기능
    const hadleDomainChange = (e) => {
        //setEmailDomain(e.target.value);
        const seletedDomain = e.target.value;
        if(seletedDomain === ""){
            setIsCustomDomain(true); // 직접 입력 선택 시  텍스트창 활성화
        } else {
            setIsCustomDomain(false) // 그 외 선택시 텍스트창 비활성화 하고
            setUserEmailDomain(seletedDomain); //선택한 도메인 설정
        }
    }

    //유효성 검사
    const validValue = (type) => {

        let newErrors = { ...errorMessages };

        switch(type){
            case "id":
                console.log(userId)
                if(!userIdRegex.test(userId)){
                    newErrors.userId = "아이디는 영어 소문자, 숫자 혼합하여 8-15자를 입력해야 합니다." ;
                } else {
                    newErrors.userId = "";
                }
                break;
            case "nickname":
                if(!userNicknameRegex.test(userNickname)){
                    newErrors.userNickname = "닉네임은 영어 대소문자, 숫자, 한글 10자 이내로 입력해야 합니다.";
                } else {
                    newErrors.userNickname = "";
                }
                break;
            case "emailId":
                if(!userEmailIdRegex.test(userEmailId)){
                    newErrors.userEmailId = "이메일 형식이 유효하지 않습니다.";
                } else{
                    newErrors.userEmailId = "";
                }
                break;
            case "emailDomain":
                if(!userEmailDomainRegex.text(userEemailDomain)){
                    newErrors.userEmailDomain = "이메일 형식이 유효하지 않습니다."
                } else{
                    newErrors.userEmailDomain = "";
                }
                break;
            case "password":
                if(!userPasswordRegex.test(userPassword)){
                    newErrors.userPassword = "비밀번호는 영어 대소문자, 숫자, 특수문자를 혼합하여 8-20자를 입력해야 합니다.";
                } else {
                    newErrors.userPassword = "";
                }
                break;
            case "passwordConfirm":
                console.log(userPassword);
                console.log(userPasswordConfirm)
                if(!userPassword.match(userPasswordConfirm)){
                    newErrors.userPasswordConfirm = "입력한 비밀번호와 일치하지 않습니다.";
                    
                } else {
                    newErrors.userPasswordConfirm = "";
                }
                break;
        }
        setErrorMessages(newErrors);
    }


    return (
        <div handleModal={handleModal}>
            <AuthSection>
                <div className="w-500 h-700 ">
                    {/* modal top 영역 */}
                    <ModalTop category={"회원가입"}/>

                    {/* modal body 영역 */}
                    <ModalBody>
                        <div className='grid gap-y-6'>

                            {/* 아이디 input, errorMessage영역 */}
                            <div className='h-10'>
                                {/* 아이디 input */}
                                <div>
                                    <Input placeholder={"아이디를 입력하세요. (영어 소문자, 숫자 입력 가능 8~15자"}  onChange={(e)=>setUserId(e.target.value)} onBlur={()=>validValue("id")}/>
                                </div>
                                {/* 아이디 유효성검사 errorMessage */}
                                <div className="pt-1 pl-1">
                                    {errorMessages.userId && (
                                        <p className="font-nanum-squareL text-xs text-red-600">{errorMessages.userId}</p>
                                    )}
                                </div>
                            </div>
                            
                            {/* email input, errorMessage 영역 */}
                            <div className='flex space-x-2 h-10 '>
                                <div>
                                    <Input widthSize={"140"} placeholder={"이메일을 입력하세요."} onChange={(e)=>setUserEmailId(e.target.value)} onBlur={()=>validValue("emailId")} />    
                                </div>
                                <div className="relative">
                                    {isCustomDomain ? (
                                        <Input widthSize={"140"} placeholder={"직접 입력"} onChange={(e) =>setUserEmailDomain(e.target.value)} onBlur={()=>validValue("emailDomain")}/>
                                    ) : (
                                        <select className="border w-36 h-10 rounded-md shadow-sm font-nanum-squareL text-sm p-1" onChange={hadleDomainChange} value={userEemailDomain}>
                                            <option value="@gmail.com">@gmail.com</option>
                                            <option value={"@naver.com"}>@naver.com</option>
                                            <option value={"@daum.net"}>@daum.net</option>
                                            <option value={"@nate.com"}>@nate.com</option>
                                            <option value={"@icloud.com"}>@icloud.com</option>
                                            <option value="">직접입력</option>
                                        </select>
                                    )}
                                </div>
                                <div className='w-100'>
                                    <Button color={"yellow"} onClickHandler={null} text={"인증번호 발송"} type={"button"}/>
                                </div>
                            </div>
                            
                            {/* 닉네임 input, 유효성검사 메세지 영역 */}
                            <div className='h-10'>
                                <div>
                                    <Input placeholder={"닉네임을 입력하세요.(영어, 숫자 10자 이내, 한글 5자 이내)"} onChange={(e)=>setUserNickname(e.target.value)} onBlur={()=>(validValue("nickname"))} />
                                </div>
                                <div className="pt-1 pl-1"> 
                                    {errorMessages.userNickname && (
                                        <p className="font-nanum-squareL text-xs text-red-600">{errorMessages.userNickname}</p>
                                    )}
                                </div>
                            </div>
                            
                            {/* 비밀번호 input, 유효성검사 메세지 영역 */}
                            <div className='h-10'>
                                <div>
                                    <Input placeholder={"비밀번호를 입력하세요.(영어 소문자, 숫자, 특수문자 혼용 8~20자)"} type="password" onChange={(e)=>setUserPassword(e.target.value)}  onBlur={()=>(validValue("password"))} />
                                </div>
                                <div className="pt-1 pl-1">
                                    {errorMessages.userPassword && (
                                        <p className="font-nanum-squareL text-xs text-red-600">{errorMessages.userPassword}</p>
                                    )}
                                </div>
                            </div>

                            {/* 비밀번호 확인 input, 에러메세지 영역 */}
                            <div className='pb-3 h-10'>
                                <div className=''>
                                    <Input placeholder={"비밀번호를 확인 해주세요."} type="password"  onChange={(e)=>setUserPasswordConfirm(e.target.value)} onBlur={()=>validValue("passwordConfirm")}/>
                                </div>
                                <div className="pt-1 pl-1">
                                    <p>{errorMessages.userPasswordConfirm && (
                                        <p className="font-nanum-squareL text-xs text-red-600">{errorMessages.userPasswordConfirm}</p>
                                    )}</p>
                                </div>
                            </div>
                            
                            {/* 회원가입 버튼 */}
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
                </div>
            </AuthSection>
        </div>
    );
};

export default RegisterModal;