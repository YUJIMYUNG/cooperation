
import Input from "../../atom/Input";
import AuthSection from "../../atom/AuthSection";
import Button from "../../atom/button";
import ModalTop from "./modalTop";
import ModalBottom from "./modalBottom";
import ModalBody from "./modalBody";
import { useState } from "react";
import ErrorMessage from '../../atom/errorMessage';
import { LOCAL_HOST } from "../../constant/path";


//로그인 모달창
const LoginModal = ({switchToRegister, switchToFindIdPwd, handleModal, onClickLogin, loginErrorMessage, disabled}) => {

    const [userId, setUserId] = useState(""); //아이디 입력값
    const [userPassword, setUserPassword] = useState(""); //비밀번호 입력값
    const [errorMessage, setErrorMessage] = useState("");// 에러 메세지
    const [idTouched, setIdTouched] = useState(false); //아이디 필드 터치 여부
    const [pwdToched, setPwdToched] = useState(false); // 비밀번호 필드 터치 여부

    //입력값 변경 핸들러
    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
        setIdTouched(true);
        setErrorMessage(""); //입력 중일 떄에는 에러 메세지 안보이게
    }
    const hadleUserPwdChange = (e) => {
        setUserPassword(e.target.value);
        setPwdToched(true);
        setErrorMessage(""); //입력 중일 떄에는 에러 메세지 안보이게
    }

    // 에러 처리 헬퍼 함수
    const handleError = async (response) => {
        if (!response.ok) {
        const errorData = await response.json();
        throw { error: errorData.error, message: errorData.message };
        }
        return response.json();
    };
  

    //로그인, 비밀번호 유효성 검사 
    const handleLogin = () => {
        if(!userId || !userPassword) { //아이디에 값이 없거나, 비밀번호에 값이 없거나
            setErrorMessage("아이디 혹은 비밀번호를 입력해주세요.");
            return;
        }
        // 아이디, 비번 호출 및 DB 회원가입 정보와 비교
        onClickLogin(userId, userPassword);

        if(loginErrorMessage){
            console.log(2);
            setErrorMessage("아이디 혹은 비밀번호가 일치하지 않습니다.");
        }
        
       
    }
     
    return (
        //handleModal ->root.js에 명시해놓은 setModalOpen(false)값을 갖다 씀
        <div handleModal={handleModal}>
            <AuthSection>

                {/* modal 전체 영역. auth Section 사이즈 지정 */}
                <div className="w-500 h-700 ">

                    {/* modal top section */}
                    <ModalTop category={"로그인"}></ModalTop>
                    
                    {/* modal body section */}
                    <ModalBody>
                        {/* 로그인 input, errorMessage 영역 */}
                        <div className="w-400 h-48 grid gap-6">
                            {/* 아이디, 비밀번호, input 영역 */}
                            <Input placeholder={"아이디를 입력하세요."} value={userId} onChange={handleUserIdChange}></Input>
                            <Input placeholder={"비밀번호를 입력하세요."} value={userPassword} onChange={hadleUserPwdChange} type="password"></Input>
                            {/* 오류메세지 */}
                            <ErrorMessage text={errorMessage} />
                        </div>

                        {/* 로그인 버튼 */}
                        <div>
                            <Button color={"yellow"} onClickHandler={handleLogin} text={"로그인"} type={"button"} disabled={disabled} />
                        </div>
                    </ModalBody>

                    {/* modal bottom section */}
                    <ModalBottom>
                        <div className="">
                            <Button color={""} onClickHandler={switchToRegister} text={"회원가입"} type={"button"}/>
                            <Button color={""} onClickHandler={switchToFindIdPwd} text={"아이디 / 비밀번호 찾기"} type={"button"}/>
                        </div>


                    </ModalBottom>
                </div>
            </AuthSection>
        </div>
    )
}

export default LoginModal;