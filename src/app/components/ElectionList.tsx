import React from 'react'
import { GetElectionList } from '../actions/election.action'
import Link from 'next/link';
import { DeleteButton } from './DeleteButton';

const ElectionList = async() => {
    const electionList = await GetElectionList();
   
  return (
    <div>
        <h1 className='title'>Election List</h1>
        <div>
            {
                electionList.map((election,index)=>(
                   
                    <Link href={`/election/${election.id}`} key={index}>
                        <div className='election-list'>
                            <h3 className='font-semibold text-lg'>{election.title}</h3>
                            <p>{election.description}</p>
                            <div className='flex justify-between items-center'>
                                <p>Date-Date</p>
                                <button className='button'>Vote Now</button>
                            </div>
                        </div>
                    </Link>
                  
                ))
            }
        </div>

    </div>
  )
}

export default ElectionList