import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import taskSlice from "./taskSlice";
import memberLoginSlice from "./memberLoginSlice";

export default configureStore({
    reducer:{
        projects : projectSlice,
        tasks : taskSlice,
        members : memberLoginSlice
    }
})