import { createSlice } from "@reduxjs/toolkit";
import { AuthenticatedApi } from "http/Hello";


const { STATUSES } = require("globals/misc/Statuses");
const userSlice=createSlice({
    name:"users",
    initialState:{
        user:null,
        status:STATUSES.SUCCESS
    },
    reducers:{
        setUser(state,action){
            state.user=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        }
    }
})

export const {setUser,setStatus}=userSlice.actions
export default userSlice.reducer

export function fetchUser(){
    return async function fetchUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response=await AuthenticatedApi.get("admin/users")
            dispatch(setUser(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
            // console.log(response.data.data)
        }catch(err){
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}