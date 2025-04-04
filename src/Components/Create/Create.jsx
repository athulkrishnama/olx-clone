import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useContext } from 'react';
import { userContext } from '../../context';
import axios from 'axios'
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const authContext = useContext(userContext);
  const [productData, setProductData] = useState({name:'',category:'',price:'',user:authContext.userData.uid})
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const handleDataChange = (e)=>{
    setProductData(prevData =>({...prevData,[e.target.name]:e.target.value}));
    console.log(productData)
  }
  const handleChangeFile = (e)=>{
    // setProductData(prevData=>({...prevData,url:URL.createObjectURL(e.target.files[0])}))
    setImage(e.target.files[0 ])
  }
  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const url = 'https://api.cloudinary.com/v1_1/dnkdja8nb/image/upload';
    const formData =new FormData();
    formData.append('file', image)
    formData.append('cloud_name','dnkdja8nb')
    formData.append('upload_preset', 'products')
    const imageData = await axios.post(url, formData)
    console.log(imageData)
    console.log(productData)
    const data = await addDoc(collection(db,'products'),{...productData,url:imageData.data.secure_url??''})
    navigate('/')
  }
  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
          <form >
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              value={productData.name}
              type="text"
              id="fname"
              name="name"
              onChange={handleDataChange}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              value={productData.category}
              type="text"
              id="fname"
              name="category"
              onChange={handleDataChange}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={productData.price} type="number" id="fname" name="price" onChange={handleDataChange} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          <form>
            <br />
            <input onChange={handleChangeFile} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
