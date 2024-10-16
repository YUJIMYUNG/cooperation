import { createSlice } from "@reduxjs/toolkit";

const memberLoginSlice = createSlice({
  name: "members",
  initialState: {
    nickname: "",
    email: "",
    idx: null,
    id: "",
    color: "",
  },
  reducers: {
    //로그인
    setUser(state, action) {
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.idx = action.payload.userIdx;
      state.id = action.payload.userId;
      state.color = action.payload.color;
    },
    //로그아웃
    clearUser(state) {
      state.nickname = "";
      state.email = "";
      state.idx = null;
      state.id = "";
      state.color = "";
    },
    //닉네임 수정
    updateUser(state, action) {
      state.nickname = action.payload.nickname;
      state.color = action.payload.color;
    },
  },
});

export const { setUser, clearUser, updateUser } = memberLoginSlice.actions;

export default memberLoginSlice.reducer;
