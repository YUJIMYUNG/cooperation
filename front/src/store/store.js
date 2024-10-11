import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import taskSlice from "./taskSlice";
import memberLoginSlice from "./memberLoginSlice";
import userMiddleware from "../userMiddleware";

export default configureStore({
    reducer:{
        projects : projectSlice,
        tasks : taskSlice,
        members : memberLoginSlice
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userMiddleware)
});
