import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/header';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import ProjectPage from './Pages/project/projectPage';
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/registerModal';
import FindIdPwdModal from './components/auth/findIdPwdModal';
import ProjectForm from './Pages/project/projectForm';
import Tasks from './Pages/tasks/tasks';

function App() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); //login 이거나 register(회원가입)이거나 findIdPwd(아이디비번찾기) 

  //페이지 진입 시 로그인 모달 바로 열리게 
  useEffect(() => {
      setModalOpen(true);
  }, []);

  //모달 창 닫기
  const handleModal = () => {
      setModalOpen(false);
  };

  //registerModal로 전환
  const switchToRegister = () => {
    setModalType("register");
  };

  //loginModal으로 전환
  const switchToLogin = () => {
    setModalType("login");
  };

  //findIdPswModal으로 전환
  const switchToFindIdPwd = () => {
    setModalType("findIdPwd");
  };


  //조건에 따른 모달 화면 전환
  let modalContent;

  if(modalType === "login"){
    modalContent =(
      <LoginModal handleModal={handleModal} switchToRegister={switchToRegister} switchToFindIdPwd={switchToFindIdPwd} /> 
    );
  } else if(modalType === "register"){
    modalContent =(
      <RegisterModal handleModal={handleModal} switchToLogin={switchToLogin} />
    )
  } else if(modalType === "findIdPwd"){
    modalContent = (
      <FindIdPwdModal handleModal={handleModal} switchToLogin={switchToLogin} switchToRegister={switchToRegister}/>
    );
  }  
          
  return(
    <div className="box-border font-nanum-squareB">
      {isModalOpen && ( modalContent)} 
      <Header />
      <div className="pt-14 ">
        <Routes>
          <Route path='/' element={<ProjectPage/>} />
          <Route path="/create-project" element={<ProjectForm />} /> 
          <Route path="/edit-project/:idx" element={<ProjectForm />} />
          <Route path="/project/:idx/tasks" element={<Tasks />} />
        </Routes>
      </div>
      
    </div> 
 
  );
}

export default App;
