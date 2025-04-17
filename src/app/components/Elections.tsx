"use client"
import React from 'react'
import { useElectionContext } from '../context/ElectionContext';
import Link from 'next/link';
import { DeleteButton } from './DeleteButton';

const Elections = () => {
    const { electionList } = useElectionContext();
  return (
    <div className='bg-white px-[3rem] py-[1.5rem]'>
        <div className='flex justify-between'>
            <h1 className='title'>Election Lists</h1>
            <Link className='button' href={'/admin/create-election'}>Create Election +</Link>
        </div>
    
    {
        electionList.map((election, index) => (
      <Link href={`/election/${election.id}`} key={index}>
        <div className="election-list">
          <h3 className="font-semibold text-lg">{election.title}</h3>
          <p>{election.description}</p>
          <div className="flex justify-between items-center text-xs">
            <p>
              {new Date(election.startTime).toLocaleString()} -{" "}
              {new Date(election.endTime).toLocaleString()}
            </p>
            <DeleteButton electionId={election.id} />
          </div>
        </div>
      </Link>
    ))}
    </div>
  )
}

export default Elections