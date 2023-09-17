'use client';

import { useState } from "react";
import { useStore } from "./store";


const PageClient = () => {

  const rootEmployee = useStore(store => store.rootEmployee);
  const [addMemberPopUp, setAddMemberPopUp] = useState(false);

  const toggleAddMemberPopUp = () => {
    setAddMemberPopUp(prev => !prev);
  }

  return (
    <div>
      {Object.values(rootEmployee).length==0 ? (<button className="m-8" onClick={() => toggleAddMemberPopUp()}>Add Member</button>): (
        'The root employee is present'
      )}
    </div>
  )
}
export default PageClient