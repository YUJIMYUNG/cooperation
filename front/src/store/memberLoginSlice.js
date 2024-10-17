import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOCAL_HOST } from "../constant/path";

export const updateUserInfo = createAsyncThunk(
  "members/updateUserUnfo",
  async ({ idx, nickname, color }, { rejectWithValue }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("nickname", nickname);
      formData.append("color", color);

      const response = await fetch(`${LOCAL_HOST}/api/member/${idx}`, {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const memberLoginSlice = createSlice({
  name: "members",
  initialState: {
    nickname: "",
    email: "",
    idx: null,
    id: "",
    color: "",
    status: "idle", //idle : 비동기 작업이 아직 시작되지 않은 초기상태
    error: null,
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
    extraRedubers: (builder) => {
      builder
        .addCase(updateUserInfo.pending, (state) => {
          state.status = "loading";
        })
        .addCase(updateUserInfo.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.nickname = action.payload.nickname;
          state.color = action.payload.color;
        })
        .addCase(updateUserInfo.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  },
});

export const { setUser, clearUser } = memberLoginSlice.actions;

export default memberLoginSlice.reducer;
