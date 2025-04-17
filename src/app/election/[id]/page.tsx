import { GetCandidate, GetElection } from '@/app/actions/election.action'
import { getUserId } from '@/app/actions/user.action';
import Candidates from '@/app/components/Candidates';
import { DeleteButton } from '@/app/components/DeleteButton';
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
    console.log(candidates)

    console.log(election);
    const endTime = new Date(election.endTime);
    const now = new Date();
    
    const maxVotes = Math.max(...candidates.map(c => c._count.vote));
    const winners = candidates.filter(c => c._count.vote === maxVotes);
    
  return (
    <div className='px-[3rem] bg-[#f7f8fa]  py-[1rem] '>
        <div className='rounded-md flex flex-col gap-2 items-center bg-white shadow-md py-[1rem] px-[3rem] '>
            <p  className='font-bold text-4xl mb-2'>{election.title}</p>
            <p className='mb-[1rem]'>{election.description}</p>
            <div className='rounded-md bg-[#f1f5f9] w-full py-[1rem] px-[1rem] flex flex-col items-center'>
                {
                    now > endTime ?
                    <div className='text-center'>
                        <p>Ended</p>
                        {
                            winners.length === 1?<p>Winner {winners[0].name}</p>:
                            <p>It's a tie between: {winners.map(w => w.name).join(" and ")}</p>
                        }
                       
                    </div>:
                    <div className='text-center'>
                        <p>Click the vote button to vote your preferred candidate. </p>
                        <p>Each Voter can only vote once and within the active period of the election.</p>
                    </div>
                   
                }
                                        
             
                <p className='button  my-[1rem] min-w-[20rem] text-center'>Start Time: {election.startTime.toLocaleString()}</p>
                <p className='button min-w-[20rem] text-center'>End Time: {election.endTime.toLocaleString()}</p>
            </div>
           
           <h1 className='title my-[1rem]'>Candidates:</h1>
            <div className='flex justify-center items-center gap-6'>
                {
                    candidates.map((candidate)=>(
                        <Candidates key={candidate.id} startTime={election.startTime} endTime={election.endTime} candidate={candidate} userId={userId} electionId= {election.id} />
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default page