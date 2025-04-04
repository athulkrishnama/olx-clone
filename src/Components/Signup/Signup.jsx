import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { setDoc, addDoc,doc, collection} from 'firebase/firestore';
import {db} from '../../firebase';

export default function Signup() {
  const [user, setUser] = useState({name:'',email:'',phone:'', password:''})
  const handleDataChange = (e)=>{
    setUser(prevUser=>({...prevUser, [e.target.name]:e.target.value}))
  }
  const navigate = useNavigate()
  const handleSubmit =async (e)=>{
    e.preventDefault()
    const auth = getAuth()
    const result =await createUserWithEmailAndPassword(auth, user.email, user.password);
    const userData = result.user;
    console.log(userData)
    if(userData){
      updateProfile(userData,{displayName:user.name})
      const data = await setDoc(doc(db, 'users', userData.uid),{
        mobile:user.phone,
        name:user.name
      })
      console.log(data)
      navigate('/login')
    }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={user.name}
            onChange={handleDataChange}
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={user.phone}
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
            value={user.password}
            onChange={handleDataChange}
          />
          
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
