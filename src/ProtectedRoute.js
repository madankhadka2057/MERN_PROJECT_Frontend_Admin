import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from 'store/authSlice'
function ProtectedRoute({children}) {
    const dispatch=useDispatch()
    const {data}=useSelector((state)=>state.auth)
    useEffect(()=>{
      dispatch(fetchProfile()) 
    },[])
    if(data.role==="admin"){

      return <><h1>{children}</h1></>
    }else{
      return console.log("You don't have permission ")
    }
  
}

export default ProtectedRoute