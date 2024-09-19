// 리듀서 정의
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // 비동기 액션 생성
 export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
//   const response = await fetch('https://api.example.com/projects');
//   return response.json();

 });

// export const createProject = createAsyncThunk('projects/createProject', async (projectData) => {
//   const response = await fetch('https://api.example.com/projects', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(projectData)
//   });
//   return response.json();
// });

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
    list: [
        { idx: 1, title: "프로젝트 1", creator: "사용자1", description: "설명1", startDate: "2024-09-01", endDate: "2024-12-31" },
        { idx: 2, title: "프로젝트 2", creator: "사용자2", description: "설명2", startDate: "2024-10-01", endDate: "2025-03-31" },
    ],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // 프로젝트 패치
//       .addCase(fetchProjects.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProjects.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.list = action.payload;
//       })
//       .addCase(fetchProjects.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // 프로젝트 생성
//       .addCase(createProject.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })
//       // 프로젝트 수정
//       .addCase(updateProject.fulfilled, (state, action) => {
//         const index = state.list.findIndex(project => project.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })
//       // 프로젝트 삭제
//       .addCase(deleteProject.fulfilled, (state, action) => {
//         state.list = state.list.filter(project => project.id !== action.payload);
//       });
//   }
}); 

export default projectsSlice.reducer;