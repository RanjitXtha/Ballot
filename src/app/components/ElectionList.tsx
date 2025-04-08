import React from 'react'
import { GetElectionList } from '../actions/election.action'
import Link from 'next/link';
import { Election } from './Election';

const ElectionList = async() => {
    const electionList = await GetElectionList();
   
  return (
    <div>
        <h1>Election List</h1>
        <div>
            {
                electionList.map((election,index)=>(
                   
                    <Link href={`/election/${election.id}`} key={index}>
                        <div  className='my-4 ring-2 p-1'>
                            <h3>Title:{election.title}</h3>
                            <p>Description{election.description}</p>
                        </div>
                    </Link>
                  
                ))
            }
        </div>

    </div>
  )
}

export default ElectionList