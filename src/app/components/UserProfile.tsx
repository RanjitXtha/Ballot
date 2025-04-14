import React from 'react'
type UserType = {
  
  id:string,
  name:string,
  email:string,
  address:string,
  phone:string,
  gender:string,
}

type User = {
  user:UserType
}

const UserProfile = ({user}:User) => {
  return (
    <div className="w-full bg-white shadow-md p-4 ">
        <div className="flex flex-col gap-2 items-center">
            <div className="w-[5rem] h-[5rem] rounded-full bg-black"></div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-[#266ef3]">{user.email}</p>
        </div>

        <div className="mt-[1rem] border-t-1 pt-3 text-sm border-gray-600 flex flex-col items-start gap-2">
            <p><span className='font-semibold'>Phone: </span>{user.phone}</p>
            <p><span className='font-semibold'>Gender: </span>{user.gender}</p>
            <p><span className='font-semibold'>Location: </span>{user.address}</p>
        </div>    
    </div>
  )
}

export default UserProfile