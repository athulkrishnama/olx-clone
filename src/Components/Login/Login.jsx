import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useContext } from 'react';
import {userContext} from '../../context'
import {getAuth, signInWithEmailAndPassword } from  'firebase/auth';
function Login() {
  const [user, setUser] = useState({email:'', password:''});
  const navigate = useNavigate();
  const handleDataChange = (e)=>{
    setUser({...user, [e.target.name]:e.target.value})
  }
  const userAuth  = useContext(userContext)
  const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
      const auth = getAuth();
      const credentials = await signInWithEmailAndPassword(auth, user.email, user.password);
      const userData = credentials.user;
      if(userData){
        console.log(userData )
        console.log("Login Success")
        userAuth.setUserData(userData)
        navigate('/');
      }
    }catch(error){
      console.log(error.message)
    }

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={user.email}
            onChange={handleDataChange}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={handleDataChange}
            value={user.input}
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <a onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
