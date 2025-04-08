"use client"
import React, { useState } from 'react'
import { DeleteElection } from '../actions/election.action'
import Candidates from './Candidates';

interface Candidate {
  name: string;
  age: number;
}

export const Election = ({electionId}:{electionId:string}) => {
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
            console.log("deleted sucessfully")
        }
    }
  return (
    <div>
      <button onClick={handleDelete}>X</button>
      {/* <div>
        {
          candidates.map((candidate,index)=>(
            <div key={index}>
              <p>{candidate.name}</p>
              <p>{candidate.age}</p>
              <button onClick={addCandidate}>add</button>
            </div>
          ))
        }
      </div> */}

      {/* <div>
        {
          candidates.map((candidate,index)=>(
            <div>
              <input type="text" placeholder='name'  />
              <input type="text" placeholder='age' />
              <button onClick={addCandidate}>add</button>
            </div>
          ))
        }
      </div> */}
    </div>
  )
}
