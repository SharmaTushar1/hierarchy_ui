import AddTeamPopUp from "./AddTeamPopUp";
import AddHeadOrCeoPopUp from "./AddHeadOrCeoPopUp";
import AddMemberPopUp from "./AddMemberPopUp";
import { isCEO, isHead, isTeam } from "../lib/typeChecker";

// parent object basically means where we clicked the add button. So, we are adding a member inside the object hence we will be passing it as parent below.

const Add = ({toggle, object}: {toggle: ()=>void, object: null | CEO | Head | Team | Member}) => {

  const addPopUp = () => {
    if (!object) { // if parent object is null then we are adding the CEO
      return <AddHeadOrCeoPopUp parent = {object} />
    } else if (isCEO(object)) { // object is one of the three heads
      return <AddHeadOrCeoPopUp parent = {object} />
    } else if (isHead(object)) { // object is a team
      return <AddTeamPopUp parent = {object} />;
    } else if (isTeam(object)) { // parent object is a team so we will be adding a Member
      return <AddMemberPopUp parent = {object} />;
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 w-full h-full px-4 sm:px-12 md:px-28 lg:px-60 xl:px-96">
      <div className="flex justify-between m-8 mx-auto">
        <h2>Add Item</h2>
        <span className="cursor-pointer" onClick={() => toggle()}>X</span>
      </div>
      <div>
        {addPopUp()}
      </div>
    </div>
  )
}
export default Add
