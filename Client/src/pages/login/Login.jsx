// import "./login.css";
// import { Context } from "../../context/Context";

// import { Link } from "react-router-dom";
// import {  useRef, useState } from "react";
// import { loginUser } from "../../ReduxToolkit/action";
// import { useDispatch , useSelector } from "react-redux";
// // import useValidateUser from "../../Hooks/useValidateUser";


// export default function Login() {
//  const userRef = useRef();
//  const passRef = useRef();
//   const [error, setError] = useState(null);

//   const dispatch = useDispatch();

//   const user = useSelector((state)=> state.user.user)

//   const handleFormSubmit = (e)=>{
// e.preventDefault();
// try{
// dispatch(loginUser(userRef.current.value,passRef.current.value))
// if(user){
// window.location.href='/'
// }
// }
// catch(error){
// console.log(error)
// }
//   }

//   return (
//     <div className="login">
//       <span className="loginTitle">Login</span>
//       <form className="loginForm" onSubmit={handleFormSubmit}>
//         <label>Username</label>
//         <input className="loginInput" type="text" placeholder="Enter your Username..."  ref={userRef} />
//         <label>Password</label>
//         <input className="loginInput" type="password" placeholder="Enter your password..."  ref={passRef} />
//         <button className="loginButton" type="submit">Login</button>
//         {error !== null ? <span>{JSON.stringify(error.response?.data)}</span> : null}

//       </form>
//       <Link to='/register' ><button className="registerLoginButton" >Register</button></Link> 

//     </div>
//   );
// }

import "./login.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser} from "../../ReduxToolkit/action"; // Assuming you have a loginWithGoogle action
import googelPng from '../../google png.png'

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(userRef.current.value, passRef.current.value));
     
    } catch (error) {
      console.log(error);
      setError(error); // Update the error state with the caught error
    }
  };

  const handleGoogleLogin = async () => {
    // try {
    //   dispatch(loginWithGoogle()); // Assuming loginWithGoogle dispatches the Google authentication action
    //   // window.location.href = "/"; // Redirect after successful Google login
    // } catch (error) {
    //   console.log(error);
    //   setError(error); // Update the error state with the caught error
    // }
  
    window.open("http://localhost:9080/api/auth/google/callback","_self")
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your Username..." ref={userRef} />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passRef} />
        <button className="loginButton" type="submit">
          Login
        </button>
        {error !== null ? <span>{JSON.stringify(error.response?.data)}</span> : null}
      </form>
      <div className="googleLogin" onClick={handleGoogleLogin}>
        {/* Use Google logo or any other Google sign-in button */}
        <img src={googelPng} alt="Google Logo" width={"40px"} height={"40px"} />
        <span>Login with Google</span>
      </div>
    </div>
  );
}
