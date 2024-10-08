import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOCAL_HOST } from '../constant/path';

// 에러 처리 헬퍼 함수
const handleError = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw { 
      status: response.status,
      error: errorData.error || 'Server error',
      message: errorData.message || 'An unknown error occurred'
    };
  }
  return response.json();
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async ({page = 0, size = 5, sort="endDate"}, { rejectWithValue }) => {
    try {
      const response = await fetch(LOCAL_HOST + `/api/projects?authorIdx=${1}&page=${page}&size=${size}&sort=${sort}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue({ 
          status: response.status,
          error: errorData.error || 'Server error',
          message: errorData.message || 'An unknown error occurred'
        });
      }
      return response.json();
    } catch (err) {
      return rejectWithValue({
        error: 'Network error',
        message: err.message || 'Failed to connect to the server'
      });
    }
  }
);

export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_HOST}/api/projects/${projectId}`);
      return handleError(response);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (dto, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_HOST}/api/projects`, {
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

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ idx, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_HOST}/api/projects/${idx}`, {
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

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (idx, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_HOST}/api/projects/${idx}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      return idx;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    currentProject: null,
    status: 'idle',
    error: null,
    errorMessage: null,
    fieldErrors: {},
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 5
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.errorMessage = null;
      state.fieldErrors = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.errorMessage = null;
        state.fieldErrors = {};
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
        state.currentPage = action.payload.number;
        state.pageSize = action.payload.size;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
        state.errorMessage = action.payload.message;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.idx === action.payload.idx);
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        if (state.list.length > state.pageSize) {
          state.list.pop();
        }
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.list.findIndex(project => project.idx === action.payload.idx);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.list.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.list = state.list.filter(project => project.idx !== action.payload);
      })
      // 모든 rejected 케이스에 대한 공통 처리
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          if (action.payload) {
            state.error = action.payload.error || 'An error occurred';
            state.errorMessage = action.payload.message || 'An unknown error occurred';
            
            if (action.payload.errors && Array.isArray(action.payload.errors)) {
              state.fieldErrors = action.payload.errors.reduce((acc, error) => {
                acc[error.field] = error.defaultMessage;
                return acc;
              }, {});
            } else {
              state.fieldErrors = {};
            }
          } else if (action.error) {
            // action.error 객체 사용
            state.error = action.error.name || 'Network error';
            state.errorMessage = action.error.message || 'Failed to connect to the server';
            state.fieldErrors = {};
          } else {
            state.error = 'Unknown error';
            state.errorMessage = 'An unexpected error occurred';
            state.fieldErrors = {};
          }
        }
      );
  }
});

export const { setCurrentPage, clearError } = projectsSlice.actions;

export default projectsSlice.reducer;