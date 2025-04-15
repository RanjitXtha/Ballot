import { title } from "process";
import { getUser } from "./actions/user.action";
import CreateElection from "./components/CreateElection";
import {OnGoingElectionList , UpComingElectionList , PastElectionList} from "./components/ElectionList";
import UserProfile from "./components/UserProfile";

export default async function Home() {
  const user = await getUser();

  if(!user)return;
console.log(user)
 
  return (
    <div className="bg-[#f7f8fa]  ">

      <section className="py-[1rem] px-[3rem] grid grid-cols-[1fr_2.5fr_1.4fr] items-start gap-[2rem] min-h-[calc(100vh-5rem)]">
  
        <UserProfile user = {user} />

        <div className="bg-white h-full px-[2rem] py-[1rem] shadow-md ">
          <OnGoingElectionList />
        </div>

        <div className="bg-white shadow-md px-[2rem] py-[1rem] h-full">
          <UpComingElectionList />
          <PastElectionList />
        </div>
      </section>
      {/* <CreateElection /> */}
      
    </div>
  );
}
