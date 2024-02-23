import { createSlice } from "@reduxjs/toolkit";
import { AuthenticatedApi} from "../http/Hello";
import { STATUSES } from "globals/misc/Statuses";
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.SUCCESS,
  },
  reducers: {
    setProduct(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    spliceFromStore(state,action){
      const index=state.data.findIndex(data=>data._id===action.payload.id)
      state.data.splice(index,1)
    },
    updateNewData(state,action){
      const index=state.data.findIndex(data=>data._id===action.payload.id)
      if(index!==-1){
        state.data=action.payload.newData
      }
    }
  },
});

export const { setProduct, setStatus,spliceFromStore,updateNewData} = productSlice.actions;
export default productSlice.reducer;

// export function loginProduct(data) {
//   return async function loginProductThunk(dispatch) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const response = await AuthenticatedApi.post(
//         "/product/login",
//         data
//       );
//       // console.log(response.data);
//       dispatch(setProduct(response.data.data));
//       dispatch(setStatus(STATUSES.SUCCESS));

//     } catch (error) {
//       console.log("The error is !!!!!!!!!!!!" + error);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }
export function fetchProduct(){
  return async function fetchProductThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await AuthenticatedApi.get("/products/")
      dispatch(setProduct(response.data.data))
      dispatch(setStatus(STATUSES.SUCCESS))
      console.log(response.data)
    }catch(err){
      console.log("Error is :",err)
    }
  }
}
export function deleteProduct(id){
  return async function deleteProductThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await AuthenticatedApi.delete(`/products/${id}`)
      dispatch(spliceFromStore({id}))
      dispatch(setStatus(STATUSES.SUCCESS))
      console.log(response.data)
    }catch(err){
      dispatch(setStatus(STATUSES.ERROR))
      console.log("Error is :",err)
    }
  }
}
export function changeProductStatus(id,productStatus){
  return async function changeProductStatusThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await AuthenticatedApi.patch(`/products/updateproductstatus/${id}`,{productStatus})
      dispatch(setStatus(STATUSES.SUCCESS))
      const newData=[response.data.newData]

      dispatch(updateNewData({id,newData}))
      console.log(newData)
    }catch(err){
      dispatch(setStatus(STATUSES.ERROR))
      console.log("Error is :",err)
    }
  }
}
