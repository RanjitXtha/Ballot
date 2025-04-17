"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Candidate {
  name: string;
  image: File | null;
}

export default function CreateElection() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [candidates, setCandidates] = useState<Candidate[]>([{ name: "", image: null }]);

  const addCandidate = () => {
    setCandidates([...candidates, { name: "", image: null }]);
  };

  const handleCandidateChange = (index: number, field: keyof Candidate, value: string | File | null) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index][field] = value as never;
    setCandidates(updatedCandidates);
  };

  const handleSubmit =  async(e: React.FormEvent) =>{
    e.preventDefault();
    console.log(candidates);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    candidates.forEach((candidate, index) => {
      formData.append(`candidateName-${index}`, candidate.name);
      if (candidate.image) {
        formData.append(`candidateImage-${index}`, candidate.image);
      }
    });

    console.log(startTime+endTime);

    formData.append("startTime", new Date(startTime).toISOString()); //just new Date will create error. it expects blob , string or file
    formData.append("endTime", new Date(endTime).toISOString());
    
    const response = await fetch('/api/admin/create',{
      method:'POST',
      body:formData,
    })

    const data = await response.json();
    console.log(data);
    if(!response.ok){
      console.log(data.message);
    }
    router.push('/admin/home')
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create Election</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Election Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          placeholder="Election Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        
        <h3 className="text-lg font-semibold mb-2">Candidates</h3>
        {candidates.map((candidate, index) => (
          <div key={index} className="mb-3 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Candidate Name"
              value={candidate.name}
              onChange={(e) => handleCandidateChange(index, "name", e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleCandidateChange(index, "image", e.target.files ? e.target.files[0] : null)}
              className="p-2 border rounded"
            />
          </div>
        ))}

        <button type="button" onClick={addCandidate} className="bg-blue-500 text-white p-2 rounded mb-3">
          Add Candidate
        </button>
        
        <button type="submit" className="button text-white p-2 rounded w-full">
          Create Election
        </button>
      </form>
    </div>
  );
}
