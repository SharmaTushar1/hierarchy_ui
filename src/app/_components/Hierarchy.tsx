import { useState } from "react";

function Hierarchy({ root }: {root: CEO | Head | Team | Member}) {
  const [expand, setExpand] = useState(false);

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
          <div>{/* @ts-ignore */}
            <span>{root.position?`🧑 ${root.position} (${root.name})`:`™${root.name}`}</span> {/* First position if it's a CEO | Head otherwise name if it's a Team */}
          </div>
        </div>

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
