"use client";

import Link from "next/link";
import { useElectionContext } from "../context/ElectionContext";
import { useEffect, useState } from "react";



const OnGoingElectionList = () => {
    const { electionList } = useElectionContext();
  const now = new Date();

  const ongoingElections = electionList.filter((election) => {
    const start = new Date(election.startTime);
    const end = new Date(election.endTime);
    return start <= now && end >= now;
  });

  return (
    <div>
      <h1 className="title">Election List</h1>
      <div>
        {ongoingElections.map((election, index) => (
          <Link href={`/election/${election.id}`} key={index}>
            <div className="election-list">
              <h3 className="font-semibold text-lg">{election.title}</h3>
              <p>{election.description}</p>
              <div className="flex justify-between items-center text-xs">
                <p>
                  {new Date(election.startTime).toLocaleString()} -{" "}
                  {new Date(election.endTime).toLocaleString()}
                </p>
                <button className="button">Vote Now</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


const UpComingElectionList = ()=>{
    const { electionList } = useElectionContext();

    const elections = electionList.filter(election=>{
        const start = new Date(election.startTime);
        const now = new Date();

        return start > now;
    })

    return(
            <div className="text-sm min-h-[10rem]">
              <h1 className="title">Upcoming Elections</h1>
              <div>

             {
              elections.map((election,index)=>(
                <Link href={`/election/${election.id}`} key={index}>
                <div key={index} className="election-list py-2 px-3">
                  <p className="text-base font-semibold">{election.title}</p>
                  <p className="text-xs my-1">Starts at: {election.startTime.toLocaleDateString()} </p>
                  <button className="button mt-[0.5rem] text-sm py-1 px-2">View Election</button>
                </div>
                </Link>
              ))
             }
              
              </div>
            </div>
    )
}

const PastElectionList = ()=>{
    const { electionList } = useElectionContext();

    const elections = electionList.filter(election=>{
        const end = new Date(election.endTime);
        const now = new Date();

        return end < now;
    })

    return(
        <div className="text-sm mt-[2rem]">
        <h1 className="title">Past Elections</h1>
        <div>

       {
        elections.map((election,index)=>(
         <Link href={`/election/${election.id}`} key={index}>
          <div key={index} className="election-list py-2 px-3 grid grid-cols-2">
            <div>
              <p className="text-base font-semibold">{election.title}</p>
              <p className="flex justify-between items-center">Ended at: {election.endTime.toLocaleDateString()}</p>
           
            </div>

              <div className="flex justify-end">
              <button className="button mt-[0.5rem] text-sm py-1 px-2">View Result</button>
              </div>
          </div>
          </Link>
        ))
       }
        
        </div>
      </div>
    )
}

export {OnGoingElectionList,  UpComingElectionList , PastElectionList};
