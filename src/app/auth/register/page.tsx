"use client";
import React, { useState } from 'react';

const page = () => {
  const [data ,setData] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',

});

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  const response = await fetch('/api/auth/register',{
    method:'POST',
    body:JSON.stringify(data),
    headers:{
      'Content-Type':'application/json'
    }
  })

  const responseData = await response.json();
  console.log(responseData);
}
  return (

  
    <div>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e)=> setData({...data, email: e.target.value}) } />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e)=>setData({...data, password: e.target.value}) } />
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={(e)=>setData({...data,name:e.target.value})} />
            {/* <label htmlFor="image">Image URL</label>
            <input type="text" name="image" id="image" /> */}
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" onChange={(e)=>setData({...data,address:e.target.value})} />
            <label htmlFor="phone">Phone</label>
            <input type="tel" name="phone" id="phone" onChange={(e)=>setData({...data,phone:e.target.value})} />
            <button type="submit">Register</button>
        </form>
        
    </div>
  )
}

export default page