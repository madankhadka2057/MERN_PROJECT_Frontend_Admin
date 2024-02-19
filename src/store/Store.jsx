import { configureStore} from "@reduxjs/toolkit";

import authReducer from './authSlice';
import orderReducer from "./orderSlice";
import userReducer from "./userSlice";
import productSlice from "./productSlice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        order:orderReducer,
        user:userReducer,
        product:productSlice
    }
})

export default store