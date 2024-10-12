import React from 'react';
import { LOCAL_HOST } from './constant/path';
import { setUser, clearUser } from './store/memberLoginSlice';

// FETCH_USER_INFO 액션이 디스패치되면 서버로부터 유저 정보를 비동기적으로 가져옴
// 가져온 유저 정보를 Redux상태와 localSorage에 저장
const userMiddleware = store => next => async action => {
    if (action.type === 'FETCH_USER_INFO'){
        console.log(action.payload)
        try {
            // 유저 정보를 백엔드에서 받아오기
            // 유호성 검사
            const response = await fetch(`${LOCAL_HOST}/api/auth/validate`,{
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body : action.payload,
                credentials: 'include' // 쿠키 포함
            });

            const data = await response.json();
            console.log(data);

            //받아온 유저 정보를 상태와 localStorage에 저장
            store.dispatch(setUser({
                userIdx : data.userIdx,
                nickname: data.nickname,
                email: data.email,
                userId: data.id,
                color: data.color
            }));
        
        // localStorage에 유저 데이터를 저장(로그인 상태 유지용)
        localStorage.setItem('user', JSON.stringify(data));
        
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