import React, { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import mypageRouter from './mypageRouter';
import Header from '../header/header';
import RegisterModal from '../auth/registerModal';
import FindIdPwdModal from '../auth/findIdPwdModal';
import LoginModal from '../auth/LoginModal';
import Loading from '../../atom/loading';
import { LOCAL_HOST } from '../../constant/path';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/memberLoginSlice';
import { useSelector } from 'react-redux';

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
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const {idx, nickname, email, id, color} = useSelector((state) => state.members)
  const [isLogingIn, setIsLogingIn] = useState(false) //로그인 진행 중 상태


    //local Storage 사용안함 -> 우리는 백에서 session으로 정보를 담고 쿠키로 보내줌
    //어차피 쿠키로 들어오기때문에 local Storage로 한 번 더 주고받아 비교 할 필요가 없어진다는 뜻!

    //(새로고침할때) 쿠키에 담긴 user정보를 프론트로 가져오게 로직을 짜야함
    useEffect(() => {
      const handleStorageChange = (e) => {
        //localStorage에 값이 삭제되면 모달창 다시 띄움
        if(e.key === "user" && !e.newValue){
          setModalOpen(true);
        }       
      }

      dispatch({type : 'FETCH_USER_INFO'})
      
      //local storage에 값이 있냐없냐 여부를 확인하고
      if(idx){
        console.log(idx);
        setModalOpen(false);
        
        const storedUser = idx;
        if(storedUser) {
          
        } 
      } else{
        setModalOpen(true);
      }

 

      //storage 이벤트 리스너 추가 - 다른 탭에서도 storage가 변경됨을 바로 감지
      window.addEventListener("storage", handleStorageChange);


    },[dispatch,idx]);

    //모달창 띄우는 함수
    const handleModal = () => {
      
      //모달창 띄우기
       setModalOpen(false);
    };


    
    //로그인 버튼 함수
    const onClickLogin =  async (userId, userPassword) => {
      setIsLogingIn(true); //로그인 요청 시작 시 상태 변경
      try {
        const formData = new URLSearchParams();
        formData.append('id', userId);       // SecurityConfig의 usernameParameter와 일치
        formData.append('password', userPassword);

        //백으로 로그인 정보 보내주기
        console.log(formData);
        const response = await fetch(`${LOCAL_HOST}/api/auth/login`,{
            method : 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body : formData.toString(),
            credentials: 'include' // 쿠키 포함
        })
        
        //백에서 json으로 받은 객체 불러오기
        const data = await response.json();
        console.log(data)

        if(!data.nickname && !data.email && !data.idx){
          console.log(2);
          setLoginErrorMessage(true);
        } else{
          console.log(1)
          dispatch(setUser({
            userIdx: data.userIdx,
            nickname: data.nickname,
            email: data.email,
            userId: data.id,
            color:data.color

        }));
          console.log(localStorage.getItem("user"));

          //성공하면 모달창 닫기
          setModalOpen(false);

          //성공하면 에러메세지도 안보이게
          setLoginErrorMessage(false);
        }
        
        

      } catch (error) {
        console.log("?")

      } finally {
        setIsLogingIn(false); //요청 완료 후 상태 복원
      }
    

    }
  
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
        <LoginModal handleModal={handleModal} switchToRegister={switchToRegister} switchToFindIdPwd={switchToFindIdPwd} onClickLogin={onClickLogin} loginErrorMessage={loginErrorMessage} disabled={isLogingIn}/> 
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