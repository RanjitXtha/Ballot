"use client"; 

import React, { createContext, useContext, useEffect, useState } from "react";
import { GetElectionList } from "../actions/election.action";

type Election = {
    id:string;title:string;description:string;startTime:Date;endTime:Date
}

type ElectionContextType = {
    elections: Election[];
    setElections: React.Dispatch<React.SetStateAction<Election[]>>;
  };
  const ElectionContext = createContext<ElectionContextType | null>(null);
export const ElectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [elections, setElections] = useState<Election[]>([]);

  useEffect(()=>{
    const getElections = async()=>{
        setElections(await GetElectionList());
    }

    getElections();
  },[]);

  return (
    <ElectionContext.Provider value={{ elections, setElections }}>
      {children}
    </ElectionContext.Provider>
  );
};

export const useElectionContext = () => useContext(ElectionContext);
