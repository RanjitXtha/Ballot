"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const Logout = () => {
  const router = useRouter()

    const handleLogout = async () => {
        console.log("Logging out...");
        const response = await fetch('/api/auth/logout', { method: 'GET' });
    
        if (response.ok) {
           router.push('/auth/login')
        }
      };
  return (
    <button className='button' onClick={handleLogout}>Logout</button>
  )
}

export default Logout