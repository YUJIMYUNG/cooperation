import React, { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import mypageRouter from './mypageRouter';
import Header from '../header/header';
import RegisterModal from '../auth/registerModal';
import FindIdPwdModal from '../auth/findIdPwdModal';
import LoginModal from '../auth/LoginModal';
import Loading from '../../atom/loading';

const ProjectPage = lazy(() => import ('../../Pages/project/projectPage'));
const ProjectForm = lazy(() => import('../../Pages/project/projectForm'));
const NicknameModify = lazy(() => import('../../components/mypages/nicknameModify'));
const PasswordModify = lazy(() => import('../../components/mypages/passwordModify'));
const AccountDelete = lazy(() => import('../../components/mypages/accountDelete'));
const Tasks = lazy(() => import('../../Pages/tasks/tasks'));
const UserInformation = lazy(() => import('../../components/mypages/userInformation'));
const MyPageNav =lazy(()=>import('../mypages/myPageNav'))

const Layout = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("login");
  
    useEffect(() => {
      setModalOpen(true);
    }, []);
  
    const handleModal = () => {
      setModalOpen(false);
    };
  
    const switchToRegister = () => {
      setModalType("register");
    };
  
    const switchToLogin = () => {
      setModalType("login");
    };
  
    const switchToFindIdPwd = () => {
      setModalType("findIdPwd");
    };
  
    let modalContent;
  
    if (modalType === "login") {
      modalContent = (
        <LoginModal handleModal={handleModal} switchToRegister={switchToRegister} switchToFindIdPwd={switchToFindIdPwd} /> 
      );
    } else if (modalType === "register") {
      modalContent = (
        <RegisterModal handleModal={handleModal} switchToLogin={switchToLogin} />
      );
    } else if (modalType === "findIdPwd") {
      modalContent = (
        <FindIdPwdModal handleModal={handleModal} switchToLogin={switchToLogin} switchToRegister={switchToRegister}/>
      );
    }  
  
    return (
      <div className="box-border font-nanum-squareB">
        {isModalOpen && modalContent}
        <Header />
        <div className="pt-14">
          <Outlet />
        </div>
      </div>
    );
  };


const root = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><ProjectPage /></Suspense>,
      },
    ],
  },
  {
    path: '/create-project',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><ProjectForm /></Suspense>,
      },
    ],
  },
  {
    path: '/edit-project/:idx',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><ProjectForm /></Suspense>,
      },
    ],
  },
  {
    path: '/project/:idx/tasks',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><Tasks /></Suspense>,
      },
    ],
  },
  {
    path: '/mypage',
    element: <Layout></Layout>,
    children: [
      {
        path: 'information',
        index:true,
        element: <Suspense fallback={<Loading />}><MyPageNav/><UserInformation /></Suspense>,
      },
      {
        path: 'nicknameModify',
        index:true,
        element: <Suspense fallback={<Loading />}><MyPageNav/><NicknameModify /></Suspense>,
      },
      {
        path: 'passwordModify',
        index:true,
        element: <Suspense fallback={<Loading />}><MyPageNav/><PasswordModify /></Suspense>,
      },
      {
        path: 'deleteAccount',
        index:true,
        element: <Suspense fallback={<Loading />}><MyPageNav/><AccountDelete /></Suspense>,
      },
    ],
  },
]);

export default root;