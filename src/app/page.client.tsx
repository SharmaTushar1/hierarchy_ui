'use client';

import { useState } from "react";
import { useStore } from "./store";
import Hierarchy from "./_components/Hierarchy";


const PageClient = () => {

  const rootEmployee = useStore(store => store.rootEmployee);
  const [addMemberPopUp, setAddMemberPopUp] = useState(false);

  const toggleAddMemberPopUp = () => {
    setAddMemberPopUp(prev => !prev);
  }
  const CEO: CEO = {
    id: "1",
    name: "Tushar1",
    phone_number: "1234567890",
    email: "as@asdfd.com",
    position: 'CEO', // isMemberOrLeader
    items: [
    {
      id: "2",
      name: "Tushar2",
      phone_number: "1234567890",
      email: "as@asdfd.com",
      position: "Head of Design",
      items: [
        // here I'll have teams and I want to be able to switch the employees between teams
      {
        id: '4',
        name: "Team 1", // name is the only thing that I'll get from the UI
        items: [
          {
            id: "22",
            name: "as",
            phone_number: "asdf",
            email: "fdas",
            isLeader: true,
          },
          {
            id: "string",
            name: "string",
            phone_number: "string",
            email: "string",
            isLeader: false,
          }
        ], // empty initially

      }],
    },
    {
      id: "3",
      name: "Tushar3",
      phone_number: "1234567890",
      email: "as@asdfd.com",
      position: "Head of Staff",
      items: [],
    },
    {
      id: "4",
      name: "Tushar4",
      phone_number: "1234567890",
      email: "as@asdfd.com",
      position: "Head of Engineering",
      items: [],
      }
    ]
  }

  return (
    <div>
      {Object.values(rootEmployee).length==0 ? (<button className="m-8" onClick={() => toggleAddMemberPopUp()}>Add Member</button>): (
        <Hierarchy root = {rootEmployee} />
      )}
    </div>
  )
}
export default PageClient