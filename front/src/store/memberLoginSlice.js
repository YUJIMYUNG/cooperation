import { createSlice } from "@reduxjs/toolkit";


const memberLoginSlice = createSlice({
    name : 'members',
    initialState: {
        nickname : '',
        email : '',
        idx : null,
        id : '',
        color : ''
    },
    reducers : {
        //로그인
        setUser(state, action){
            state.nickname = action.payload.nickname;
            state.email = action.payload.email;
            state.idx = action.payload.userIdx;
            state.id = action.payload.userId;
            state.color = action.payload.color;

            localStorage.clear()
            localStorage.setItem('user', JSON.stringify(action.payload));
            
        },
        //로그아웃
        clearUser(state) {
            state.nickname = '';
            state.email = '';
            state.idx = null;
            state.id = '';
            state.color = '';        
        }
        //회원정보

        //닉네임 수정



    }
})

export const {setUser, clearUser} = memberLoginSlice.actions;

export default memberLoginSlice.reducer;