import { title } from "process";
import { getUser } from "./actions/user.action";
import CreateElection from "./components/CreateElection";
import ElectionList from "./components/ElectionList";
import Logout from "./components/Logout";

export default function Home() {
  getUser();

  const elections = [
    {title:"Election 1",startDate:'3'},
    {title:"Election 2",startDate:'4'},
    {title:"Election 3",startDate:'5'},
  ]

 
  return (
    <div className="bg-[#f7f8fa]">

      <header className="px-[3rem] shadow-sm  bg-white flex justify-between items-center py-3 mb-[1rem]">
        <div className="font-bold text-xl">eBallot</div>
        <div className="flex items-center gap-6 font-semibold ">
          <nav>Home</nav>
          <nav>My Ballots</nav>
          <nav>Elections</nav>
          <nav>About</nav>
          <Logout />
        </div>
      </header>

      <section className="mt-[2rem] px-[3rem] grid grid-cols-[1fr_2.5fr_1.4fr] items-start gap-[2rem]">
  
          <div className="w-full bg-white shadow-md p-4 ">
            <div className="flex flex-col gap-2 items-center">
              <div className="w-[5rem] h-[5rem] rounded-full bg-black"></div>
              <p className="font-semibold">Name</p>
              <p className="text-sm">Email</p>
            </div>

            <div className="mt-[1rem] border-t-1 pt-3 border-gray-600 flex flex-col items-start">
              <p>Email</p>
              <p>Gender</p>
              <p>Location</p>
            </div>    
          </div>

        <div className="bg-white px-[2rem] py-[1rem] shadow-md  ">
          <ElectionList />
        </div>

        <div className="bg-white shadow-md px-[2rem] py-[1rem]">
            <div className="text-sm">
              <h1 className="title">Upcoming Elections</h1>
              <div>

             {
              elections.map((election,index)=>(
                <div key={index} className="election-list py-2 px-3">
                  <p className="text-base font-semibold">{election.title}</p>
                  <p>Starts in: {election.startDate} Days</p>
                </div>
              ))
             }
              
              </div>
            </div>

            <div className="text-sm mt-[2rem]">
              <h1 className="title">Past Elections</h1>
              <div>

             {
              elections.map((election,index)=>(
                <div key={index} className="election-list py-2 px-3">
                  <p className="text-base font-semibold">{election.title}</p>
                  <p className="flex justify-between items-center">Starts in: {election.startDate} Days <button className="button mt-[0.5rem] text-sm py-1 px-2">View Result</button></p>
                 
                </div>
              ))
             }
              
              </div>
            </div>
        </div>
      </section>
      {/* <CreateElection /> */}
      
    </div>
  );
}
