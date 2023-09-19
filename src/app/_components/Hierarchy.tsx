import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStore } from "../store";
import { removeObjects } from "./lib/removeObjects";
import Edit from "./Edit/Edit";
import Add from "./Add/Add";

function Hierarchy({ root }: { root: CEO | Head | Team | Member }) {
  const [expand, setExpand] = useState(false);

  const [addPopUp, setAddPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const positions = useStore((store) => store.positions);
  const rootEmployee = useStore((store) => store.rootEmployee);
  const setRootEmployee = useStore((store) => store.setRootEmployee);

  const toggleAddPopUp = () => {
    setAddPopUp((prev) => !prev);
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
              <AddIcon onClick={() => toggleAddPopUp()} />
              <RemoveIcon onClick={() => handleRemove(root)} />
            </div>
          </div>
        </div>
        {addPopUp && (
            <Add
              toggle={toggleAddPopUp} //@ts-ignore
              object={root}
            />
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
