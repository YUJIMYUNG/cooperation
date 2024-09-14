
import Input from "../../atom/Input";
import AuthSection from "../../atom/AuthSection";
import Button from "../../atom/button";
import ModalTop from "./modalTop";
import ModalBottom from "./modalBottom";
import ModalBody from "./modalBody";


//로그인 모달창
const LoginModal = ({switchToRegister, handleModal}) => {
    
    return (
        //handleModal -> App.js에 명시해놓은 setModalOpen(false)값을 갖다 씀
        <div handleModal={handleModal}>
            <AuthSection>
                <div className="w-500 h-700 ">

                    {/* modal top section */}
                    <ModalTop category={"로그인"}></ModalTop>
                    
                    {/* modal body section */}
                    <ModalBody>
                            <div className="grid gap-7 m-5 pb-4">
                                <Input placeholder={"아이디를 입력하세요."} ></Input>
                                <Input placeholder={"비밀번호를 입력하세요."}></Input>
                            </div>
                            <div>
                                <Button color={"yellow"} onClickHandler={handleModal} text={"로그인"} type={"button"} />
                            </div>
                    </ModalBody>

                    {/* modal bottom section */}
                    <ModalBottom>

                            <Button color={""} onClickHandler={switchToRegister} text={"회원가입"} type={"button"}/>
                
                            <Button color={""} onClickHandler={switchToRegister} text={"아이디 / 비밀번호 찾기"} type={"button"}/>

                    </ModalBottom>
                </div>
            </AuthSection>
        </div>
    )
}

export default LoginModal;