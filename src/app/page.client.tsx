'use client';

import { useState } from "react";
import { useStore } from "./store";
import Hierarchy from "./_components/Hierarchy";
import AddHeadOrCeoPopUp from "./_components/Add/AddHeadOrCeoPopUp";
import Add from "./_components/Add/Add";


const PageClient = () => {

  const rootEmployee = useStore(store => store.rootEmployee);
  const [addMemberPopUp, setAddMemberPopUp] = useState(false);

  const toggleAddMemberPopUp = () => {
    setAddMemberPopUp(prev => !prev);
  }

  return (
    <div>
      {Object.values(rootEmployee).length==0 ? (<button className="m-8" onClick={() => toggleAddMemberPopUp()}>Add Member</button>): (
        <Hierarchy root = {rootEmployee} />
      )}
      {addMemberPopUp && <Add toggle={toggleAddMemberPopUp} object={null} />}
    </div>
  )
}
export default PageClient