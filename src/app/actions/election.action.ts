"use server"
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const GetElectionList = async()=>{
    const electionList = await prisma.election.findMany();
    return electionList;
}

const GetElection = async(id:string)=>{
    console.log("req recieved"+id);
    const election = await prisma.election.findUnique({
        where:{
            id
        }
    })

    return election;
}

const GetCandidate = async(id:string)=>{
    const candidates = await prisma.candidate.findMany({
        where:{
            electionId:id
        },include:{
            _count:{
                select:{vote:true}
            }
        }
    })

    return candidates

}

const GetVotes = async(id:string)=>{
    const candidates = await prisma.candidate.findUnique({
        where:{
            id
        },select:{
            _count:{
                select:{
                    vote:true
                }
            }
        }
           
    })
    return candidates?._count.vote;
}

const DeleteElection = async(electionId:string)=>{
    try{
        console.log("elecId"+electionId)
        
    const election = await prisma.election.delete({
        where:{
            id:electionId
        }
    })
    console.log(election)
    return election
}catch(err){
    console.log(err)
    return false;
}
}

 const checkVote = async (userId:string,candidateId:string) => {
            try {
                const existingVote = await prisma.vote.findFirst({
                    where: {
                        userId,
                        candidateId
                    }
                });
                if(existingVote){
                    console.log("voted to"+candidateId)
                    return true
                }else {
                    console.log("Didnt vote to"+candidateId)
                    return false
                }
            } catch (err) {
                console.error("Error checking vote:", err);
            }
        };


const Vote = async(userId:string,candidateId:string,electionId:string,startTime:Date,endTime:Date)=>{
    try{
        const currentDate = new Date();
        console.log("Dates:"+ currentDate +' '+startTime+' '+ endTime);
        if(currentDate<startTime){
            console.log("Not started Yet")
            return
        }
    
        if(currentDate> endTime){
            console.log("cannot vote. already ended");
            return
        }
        
    const existingVote = await prisma.vote.findFirst({
        where:{
            userId,candidateId
        }
    })

    if(existingVote){
        const vote = await prisma.vote.delete({
            where:{
                id:existingVote.id
            }
        })
        console.log("vote removed")
        const voteCount= await GetVotes(candidateId);
        return voteCount;
    }
  
    const vote = await prisma.vote.create({
        data:{
            userId,candidateId,electionId
        }
    })
    console.log("voted successfuly")
    const voteCount = await GetVotes(candidateId);
    return voteCount;
   
}catch(err){
    console.log(err)
}

   
}


export {GetElectionList ,DeleteElection , GetElection , GetCandidate , checkVote, Vote }