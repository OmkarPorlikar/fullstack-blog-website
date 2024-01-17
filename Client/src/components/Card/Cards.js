import React from 'react';
import CardItem from '../CardItem/CardItem';
import './Cards.css';
import useGetPosts from '../../Hooks/useGetPosts';
import {useNavigate} from 'react-router-dom'
function Cards() {
    const Navigate = useNavigate();
    const {data , isLoading} = useGetPosts();
    console.log(data,"post data")
    const pf = 'http://localhost:9080/images/'
console.log(isLoading , "loading")
   
if(isLoading){
    return(
<div className='loading-container'> 
<div >
<img src='/images/loader.png' className="loader"/>
</div>
</div>    
    )
    }
    
    return(
        <div className='cards'>
            <h1>Check out these Topics</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    {/* ============ section Images ==========> */}
                    <ul className="cards__items"> 
                    {
                        data?.slice(0,2).map((post,i)=>(
                          <div onClick={()=> Navigate(`/post/${post.id}`)}  key={i}>
                             <CardItem
                            src={ (post)? pf+post.photo :``}
                            text={post?.title}
                            label={post?.categories.slice(0,1)}
                            path=''
                            />
                          </div>
                        ))
                       }
                    </ul>

                    <ul className="cards__items"> 
                       {
                        data?.slice(2,5).map((post,i)=>(
                            <div onClick={()=> Navigate(`/post/${post.id}`)} key={i}>
                            <CardItem
                           src={ (post)? pf+post.photo :``}
                           text={post?.title}
                           label={post?.categories.slice(0,1)}
                           path=''
                           />
                         </div>
                        ))
                       }
                    </ul>

                    {/* <============ end of section Images ==========*/}
                </div>
            </div>
        </div>
    );
}

export default Cards;

















