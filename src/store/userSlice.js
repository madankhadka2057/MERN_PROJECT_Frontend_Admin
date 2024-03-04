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
        },
        deleteUserFromState(state,action){
            const index=state.user.findIndex(user=>user._id===action.payload.id)
            if (index !== -1) {
                // Remove the element at the found index using splice
                state.user.splice(index, 1);
            }
            return state;
        }
    }
})

export const {setUser,setStatus,deleteUserFromState}=userSlice.actions
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
export function deleteUser(id){
    return async function deleteUserThunk(dispatch){
      dispatch(setStatus(STATUSES.LOADING))
      try{
        const response=await AuthenticatedApi.delete(`/admin/users/${id}`)
  
        dispatch(setStatus(STATUSES.SUCCESS))
        // console.log(response.status)
        if(response.status===200){
            //slice the user form store
          dispatch(deleteUserFromState({id}))
        }
      }catch(err){
        console.log("Error is :",err)
      }
    }
  }