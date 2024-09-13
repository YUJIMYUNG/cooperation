import { NavLink } from "react-router-dom"
import ModalFrame from "./ModalFrame";
import Input from "../atom/Input";
import AuthSection from "../atom/AuthSection";
import Button from "../atom/button";


const LoginModal = ({handleModal}) => {

    const onClickHandler = () =>{ 
        
    }
    
    return (
        //handleModal -> App.js에 명시해놓은 setModalOpen(false)값을 갖다 씀
        <ModalFrame handleModal={handleModal}>
            <AuthSection>
                <div className="h-32 align-middle flex flex-col items-center justify-center gap-3">
                    <p>LOGO</p>
                    <h2 className="text-yellow-400 font-nanum-square">로그인</h2>
                </div>
                <div>
                    <Input placeholder={"아이디를 입력하세요."} ></Input>
                    <Input placeholder={"비밀번호를 입력하세요."}></Input>
                </div>
                <div>
                    <Button color={"yellow"} onClickHandler={handleModal} text={"로그인"} type={"button"} />
                </div>
                <div className="m-6 border-t-2 p-10">
                    <Button color={""} onClickHandler={null} text={"회원가입"} type={"button"} />
                    <Button color={""} onClickHandler={null} text={"아이디 / 비밀번호 찾기"} type={"button"} />
                </div>
            </AuthSection>
        </ModalFrame>
    )
}

export default LoginModal;