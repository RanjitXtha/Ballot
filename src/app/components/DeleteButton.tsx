"use client"
import React, { useState } from 'react'
import { DeleteElection } from '../actions/election.action'
import { useRouter } from 'next/navigation'

interface Candidate {
  name: string;
  age: number;
}

export const DeleteButton = ({electionId}:{electionId:string}) => {
  const router = useRouter();
  const [candidates , setCandidates] = useState<Candidate[]>([{name:"",age:0}]);

  const addCandidate=()=>{
    setCandidates([...candidates,{name:"",age:0}])
  }
    const handleDelete=async(e:React.FormEvent)=>{
        e.preventDefault();
        e.stopPropagation();
        const electionid = await electionId;
        console.log(electionId)
        if(!electionid){
            return
        }
        const deleteElection =await DeleteElection(electionid);
        if(deleteElection){
            console.log("deleted sucessfully");
            router.push("/")
        }
    }
  return (
    <div>
      <button className='button bg-red-500' onClick={handleDelete}>Delete</button>
    </div>
  )
}
