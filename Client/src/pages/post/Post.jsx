import "./post.css";
import useGetPosts from "../../Hooks/useGetPosts";
import CardItem from "../../components/CardItem/CardItem";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import { useQuery } from "react-query";
import {getPost } from '../../utils/api.js'
import { useLocation } from "react-router-dom";
export default function Post() {
// const {data , isLoading , isError} = useGetPosts();

const  {search} = useLocation();
console.log(search, "search")
const {data , isLoading , isError} = useQuery({
  queryKey:["post" , search],
  queryFn: ()=> getPost(search)
})

const Navigate = useNavigate();

const [filter , setFilter] = useState("");
// const [post , setPost ] = useState('');


console.log(filter , "filter")
   
if(isLoading){
  return(
<div className='loading-container'> 
<div >
<img src='/images/loader.png' className="loader"/>
</div>
</div>    
  )
  }

  const pf = 'http://localhost:9080/images/'
  
  console.log("single data",data)

  return (
    <div > 
    <div className="inputBar">
      <SearchBar filter={filter} setFilter={setFilter}/>
    </div>

    <div className="post-container">
    { data.filter((val)=> val.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) )
    .map((post,i)=>(

<div onClick={()=> Navigate(`/post/${post.id}`)}  key={i}>
  
<CardItem
src={ (post)? pf+post.photo :``}
text={post?.title}
label={post?.categories.slice(0,1)}
path=''
/>

</div>
  ))} 
  </ div>
  </div>
  )
}


