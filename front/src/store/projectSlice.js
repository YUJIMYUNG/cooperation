// 리듀서 정의
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOCAL_HOST } from '../constant/path';

// // 비동기 액션 생성
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async ({page = 0, size = 10}) => {
  const response = await fetch(LOCAL_HOST + `/api/projects?authorIdx=${1}&page=${page}&size=${size}`);
  if (!response.ok) {
    throw new Error('서버 응답 오류');
  }
  const data = await response.json();
  return data;

});

export const createProject = createAsyncThunk('projects/createProject', async (dto) => {
  const response = await fetch(`${LOCAL_HOST}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto)
  });
  const data = await response.json();
  return data;
});

// export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, updates }) => {
//   const response = await fetch(`https://api.example.com/projects/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updates)
//   });
//   return response.json();
// });

// export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
//   await fetch(`https://api.example.com/projects/${id}`, { method: 'DELETE' });
//   return id;
// });

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 프로젝트 패치
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.content; // 페이지 내용
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
        state.size = action.payload.size;
        state.number = action.payload.number; // 현재 페이지 번호
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // 프로젝트 생성
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // // 프로젝트 수정
      // .addCase(updateProject.fulfilled, (state, action) => {
      //   const index = state.list.findIndex(project => project.id === action.payload.id);
      //   if (index !== -1) {
      //     state.list[index] = action.payload;
      //   }
      // })
      // // 프로젝트 삭제
      // .addCase(deleteProject.fulfilled, (state, action) => {
      //   state.list = state.list.filter(project => project.id !== action.payload);
      // });
  }
}); 

export default projectsSlice.reducer;