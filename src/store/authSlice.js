import { createSlice } from "@reduxjs/toolkit";
import {API, AuthenticatedApi} from "../http/Hello";
import { STATUSES } from "globals/misc/Statuses";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: "",
    token: "",
    message:"",
    checkStatus:""
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  
  },
});

export const { setUser, setStatus, setToken,logOut } = authSlice.actions;
export default authSlice.reducer;

export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post(
        "/auth/login",
        data
      );
      // console.log(response.data);
      dispatch(setUser(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
      dispatch(setToken(response.data.data));
      localStorage.setItem("token",response.data.token)
      if (response.status===200&& response.data.token){
        // console.log(response.data)
        window.location.href="/admin"
      }
    } catch (error) {
      console.log("The error is !!!!!!!!!!!!" + error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
export function fetchProfile(){
  return async function fetchProfileThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await AuthenticatedApi.get("/profile/")
      dispatch(setUser(response.data.data))
      // dispatch(setStatus(STATUSES.SUCCESS))
      // console.log(response.data)
    }catch(err){
      console.log("Error is :",err)
    }
  }
}

