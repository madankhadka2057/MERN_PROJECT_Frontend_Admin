import { createSlice } from "@reduxjs/toolkit";
import { AuthenticatedApi} from "../http/Hello";
import { STATUSES } from "globals/misc/Statuses";
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: "",
    message:"",
    checkStatus:""
  },
  reducers: {
    setProduct(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setMessage(state,action){
      state.message=action.payload
    },
    setCheckStatus(state,action){
      state.checkStatus=action.payload
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
    },
    pushNewData(state,action){
      state.data.push(action.payload)
    },
    updatedProductData(state,action){
      const index=state.data.findIndex(data=>data._id===action.payload.id)
      if(index!==-1){
        state.data[index]=action.payload.newData
      }
    //   const filteredData=state.data.map((data)=>{
    //   if(data._id===action.payload.id){
    //     return {
    //       ...data,
    //       data:action.payload.newData
    //     }
    //   }
    // })
    //   return {
    //   ...state.data,
    //     data: action.payload.newData,
    // }; 
    },
  },
});

export const { setProduct, setStatus,spliceFromStore,updateNewData,pushNewData,setMessage,setCheckStatus,updatedProductData} = productSlice.actions;
export default productSlice.reducer;

export function fetchProduct(){
  return async function fetchProductThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await AuthenticatedApi.get("/products/")
      dispatch(setProduct(response.data.data))
      dispatch(setStatus(STATUSES.PRODUCT_SUCCESS))
      // console.log(response.data)
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
      dispatch(setCheckStatus(STATUSES.SUCCESS))
      // console.log(response.data.message)
      dispatch(setMessage(response.data.message))
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
      // console.log(newData)
    }catch(err){
      dispatch(setStatus(STATUSES.ERROR))
      console.log("Error is :",err)
    }
  }
}
export function changeProductQtyAndPrice(id,data){
  return async function changeProductQtyAndPriceThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      // console.log(id,data)
      const productStockQty=data.productQty
      const productPrice=data.productPrice
      const response=await AuthenticatedApi.patch(`/products/updateqtyandprice/${id}`,{productStockQty,productPrice})
      dispatch(setStatus(STATUSES.SUCCESS))
      const newData=[response.data.data]

      dispatch(updateNewData({id,newData}))
      // console.log(newData)
    }catch(err){
      dispatch(setStatus(STATUSES.ERROR))
      console.log("Error is :",err)
    }
  }
}
export function AddProducts(Data){
  return async function AddProductThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await AuthenticatedApi.post("/products/",Data,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      dispatch(setStatus(STATUSES.SUCCESS))
      dispatch(setCheckStatus(STATUSES.SUCCESS))
      dispatch(setMessage(response.data.message))
      dispatch(pushNewData(response.data.data))
      // console.log(response.data)
    }catch(err){
      console.log("Error is :",err)
      dispatch(setStatus(STATUSES.ERROR))
    }
  }
}
export function updateProduct(id,Data){
  return async function updateProductThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await AuthenticatedApi.patch(`/products/${id}`,Data,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      dispatch(setStatus(STATUSES.SUCCESS))
      dispatch(setCheckStatus(STATUSES.SUCCESS))
      dispatch(setMessage(response.data.message))
      const newData=response.data.data

      dispatch(updatedProductData({id,newData}))
      // dispatch(pushNewData(response.data.data))
      // console.log(newData)
    }catch(err){
      console.log("Error is :",err)
      dispatch(setStatus(STATUSES.ERROR))
    }
  }
}
