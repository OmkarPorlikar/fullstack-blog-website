import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
// import thunk from "redux-thunk";

const store = configureStore({
reducer:{
    user:userSlice
},
})

export default store;