import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddHeadOrCeoPopUp from "./AddHeadOrCeoPopUp";
import { useStore } from "../store";
import AddTeamPopUp from "./AddTeamPopUp";

function Hierarchy({ root }: { root: CEO | Head | Team | Member }) {
  const [expand, setExpand] = useState(false);

  const [addHeadOrCeoPopUp, setAddHeadOrCeoPopUp] = useState(false);
  const [addTeamPopUp, setAddTeamPopUp] = useState(false);
  const positions = useStore((store) => store.positions);

  const toggleAddHeadOrCeoPopUp = () => {
    setAddHeadOrCeoPopUp((prev) => !prev);
  };

  const toggleAddTeamPopUp = () => {
    setAddTeamPopUp((prev) => !prev);
  };

  const toggleAdd = () => { //@ts-ignore
    if (root.position === 'CEO') {
      toggleAddHeadOrCeoPopUp(); //@ts-ignore
    } else if ([1,2,3].includes(positions.indexOf(root.position))) {
      toggleAddTeamPopUp()
    }
  }

  const itemsDivStyle = {
    marginTop: 0,
    marginLeft: 3,
    borderLeft: "3px solid #ddd",
    paddingLeft: 15,
    display: expand ? "block" : "none",
  };
  // @ts-ignore we are checking if root.items so it won't go in the if loop anyways
  if (root.items) {
    console.log("root => ", root)
    return (
      <div style={{ cursor: "pointer" }}>
        <div onClick={() => setExpand(!expand)}>
          <div className="w-[80%] mx-auto flex justify-between">
            <div>
              <span>
              {/* @ts-ignore */}
                {root.position //@ts-ignore
                  ? `🧑 ${root.position} (${root.name})`
                  : `™${root.name}`}
              </span>{" "}
              {/* First position if it's a CEO | Head otherwise name if it's a Team */}
            </div>
            <div className="">
              <EditIcon onClick={() => console.log("Edit is clicked")} />
              <AddIcon onClick={() => toggleAdd()} />
              <RemoveIcon onClick={() => console.log("Remove is clicked")} />
              <MoreHorizIcon onClick={() => console.log("More is clicked")} />
            </div>
          </div>
        </div>
        {/* @ts-ignore because root.position is giving warning as Team doesn't have position but I am checking for it */}
        {/* @ts-ignore check if it's CEO or Head for others we have a different PopUp */}
        {root.position && //@ts-ignore
          root.position == 'CEO' &&
          addHeadOrCeoPopUp && (
            <AddHeadOrCeoPopUp
              toggle={toggleAddHeadOrCeoPopUp} //@ts-ignore
              parent={positions.indexOf(root.position)}
            />
        )}
        {/* @ts-ignore Check if the parent is any of the heads */}
        {root.position && //@ts-ignore
          [1,2,3].includes(positions.indexOf(root.position)) &&
          addTeamPopUp && (
            <AddTeamPopUp
              toggle={toggleAddTeamPopUp}
              parent={root}
            />
        )}
        <div style={itemsDivStyle}>
          {/* @ts-ignore  */}
          {root.items.map((item: Head | Team) => {
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
