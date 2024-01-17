import React from 'react'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify';
const useValidateUser = () => {

const user = useSelector((state)=> state.user.user)
if(!user){
toast.error("Please Login to Continue !")
return false;
}
else return true
return (
    {
        useValidateUser
    }
)
}


export default useValidateUser;