import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStore } from "../store";
import { removeObjects } from "./lib/removeObjects";
import Edit from "./Edit/Edit";
import Add from "./Add/Add";
import { isMember, isTeam } from "./lib/typeChecker";

function Hierarchy({ root }: { root: CEO | Head | Team | Member }) {
  const [expand, setExpand] = useState(false);

  const [addPopUp, setAddPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
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

  const handleRemove = (employee: any) => {
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

  const toggleEditPopUp = () => {
    setShowEditPopUp(prev => !prev)
  }

  if (!isMember(root)) {
    return (
      <div style={{ cursor: "pointer" }}>
        <div onClick={() => setExpand(!expand)}>
          <div className="mx-auto flex justify-between">
            <div>
              <span>
                {!isTeam(root) //@ts-ignore
                  ? `🧑 ${root.position} (${root.name})`
                  : `™${root.name}`}
              </span>{" "}
            </div>
            <div className="">
              <EditIcon onClick={() => toggleEditPopUp()} />
              <AddIcon onClick={() => toggleAddPopUp()} />
              <RemoveIcon onClick={() => handleRemove(root)} />
            </div>
          </div>
        </div>
        {addPopUp && (
            <Add
              toggle={toggleAddPopUp}
              object={root}
            />
        )}
        <div style={itemsDivStyle}>{/* @ts-ignore already checking if it's a member or not*/}
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
      </div>
      <div className="">
        <EditIcon onClick={() => toggleEditPopUp()} />
        <RemoveIcon onClick={() => handleRemove(root)} />
      </div>
      {showEditPopUp && <Edit toggle={toggleEditPopUp} object={root} />}
    </div>;
  }
}

export default Hierarchy;
