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
    }
  },
});

export const { setProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;

export function loginProduct(data) {
  return async function loginProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await AuthenticatedApi.post(
        "/product/login",
        data
      );
      // console.log(response.data);
      dispatch(setProduct(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));

    } catch (error) {
      console.log("The error is !!!!!!!!!!!!" + error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
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
