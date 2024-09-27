import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import taskSlice from "./taskSlice";

export default configureStore({
    reducer:{
        projects : projectSlice,
        tasks : taskSlice,
    }
})