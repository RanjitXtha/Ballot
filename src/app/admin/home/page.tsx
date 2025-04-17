import { GetInfo } from '@/app/actions/election.action';
import Elections from '@/app/components/Elections';

const page = async() => {

const info = await GetInfo();
console.log(info)

  return (
    <div className='py-[1rem] px-[3rem] bg-[#f7f8fa] '>
        <div className='py-[2rem] px-[3rem] bg-white rounded-lg mb-[2rem]'>
        <h1 className='title mb-[1.5rem]'>Voting Activities</h1>
    <div className=' grid grid-flow-col justify-between'>
    <div className='bg-[#f1f5f9] px-[2rem] py-[1.5rem] rounded-lg text-center min-w-[12rem]'>
        <p className='text-3xl font-bold text-[#266ef3] mb-2'>{info.totalElection}</p>
        <p>Total Elections</p>
    </div>

    <div className='bg-[#f1f5f9] px-[2rem] py-[1.5rem] rounded-lg text-center min-w-[12rem]'>
        <p className='text-3xl font-bold text-[#266ef3] mb-2'>{info.totalVoters}</p>
        <p>Total Voters</p>
    </div>

    <div className='bg-[#f1f5f9] px-[2rem] py-[1.5rem] rounded-lg text-center min-w-[12rem]'>
        <p className='text-3xl font-bold text-[#266ef3] mb-2'>{info.totalCandidates}</p>
        <p>Total Candidates</p>
    </div>

    <div className='bg-[#f1f5f9] px-[2rem] py-[1.5rem] rounded-lg text-center min-w-[12rem]'>
        <p className='text-3xl font-bold text-[#266ef3] mb-2'>{info.totalActiveElection}</p>
        <p>Active Elections</p>
    </div>

    
</div>
</div>
       
      <Elections  />
       
    </div>
  )
}

export default page