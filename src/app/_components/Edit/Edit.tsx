// user is not allowed to change position and id of the user.

import EditMember from "./EditMember"
import EditTeam from "./EditTeam";
import EditHeadOrCeo from "./EditHeadOrCeo";
import { isCEO, isHead, isMember, isTeam } from "../lib/typeChecker";

// object can be employee or Team

const Edit = ({toggle, object}: {toggle: ()=>void, object: CEO | Head | Team | Member}) => {

  const editPopUp = () => {
    if (isHead(object) || isCEO(object)) { // object is one of the three heads or CEO
      return <EditHeadOrCeo itemToEdit = {object} toggle={toggle} />
    } else if (isTeam(object)) { // @ts-ignore as we are checking if object is a team
      return <EditTeam itemToEdit = {object} toggle={toggle} />;
    } else if (isMember(object)) {
      return <EditMember itemToEdit = {object} toggle={toggle} />;
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 w-full h-full px-4 sm:px-12 md:px-28 lg:px-60 xl:px-96">
      <div className="flex justify-between m-8 mx-auto">
        <h2>Edit</h2>
        <span className="cursor-pointer" onClick={() => toggle()}>X</span>
      </div>
      <div>
        {editPopUp()}
      </div>
    </div>
  )
}
export default Edit