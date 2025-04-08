import { GetCandidate, GetElection } from '@/app/actions/election.action'
import { getUserId } from '@/app/actions/user.action';
import Candidates from '@/app/components/Candidates';
import { Election } from '@/app/components/Election';
import React from 'react'

const page = async({params}:{params:{id:string}}) => {
    const {id} = await params;
    const election = await GetElection(id);

    const userId = await getUserId();
    if(!userId){
        return <h1>LogIn to vote</h1>
    }

    if(!election){
        return <h1>This election doesnt exist.</h1>
    }
    const candidates = await GetCandidate(id);

    console.log(election);
  return (
    <div>
        <h1>Election Page</h1>
        <div>
            <p>{election.title}</p>
            <p>{election.description}</p>
            <p>Start Time:{election.startTime.toLocaleString()}</p>
            <p>End Time:{election.endTime.toLocaleString()}</p>
            <div>
                {
                    candidates.map((candidate)=>(
                        <Candidates key={candidate.id} startTime={election.startTime} endTime={election.endTime} candidate={candidate} userId={userId} electionId= {election.id} />
                        // <div key={candidate.id}>
                        //     <p>{candidate.name}</p>
                        //     {
                        //         candidate.image?
                        //         <img width="200" src={candidate.image} />:null
                        //     }
                        //     <p>Votes:{candidate._count.vote}</p>
                        //     <VoteButton userId={userId} candidateId={candidate.id} electionId = {election.id} />
                            
                        // </div>
                    ))
                }
                
            </div>
            <Election electionId={election.id} />
        </div>
    </div>
  )
}

export default page