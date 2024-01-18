
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const api = axios.create({
    baseURL:"https://second-server-eosin.vercel.app/api/"
})
export const getPost = async(search) =>{
    const userSearch = search? search : ''
    console.log(userSearch ,"search user post")
try{
    const response = await api.get('/post'+userSearch)
     return response.data;
}catch(error){
    console.log("some error occured while getting the post ")
    toast.error('Cannot get posts !')
    console.log(error,"posts error")
}
    }

export const uploadImage = async(formData , token)=>{
    try{
        const res = await api.post('/upload' , formData, {
            headers:{
                Authorization: `Bearer ${token} `
            }
        })
        console.log(res,"Rs")
        return res;
      }
      catch(err){
      }
}

export const writePost = async(newPost , token) =>{

    try{
        const res1 = await api.post('/post' , newPost , {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(res1,"Rs1")
        window.location.replace("/post/" + res1.data.id);
      return res1;
      }
      catch(err){
      console.log(err,)
      return err;
      }
      
}

export const getSinglePost = async(Id , username) =>{
  
    try {
        const res = await api.get(`http://localhost:9080/api/post/${Id}`)
        console.log("single Log",res.data)
return res.data;
    }catch(error){
        toast.error('Cannot get Post !')
        return error;
    }  
    }

    export const getUserPost = async(username )=>{

        try {
            const res = await api.get(`http://localhost:9080/api/post/` , {
                params:{
                    username
                }
            })
            console.log("single Log",res.data)
    return res.data;
        }catch(error){
            toast.error('Cannot get Post !')
            return error;
        } 
    }

export const deletePost = async (Id , username , token) =>{
    console.log("Making the delete call")
   
    try{
        const res = await api.delete(`/post/${Id}`,{ data: {username} , headers:{
            Authorization:`Bearer ${token}`
        }})
        console.log(res.data, "The delete data")
return res.data;

    }
        catch(err){
          console.error(err)
          console.log("failed")
    
        }
}


export const deleteUser = async (Id , username , token) =>{
    console.log("Making the delete call")
   
    try{
        const res = await api.delete(`/user/${Id}/delete`,{ data: {id:Id , username:username} , headers:{
            Authorization:`Bearer ${token}`
        }})
        console.log(res.data, "The delete data")
return res.data;

    }
        catch(err){
          console.error(err)
          console.log("failed")
    
        }
}


export const updatePost = async (Id , username , token , title , desc ,categories) =>{
    console.log("Making the delete call", Id , username , token)
   
    try{
        const res = await api.put(`/post/update/${Id}`,{id:Id , username:username , title , desc ,categories} , 
{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
if(res){ window.location.reload()}
return res.data;
    }
        catch(err){
          console.error(err)
          console.log("failed")
        }
}


