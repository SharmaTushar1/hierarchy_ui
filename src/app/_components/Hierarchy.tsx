import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddHeadOrCeoPopUp from "./AddHeadOrCeoPopUp";
import { useStore } from "../store";

function Hierarchy({ root }: {root: CEO | Head | Team | Member}) {
  const [expand, setExpand] = useState(false);

  const [addMemberPopUp, setAddMemberPopUp] = useState(false);
  const positions = useStore(store => store.positions);

  const toggleAddMemberPopUp = () => {
    console.log(addMemberPopUp);
    setAddMemberPopUp(prev => !prev);
  }

  const itemsDivStyle = {
    marginTop: 0,
    marginLeft: 3,
    borderLeft: "3px solid #ddd",
    paddingLeft: 15,
    display: expand ? "block" : "none"
  };
  // @ts-ignore we are checking if root.items so it won't go in the if loop anyways
  if (root.items) {
    return (
      <div style={{ cursor: "pointer" }}>
        <div onClick={() => setExpand(!expand)}>
          <div className="w-[80%] mx-auto flex justify-between">
            <div>{/* @ts-ignore */}
              <span>{root.position?`🧑 ${root.position} (${root.name})`:`™${root.name}`}</span> {/* First position if it's a CEO | Head otherwise name if it's a Team */}
            </div>
            <div className="">
              <EditIcon onClick={() => console.log("Edit is clicked")} />
              <AddIcon onClick={() => toggleAddMemberPopUp()} />
              <RemoveIcon onClick={() => console.log("Remove is clicked")} />
              <MoreHorizIcon onClick={() => console.log("More is clicked")}  />
            </div>
          </div>
        </div>
        {/* @ts-ignore because root.position is giving warning as Team doesn't have position but I am checking for it */}
      {root.position && addMemberPopUp && <AddHeadOrCeoPopUp toggle={toggleAddMemberPopUp} parent={positions.indexOf(root.position)} />}

        <div style={itemsDivStyle}>{/* @ts-ignore  */}
          {root.items.map((item: Head | Team ) => {
            return <Hierarchy key={item.id} root={item}></Hierarchy>;
          })}
        </div>
      </div>
    );
  } else {
    return <div key={root.id}>🧑 {root.name} </div>;
  }
}

export default Hierarchy;
