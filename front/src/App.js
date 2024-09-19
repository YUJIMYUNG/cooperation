import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/header';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import ProjectPage from './Pages/project/projectPage';
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/registerModal';
import ProjectForm from './Pages/project/projectForm';

function App() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); //login 이거나 register(회원가입)이거나 findIdPsw(아이디비번찾기) 

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
    setModalType("findIdPsw");
  };

  return(
    <div className="box-border font-nanum-squareB">
      {isModalOpen && (
        //modatType에 따른 렌더링. 삼항연산자 헷갈리지 말기. 아이디비번찾기 할 때 코드 추가해야 함 
          modalType === "login"
          ?  <LoginModal handleModal={handleModal} switchToRegister={switchToRegister} />
          :  <RegisterModal handleModal={handleModal} switchToLogin={switchToLogin} />
      )} 
      <Header />
      <div className="pt-14 ">
        <Routes>
          <Route path='/' element={<ProjectPage/>} />
          <Route path="/create-project" element={<ProjectForm />} /> 
          <Route path="/edit-project/:id" element={<ProjectForm />} />
        </Routes>
      </div>
      
    </div> 
 
  );
}

export default App;
