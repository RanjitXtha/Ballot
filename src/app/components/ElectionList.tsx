import { GetElectionList } from '../actions/election.action'
import Link from 'next/link';
import { DeleteButton } from './DeleteButton';
import { useElectionContext } from "../context/ElectionContext";

const ElectionList = async() => {
     const { elections } = useElectionContext();
   
  return (
    <div>
        <h1 className='title'>Election List</h1>
        <div>
            {
                elections.map((election,index)=>(
                   
                    <Link href={`/election/${election.id}`} key={index}>
                        <div className='election-list'>
                            <h3 className='font-semibold text-lg'>{election.title}</h3>
                            <p>{election.description}</p>
                            <div className='flex justify-between items-center text-xs'>
                                <p>{election.startTime.toLocaleString()} - {election.endTime.toLocaleString()}</p>
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