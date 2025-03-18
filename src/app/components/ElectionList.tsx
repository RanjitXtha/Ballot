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
                        <h3>{election.title}</h3>
                        <p>{election.description}</p>
                    </Link>
                ))
            }
        </div>

    </div>
  )
}

export default ElectionList