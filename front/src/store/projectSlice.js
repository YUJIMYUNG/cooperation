// 리듀서 정의
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOCAL_HOST } from '../constant/path';

// // 비동기 액션 생성
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async ({page = 0, size = 5, sort="endDate"}) => {
  const response = await fetch(LOCAL_HOST + `/api/projects?authorIdx=${1}&page=${page}&size=${size}&sort=${sort}`);
  if (!response.ok) {
    throw new Error(response.json());
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

export const updateProject = createAsyncThunk('projects/updateProject', async ({ idx, updates }) => {
  const response = await fetch(`${LOCAL_HOST}/api/projects/${idx}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return response.json();
});

// export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
//   await fetch(`https://api.example.com/projects/${id}`, { method: 'DELETE' });
//   return id;
// });

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 5
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
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
        state.currentPage = action.payload.number;
        state.pageSize = action.payload.size;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // 프로젝트 생성
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.list.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
      })
      // 프로젝트 수정
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.list.findIndex(project => project.idx === action.payload.idx);
        if (index !== -1) {
          state.list[index] = action.payload.updatedProject;
        }
        state.list.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
      });
      // // 프로젝트 삭제
      // .addCase(deleteProject.fulfilled, (state, action) => {
      //   state.list = state.list.filter(project => project.id !== action.payload);
      // });
  }
}); 

export const { setCurrentPage } = projectsSlice.actions;

export default projectsSlice.reducer;