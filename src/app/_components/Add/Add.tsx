import AddTeamPopUp from "./AddTeamPopUp";
import AddHeadOrCeoPopUp from "./AddHeadOrCeoPopUp";
import AddMemberPopUp from "./AddMemberPopUp";
import { useStore } from "@/app/store";

// object can be employee or Team

const Add = ({toggle, object}: {toggle: ()=>void, object: CEO | Head | Team | Member}) => {

  const positions = useStore(state => state.positions);

  const addPopUp = () => {
    if (!object.position) {
      return <AddMemberPopUp parent = {object} />;
    } else if ([1,2,3].includes(positions.indexOf(object.position))) { // object is a team
      return <AddTeamPopUp parent = {object} />;
    } else { // object is one of the three heads or CEO
      return <AddHeadOrCeoPopUp parent = {object} />
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
