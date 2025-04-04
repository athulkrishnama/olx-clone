import React,{useContext, useEffect, useState} from 'react';
import { postContext } from '../../context';
import './View.css';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { getDoc,doc } from 'firebase/firestore';
function View() {
  const context = useContext(postContext);
  const auth = getAuth()
  const [seller , setSeller] = useState();
  useEffect(()=>{
    console.log(context.post.user)
    const q = doc(db, 'users', context.post.user)
    getDoc(q).then((snapshot)=>{
      setSeller(snapshot.data())
    })
  })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={context.post.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {context.post.price} </p>
          <span>{context.post.name}</span>
          <p>{context.post.category}</p>
          {/* <span>Tue May 04 2021</span> */}
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{seller?.name??''}</p>
          <p>{seller?.mobile??''}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
