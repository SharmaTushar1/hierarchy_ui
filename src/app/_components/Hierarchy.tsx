import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddHeadOrCeoPopUp from "./Add/AddHeadOrCeoPopUp";
import { useStore } from "../store";
import { removeObjects } from "./lib/removeObjects";
import Edit from "./Edit/Edit";
import AddTeamPopUp from "./Add/AddTeamPopUp";
import AddMemberPopUp from "./Add/AddMemberPopUp";

function Hierarchy({ root }: { root: CEO | Head | Team | Member }) {
  const [expand, setExpand] = useState(false);

  const [addHeadOrCeoPopUp, setAddHeadOrCeoPopUp] = useState(false);
  const [addTeamPopUp, setAddTeamPopUp] = useState(false);
  const [addMemberPopUp, setAddMemberPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const positions = useStore((store) => store.positions);
  const rootEmployee = useStore((store) => store.rootEmployee);
  const setRootEmployee = useStore((store) => store.setRootEmployee);

  const toggleAddHeadOrCeoPopUp = () => {
    setAddHeadOrCeoPopUp((prev) => !prev);
  };

  const toggleAddTeamPopUp = () => {
    setAddTeamPopUp((prev) => !prev);
  };

  const toggleAddMemberPopUp = () => {
    setAddMemberPopUp((prev) => !prev);
  }

  const toggleAdd = () => { //@ts-ignore
    if (root.position === 'CEO') {
      toggleAddHeadOrCeoPopUp(); //@ts-ignore
    } else if ([1,2,3].includes(positions.indexOf(root.position))) {
      toggleAddTeamPopUp()
    } else {
      toggleAddMemberPopUp();
    }
  }

  const itemsDivStyle = {
    marginTop: 0,
    marginLeft: 3,
    borderLeft: "3px solid #ddd",
    paddingLeft: 15,
    display: expand ? "block" : "none",
  };

  const handleRemove = (employee) => {
    let updatedRootEmployee = {} as CEO;
    if (employee.position === 'CEO') {
      setRootEmployee(updatedRootEmployee);
    } else {
      const updatedRootEmployeeItems = removeObjects(rootEmployee, employee.id);
      updatedRootEmployee = {...rootEmployee, items: updatedRootEmployeeItems};
      setRootEmployee(updatedRootEmployee);
    }
    localStorage.setItem('rootEmployee', JSON.stringify(updatedRootEmployee));
  }

  const toggleEditPopUp = (employee) => {
    console.log(employee);
    setShowEditPopUp(prev => !prev)
  }

  // @ts-ignore we are checking if root.items so it won't go in the if loop anyways
  if (root.items) {
    return (
      <div style={{ cursor: "pointer" }}>
        <div onClick={() => setExpand(!expand)}>
          <div className="mx-auto flex justify-between">
            <div>
              <span>
                {root.position!=undefined //@ts-ignore
                  ? `🧑 ${root.position} (${root.name})`
                  : `™${root.name}`}
              </span>{" "}
              {/* First position if it's a CEO | Head otherwise name if it's a Team */}
            </div>
            <div className="">
              <EditIcon onClick={() => toggleEditPopUp(root)} />
              {(root.position==undefined || [0,1,2,3].includes(positions.indexOf(root.position))) && <AddIcon onClick={() => toggleAdd()} />}
              <RemoveIcon onClick={() => handleRemove(root)} />
              {/* <MoreHorizIcon onClick={() => toggleEditPopUp(root)} /> */}
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
        {root.position == undefined && addMemberPopUp && (
          <AddMemberPopUp toggle={toggleAddMemberPopUp} parent={root}></AddMemberPopUp>
        )}
        <div style={itemsDivStyle}>
          {/* @ts-ignore  */}
          {root.items.map((item: Head | Team) => {
            return <Hierarchy key={item.id} root={item}></Hierarchy>;
          })}
        </div>
      {showEditPopUp && <Edit toggle={toggleEditPopUp} object={root} />}
      </div>
    );
  } else { // member
    return <div className="mx-auto flex justify-between">
      <div>
        <span>{/* @ts-ignore */}
          {`🧑 ${root.position} ${root.name}`}
        </span>{" "}
        {/* First position if it's a CEO | Head otherwise name if it's a Team */}
      </div>
      <div className="">
        <EditIcon onClick={() => toggleEditPopUp(root)} />
        <RemoveIcon onClick={() => handleRemove(root)} />
        {/* <MoreHorizIcon onClick={} /> */}
      </div>
      {showEditPopUp && <Edit toggle={toggleEditPopUp} object={root} />}
    </div>;
  }
}

export default Hierarchy;
