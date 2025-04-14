import { title } from "process";
import { getUser } from "./actions/user.action";
import CreateElection from "./components/CreateElection";
import ElectionList from "./components/ElectionList";
import UserProfile from "./components/UserProfile";

export default async function Home() {
  const user = await getUser();

  if(!user)return;
console.log(user)
  const elections = [
    {title:"Election 1",startDate:'3'},
    {title:"Election 2",startDate:'4'},
    {title:"Election 3",startDate:'5'},
  ]

 
  return (
    <div className="bg-[#f7f8fa]">

      <section className="py-[1rem] px-[3rem] grid grid-cols-[1fr_2.5fr_1.4fr] items-start gap-[2rem]">
  
        <UserProfile user = {user} />

        <div className="bg-white h-full px-[2rem] py-[1rem] shadow-md  ">
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
