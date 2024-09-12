import { NavLink } from "react-router-dom"
import ModalFrame from "./ModalFrame";
import Input from "../atom/Input";
import AuthSection from "../atom/AuthSection";


const LoginModal = ({handleModal}) => {
    return (
        <ModalFrame handleModal={handleModal}>
            <AuthSection>
                <div className="h-32 align-middle flex flex-col items-center justify-center gap-3">
                    <p>LOGO</p>
                    <h2>로그인</h2>
                </div>
                <div>
                    <Input placeholder={"아이디를 입력하세요."}></Input>
                    <Input placeholder={"비밀번호를 입력하세요."}></Input>
                </div>
                <div>
                    <button>로그인</button>
                </div>
            </AuthSection>
        </ModalFrame>
    )
}

export default LoginModal;