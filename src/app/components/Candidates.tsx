"use client"
import React, { useEffect, useState } from 'react';
import { checkVote, GetCandidate, Vote } from '../actions/election.action';
import { Span } from 'next/dist/trace';

type CandidateType={
    id:string,
    name:string,
    image?:string|null
    _count:{
        vote:number
    }
}

const Candidates = ({candidate,startTime,endTime,userId,electionId}:{startTime:Date,endTime:Date,candidate:CandidateType,userId:string,electionId:string}) => {
    
    const candidateId  = candidate.id;
    const [votes, setVotes] = useState(candidate._count.vote!);
    const [hasVoted, setHasVoted] = useState(false);

    const checkVoted = async()=>{
        const vote = await checkVote(userId,candidateId)
        console.log(vote);
        if(typeof(vote)=="boolean")
            setHasVoted(vote);
    }
    useEffect(() => {
     
        checkVoted();
    }, [votes]);

    const handleVote=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const vote = await Vote(userId,candidateId,electionId,startTime,endTime)
            console.log(vote);
            if(typeof(vote)==='number'){
                setVotes(vote);
            }
            
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="p-[1rem] shadow-md outline-2 bg-[#f7f8fa] outline-gray-300 rounded-md">
      
        {
        candidate.image?
        <img className='w-[18rem] h-[18rem]' src={candidate.image} />:null
        }
        <div className='flex flex-col items-center'>
            <p className='text-lg font-semibold'>{candidate.name}</p>
            <p className='text-sm'>Votes:{votes}</p>
            <div className='grid w-full'>
                <button className={`${hasVoted?'bg-green-500':''} button my-[0.5rem]`} onClick={handleVote}>
                    {
                        hasVoted?
                        <p>Voted</p>
                        :<p>Vote</p>
                    }
                </button>
            </div>
        </div>
                            
    </div>
  )
}

export default Candidates