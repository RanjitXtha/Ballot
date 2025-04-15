"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { GetElectionList } from "../actions/election.action";
type Election = {
  id: string;
  title: string;
  description: string;
  startTime: Date; 
  endTime: Date;
};
type ElectionContextType = {
  electionList: Election[];
  setElections: React.Dispatch<React.SetStateAction<Election[]>>;
};

export const ElectionContext = createContext<ElectionContextType | null>(null);

export const ElectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [electionList, setElections] = useState<Election[]>([]);

  useEffect(() => {
    const getElections = async () => {
      const data = await GetElectionList();
      setElections(data);
    };

    getElections();
  }, []);

  return (
    <ElectionContext.Provider value={{ electionList, setElections }}>
      {children}
    </ElectionContext.Provider>
  );
};

export const useElectionContext = () => {
  const context = useContext(ElectionContext);
  if (!context) throw new Error("useElectionContext must be used within ElectionProvider");
  return context;
};
