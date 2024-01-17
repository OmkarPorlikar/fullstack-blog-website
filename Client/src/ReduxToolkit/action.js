import axios from "axios";
import { api } from "../utils/api";
import { updateStart,updateFailure, updateSuccess,loginFailure,loginSuccess,loginStart ,logout } from "./userSlice";
import toast from "react-hot-toast";

export const userUpdate =(postData,id, token)=>async(dispatch)=>{
    // why do we need to call this , can't we just pass the referance
dispatch(updateStart())
try{
    const response = await api.put('/user/' +id +'/update', postData , {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    dispatch(updateSuccess(response.data))
    if(response.data){
        toast.success('User has been Updated!w')
    }
}catch(error){
    console.log(error)
    toast.error("User cannot be Updated")
    dispatch( updateFailure())
}
}

export const loginUser = (username, password) => async(dispatch)=>{
    console.log("logging the user")
    dispatch(loginStart())
    try{
const response = await api.post('/loginUser', {username,password})
dispatch(loginSuccess(response.data))
console.log(response,"resposnse login")
if(response){
    window.location.href = "/";
}
}
catch(error){
    console.log("error login user from action", error)
    toast.error(error?.response?.data)
    dispatch(loginFailure());
}
}

export const logoutUser = (dispatch) =>{
dispatch(logout())
}


// Note :- The update user and Login user are not being created in api.js as they contain multiple things 
// such as loginSucess , dispatch , loginStart , loginFailure 
// To avoid the complexcity
