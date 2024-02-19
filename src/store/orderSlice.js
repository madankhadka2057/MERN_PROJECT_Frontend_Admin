


import { AuthenticatedApi } from "http/Hello";
import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "globals/misc/Statuses";
const orderSlice=createSlice({
    name:"order",
    initialState:{
        data:[],
        status:STATUSES.SUCCESS,
    },
    reducers:{
        setOrders(state,action){
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        deleteOrders(state,action){
            const index=state.data.findIndex(data=>data._id===action.payload.id)
            state.data.splice(index,1)
        },
    }
});
const {setOrders,setStatus,deleteOrders}=orderSlice.actions
export default orderSlice.reducer

export function fetchOrder(){
    return async function fetchOrderThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response=await AuthenticatedApi.get("/admin/orders")
        // console.log(response.data.data)
        dispatch(setOrders(response.data.data))
        dispatch(setStatus(STATUSES.SUCCESS))
        }catch(err){
            console.log("Error occure "+err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
export function deleteOrder(id){
    return async function deleteOrderThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
    try{
    const response= await AuthenticatedApi.delete(`admin/orders/${id}`)
    console.log(response.status)
    console.log(response.data.message)
    if(response.status===200){
        dispatch(deleteOrders({id}))
        dispatch(setStatus(STATUSES.SUCCESS))
        // window.location.href='/admin/orders'
    }
    }catch(error){
    console.log(error)
    dispatch(setStatus(STATUSES.ERROR))
    alert("Some thing error",error)
    }
}
}