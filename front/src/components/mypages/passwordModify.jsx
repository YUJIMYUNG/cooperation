import React, { useState } from 'react';
import Input from '../../atom/Input';
import Button from '../../atom/button';

const PasswordModify = () => {

    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');  
    const [errorMessages, setErrorMessages] = useState({
        userPassword: '',
        userPasswordConfirm: '',
    });//에러메세지 필드별로 구분해서 관리

    const userPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/ //영어 대소문자+숫자+특수문자 혼용

    //유효성 검사
    const validValue = (type) => {

        let newErrors = { ...errorMessages };

        switch(type){
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
        <div className='w-600 h-800 m-auto place-content-center'>
                
                {/* 비밀번호, 비밀번호확인 Input 영역 */}
                <div className='h-80 w-600 flex flex-col justify-center items-center'>
                    {/* 비밀번호 input, 에러메세지 영역 */}
                    <div className='p-2'>
                        {/* 비밀번호 input */}
                        <div className=''>
                            <Input widthSize={""} placeholder={"비밀번호를 입력하세요."} type="password" onChange={(e)=>setUserPassword(e.target.value)} onBlur={()=>validValue("password")}/>
                        </div>
                        {/* 비밀번호 유효성검사 에러메세지 */}
                        <div className="pt-1 pl-1">
                            {errorMessages.userPassword && (
                                <p className="font-nanum-squareL text-xs text-red-600">{errorMessages.userPassword}</p>
                            )}
                        </div>
                    </div>

                    {/* 비밀번호 확인input, 에러메세지 영역 */}
                    <div className='p-2 h-20'>
                        <div>
                            <Input widthSize={""} placeholder={"비밀번호를 확인해주세요."} type="password"/>
                        </div>
                        <div className="pt-1 pl-1">
                            {errorMessages.userPasswordConfirm && (
                                <p className="font-nanum-squareL text-xs text-red-600">{errorMessages.userPasswordConfirm}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 확인 버튼 영역*/}
                <div className='flex justify-center h-40'>
                    <Button color={"yellow"} onClickHandler={null} text={"확인"} type={"button"} />
                </div>
                
        </div>
    );
};

export default PasswordModify;