import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/header';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import ProjectPage from './Pages/project/project_page';
import ModalFrame from './components/ModalFrame';
import LoginModal from './components/LoginModal';
import CreateProjectPage from './Pages/project/create_project_page';

function App() {

  const [isModalOpen, setModalOpen] = useState(false);

  //페이지 진입 시 로그인 모달 바로 열리게 
  useEffect(() => {
      setModalOpen(true);
  }, []);

  const handleModal = () => {
      setModalOpen(false);
  };

  return(
    <div className="box-border">
      <Header />
      <div className="pt-14">
        <Routes>
          <Route path='/' element={<ProjectPage/>} />
          <Route path="/create-project" element={<CreateProjectPage/>} /> 
        </Routes>
      </div>
      {isModalOpen && <LoginModal handleModal={handleModal}></LoginModal>}
    </div> 
 
  );
}

export default App;
