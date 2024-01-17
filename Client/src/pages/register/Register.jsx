import "./register.css"
import { Link } from "react-router-dom"
import {  useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import { api } from "../../utils/api"
import { loginUser } from "../../ReduxToolkit/action"
export default function Register() {

  const [user , setUser ] = useState();
  const [ email, setEmail  ] = useState();
  const [pass ,setPass  ] = useState()
  const [error , setError] = useState(false)
  const dispatch = useDispatch();
console.log(user,"user")
console.log(email,"email")
console.log(pass,"pass")

const userReg = useSelector((state)=>state.user.user)
  const postData = {
username: user,
email:email,
password:pass
}

  const handleFormSubmit = async (e) => {

    e.preventDefault();
  
    try {
      const response = await api.post('/register', postData);
      console.log('Registration Successful', response);
        dispatch(loginUser(user, pass))
    } catch (error) {
      console.error('Error Registering User', error);
      setError(   error.response?.data?.error )

    }
  }
  
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm">
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." 
        onChange={(e)=>{setUser(e.target.value)}}
        />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." 
         onChange={(e)=>{setEmail(e.target.value)}}
        />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..."
         onChange={(e)=>{setPass(e.target.value)}}
        />
        <button className="registerButton" onClick={handleFormSubmit}>Register</button>
        {error !== null ? <span>{error}</span> : null}

      </form>
       <Link to='/login' ><button className="registerLoginButton" >Login</button></Link> 
    </div>
    )
}
