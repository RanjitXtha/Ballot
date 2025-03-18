import { getUser } from "./actions/user.action";
import CreateElection from "./components/CreateElection";
import ElectionList from "./components/ElectionList";
import Logout from "./components/Logout";

export default function Home() {
  getUser();


 
  return (
    <div>
      <Logout />
      <h1>Election</h1>
      <CreateElection />
      <ElectionList />
      
    </div>
  );
}
