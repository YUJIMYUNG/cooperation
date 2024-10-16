import React from 'react';
import { LOCAL_HOST } from './constant/path';
import { setUser, clearUser } from './store/memberLoginSlice';

// FETCH_USER_INFO 액션이 디스패치되면 서버로부터 유저 정보를 비동기적으로 가져옴
// 가져온 유저 정보를 Redux상태에 저장
const userMiddleware = store => next => async action => {
    if (action.type === 'FETCH_USER_INFO'){
        console.log(action.payload)
        try {
            // 유저 정보를 백엔드에서 받아오기
            // 유호성 검사
            const response = await fetch(`${LOCAL_HOST}/api/auth/validate`,{
                credentials: 'include' // 쿠키 포함
            });

      // 응답 상태 확인
            if (!response.ok) {
                const errorText = await response.text(); // 에러 메시지 확인
                throw new Error(`유효하지 않은 응답입니다: ${errorText}`);
            }
        
            const data = await response.json();
            store.dispatch(setUser({
                userIdx: data.userIdx,
                nickname: data.nickname,
                email: data.email,
                userId: data.id,
                color:data.color}))
        
        } catch (error) {
        console.error('error fetcing user info', error);
        }
    
    // 로그아웃 요청이 들어온 경우 
    } else if (action.type === 'LOGOUT') {
        //로그아웃시 상태와 localStorage 초기화 및 유저정보 삭제
        store.dispatch(clearUser());
        localStorage.removeItem('user');
    }

    //그 외의 모든 액션은 그대로 전달
    next(action);
};

export default userMiddleware;