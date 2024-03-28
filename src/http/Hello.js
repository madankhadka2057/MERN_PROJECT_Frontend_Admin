import axios from "axios";


const API=axios.create({
    baseURL:"https://foodorder-8jma.onrender.com/api",
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
})

// http://localhost:3001/
const AuthenticatedApi=axios.create({
    baseURL:"https://foodorder-8jma.onrender.com/api",
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        Authorization:`${localStorage.getItem('token')}`
    }
})
export  {AuthenticatedApi,API}
// https://foodorder-8jma.onrender.com