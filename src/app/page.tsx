import { getUser } from "./actions/user.action";
import CreateElection from "./components/CreateElection";
import ElectionList from "./components/ElectionList";
import Logout from "./components/Logout";

export default function Home() {
  getUser();


 
  return (
    <div className="bg-[#f7f8fa]">

      <header className="px-[3rem] bg-white flex justify-between py-3 mb-[1rem]">
        <div>eBallot</div>
        <div className="flex gap-4 ">
          <nav>Home</nav>
          <nav>My Ballots</nav>
          <Logout />
        </div>
      </header>

      <section className="px-[3rem] grid grid-cols-[1fr_2.5fr_1.4fr] gap-[2rem]">
  
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
            <div>
              <h1 className="title">Upcoming Elections</h1>

              <div className="election-list">
                <p>Election Name</p>
                <p>Starts in: 3 days</p>

              </div>

              <div className="election-list">
                <p>Election Name</p>
                <p>Starts in: 3 days</p>

              </div>

              <div className="election-list">
                <p>Election Name</p>
                <p>Starts in: 3 days</p>

              </div>
            </div>
        </div>
      </section>
      {/* <CreateElection /> */}
      
    </div>
  );
}
