import React, { useState } from 'react'

function Parent() {
    const [data, setData] = useState('')
    const changeData = (data)=>{
        setData(data);
    }
  return (
    <div>
        <h1>{data}</h1>
      <Child changeData={changeData}/>
    </div>
  )
}

function Child({changeData}){
    return <button onClick={()=>changeData("new data")}>Click me </button>
}

export default test
