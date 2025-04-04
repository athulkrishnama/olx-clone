import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { postContext } from "../../context";
import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  const selectedPost = useContext(postContext)
  // console.log(selectedPost)

  // console.log(user)
  useEffect(() => {
    let products = [];
    getDocs(collection(db, "products")).then((snapshot) => {
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      console.log(products);
      setPosts(products);
    });
  }, []);

  const setPost = (data)=>{
    selectedPost.setPost(data)
    navigate('/view')
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {posts.map((post) => {
            return (
              <div className="card" key={post.id} onClick={()=>setPost(post)}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={post.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {post.price}</p>
                  <span className="kilometer">{post.category}</span>
                  <p className="name"> {post.name}</p>
                </div>
                <div className="date">
                  {/* <span>Tue May 04 2021</span> */}
                </div>
              </div>
            );
          }).reverse()}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
