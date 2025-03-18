"use client"
import React from 'react'
import { DeleteElection } from '../actions/election.action'

export const Election = ({electionId}:{electionId:string}) => {
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
    <div><button onClick={handleDelete}>X</button></div>
  )
}
