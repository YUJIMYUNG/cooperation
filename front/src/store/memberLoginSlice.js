import { createSlice } from "@reduxjs/toolkit";


const memberLoginSlice = createSlice({
    name : 'members',
    initialState: {
        nickname : '',
        email : '',
        idx : null,
    },
    reducers : {
        //로그인
        setUser(state, action){
            state.nickname = action.payload.ninkname;
            state.email = action.payload.email;
            state.idx = action.payload.userIdx;
            localStorage.clear()
            localStorage.setItem('user', JSON.stringify(action.payload));
            
        }
        //로그아웃

        //회원정보

        //닉네임 수정



    }
})

export const {setUser} = memberLoginSlice.actions;

export default memberLoginSlice.reducer;