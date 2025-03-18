"use client";
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const page = () => {
  const router = useRouter();
    const [data ,setData] = useState({
      email: '',
      password: '',

  });

 const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    const response = await fetch('/api/auth/login',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const responseData = await response.json();
    console.log(responseData);

    if(response.ok){
      console.log("ok")
      router.push('/')
    }
 }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e)=> setData({...data, email: e.target.value}) } />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e)=>setData({...data, password: e.target.value}) } />
            <button type="submit">Log In</button>
        </form>
    </div>
  )
}

export default page