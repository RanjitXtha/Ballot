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
    <div>
        <p>{candidate.id}</p>
        <p>{candidate.name}</p>
        {
        candidate.image?
        <img width="200" src={candidate.image} />:null
        }
        <p>Votes:{votes}</p>
        <div>
            <button className={`${hasVoted?'bg-green-500':'bg-cyan-400'}`} onClick={handleVote}>
                {
                    hasVoted?
                    <p>voted</p>
                    :<p>Vote</p>
                }
            </button>
        </div>
                            
    </div>
  )
}

export default Candidates