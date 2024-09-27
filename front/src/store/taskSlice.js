import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCAL_HOST } from "../constant/path";

// // 비동기 액션 생성
export const fetchTasks = createAsyncThunk('tasks/fetchProjects', async ( idx ) => {
    const response = await fetch(LOCAL_HOST + `/api/projects/${idx}/tasks`);
    if (!response.ok) {
      throw new Error(response.json());
    }
    const data = await response.json();
    return data;
  });

const taskSlice = createSlice({
    name:"tasks",
    initialState:{
        list:[],
        status: 'idle',
        error: null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchTasks.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.list = action.payload.content;
            })
    }

})

export default taskSlice.reducer;