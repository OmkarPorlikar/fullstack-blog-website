import { Link } from "react-router-dom";
import "./singlePost.css";
import { useLocation } from "react-router-dom";
import {  useEffect , useState } from "react";
import { useSelector } from "react-redux";
import { useGetSinglePost } from "../../Hooks/useGetSinglePost";
import { deletePost, getUserPost, updatePost } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function SinglePost(props) {
  // const {user} = useContext(Context)
  const [updateMode, setUpdateMode] = useState(false);


  console.log(props , "from single post")
 
  const PF = 'https://second-server-eosin.vercel.app/images/'
  const user = useSelector((state)=>state.user.user)

 
  const [post, setPost] = useState();  
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [cat , setCat] = useState()
  const [categories , setCategories] = useState([])

  const location = useLocation();
  const navigate = useNavigate();

  const Id = location.pathname.split('/')[2]
  const {data, isLoading} = useGetSinglePost(Id , user?.tokenObject?.username)
  useEffect( ()=>{
    setPost(data);
    setTitle(data?.title)
    setDesc(data?.desc)
  },[data])


  useEffect(() => {
    document.title = post?.title ||' ';
  }, [post]);


  const handleUpdate = async () => {
    const updatedPost = await updatePost(Id , user?.tokenObject?.username ,  user?.token , title , desc , categories)
if(updatedPost){
  toast.success('Post has been Updated !')
  
}    

  };


  const cancleUpdate = () =>{
    setUpdateMode(false);
  }
  const handleDelete = async()=>{
const res =  await deletePost(Id , user?.tokenObject?.username , user?.token)
console.log(res, "respose for delete")
if(res.id === Id){
  navigate('/all_post')
  console.log("here")
}
  }


  const hanldeUserPost = ()=>{
    getUserPost(user?.tokenObject?.username)
  }
  const handleAddCategory = () => {
    if (cat.trim() !== "") {
      setCategories([ ...categories , cat]);
    setCat("")
    }
  };

  const handleRemoveCategory = (category) => {
    const update = categories.filter((fil)=> fil != category)
    console.log("update" , update)
    setCategories (update);
  };

    
  if(isLoading){
    return(
  <div className='loading-container'> 
  <div >
  <img src='/images/loader.png' className="loader"/>
  </div>
  </div>    
    )
    }



  return (
    <div className="singlePost">
       <div className="singlePostWrapper">
        {post?.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            placeholder={post?.title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post?.title}
            {post?.username === user?.tokenObject?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/all_post?username=${(!post)?null:post.username}`} className="link" onClick={hanldeUserPost}>
              <b> {post?.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
{updateMode ?  <div className="cat-container">
          <div className="cat-input">
            <input
              type="text"
              value={cat}
              placeholder="Add Categories..."
              onChange={(e) => setCat(  e.target.value )}
            />
            <button type="button" className="cat-button" onClick={handleAddCategory}>
              Add Cat
            </button>
          </div>
          {categories && (
            <div className="show-cat">
              {categories.map((category, index) => (
                <div key={index} className="category-item">
                  <span>{category.trim()}</span>
                  <button
                    type="button"
                    onClick={()=> handleRemoveCategory(category)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>: null}

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            placeholder={post?.desc}
            autoFocus
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post?.desc}</p>
        )}
        {updateMode && (
        <div className="update-btn">
           <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
            <button className="singlePostButton" onClick={cancleUpdate}>
            Cancle
          </button>
        </div>
        )}
      </div>
    </div>
  );
}
