import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading...</div>
const MyPageInformation = lazy(() => import('../mypages/userInformation'))
const NicknameModify = lazy(() => import('../mypages/nicknameModify'))
const PasswordModify = lazy(() => import('../mypages/passwordModify'))
const AccountDelete = lazy(() => import('../mypages/accountDelete'))

const mypageRouter = () => {
    return [
        { // /mypage로 이동할 때에는 자동으로 /mypage/information 페이지로 이동
            path: '',
            element: <Navigate replace={true} to={'information'}/>
        },
        {
            path: 'information',
            element: <Suspense fallback={Loading}><MyPageInformation /></Suspense>
        },
        {
            path: 'nicknameModify',
            element: <Suspense fallback={Loading}><NicknameModify /></Suspense>
        },
        {
            path: 'passwordModify',
            element: <Suspense fallback={Loading}><PasswordModify /></Suspense>
        },
        {
            path: 'deleteAccount',
            element: <Suspense fallback={Loading}><MyPageInformation /></Suspense>
        }

    ]
};

export default mypageRouter;