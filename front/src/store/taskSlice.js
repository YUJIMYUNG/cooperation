import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCAL_HOST } from "../constant/path";

// 에러 처리 헬퍼 함수
const handleError = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw { error: errorData.error, message: errorData.message };
    }
    return response.json();
  };
  
  // 작업 가져오기
  export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (projectIdx, { rejectWithValue }) => {
      try {
        const response = await fetch(`${LOCAL_HOST}/api/projects/${projectIdx}/tasks`);
        return handleError(response);
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  // 작업 생성
  export const createTask = createAsyncThunk(
    'tasks/createTask',
    async ({ projectIdx, dto }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${LOCAL_HOST}/api/projects/${projectIdx}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dto)
        });
        return handleError(response);
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  // 작업 업데이트
  export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ projectIdx, taskIdx, updates }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${LOCAL_HOST}/api/projects/${projectIdx}/tasks/${taskIdx}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        return handleError(response);
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  // 작업 삭제
  export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ({ projectIdx, taskIdx }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${LOCAL_HOST}/api/projects/${projectIdx}/tasks/${taskIdx}`, { method: 'DELETE' });
        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
        }
        return taskIdx;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
      list: [],
      status: 'idle',
      error: null,
      errorMessage: null,
      fieldErrors: {}
    },
    reducers: {
      clearError: (state) => {
        state.error = null;
        state.errorMessage = null;
        state.fieldErrors = {};
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTasks.pending, (state) => {
          state.status = 'loading';
          state.error = null;
          state.errorMessage = null;
          state.fieldErrors = {};
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        })
        .addCase(createTask.fulfilled, (state, action) => {
          state.list.push(action.payload);
        })
        .addCase(updateTask.fulfilled, (state, action) => {
          const index = state.list.findIndex(task => task.idx === action.payload.idx);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
          state.list = state.list.filter(task => task.idx !== action.payload);
        })
        // 모든 실패 케이스에 대한 공통 처리
        .addMatcher(
          action => action.type.endsWith('/rejected'),
          (state, action) => {
            state.status = 'failed';
            state.error = action.payload.error;
            state.errorMessage = action.payload.message;
            // MethodArgumentNotValidException 처리
            if (action.payload.message && action.payload.message.includes(': ')) {
              state.fieldErrors = action.payload.message.split(', ').reduce((acc, curr) => {
                const [field, message] = curr.split(': ');
                acc[field] = message;
                return acc;
              }, {});
            }
          }
        );
    }
  });
  
  export const { clearError } = taskSlice.actions;
  
  export default taskSlice.reducer;