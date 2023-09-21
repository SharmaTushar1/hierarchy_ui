// A function to get all the employees. So everything except the teams.

import { isTeam } from "@/app/_components/lib/typeChecker";

export const getEmployees = (root: CEO | Head | Team, allEmployees: Employee[]): void => {
  if (!root) {
    return;
  }
  if (!isTeam(root)) {
    let newObj = {id: root.id, name: root.name, phone_number: root.phone_number, email: root.email, position: undefined}; // @ts-ignore
    newObj = root.position?{...newObj, position: root.position}:root.isLeader?{...newObj, position: 'Team Leader'}:{...newObj, position: 'Team Member'};
    allEmployees.push(newObj);
  }
  if (!root.items) return;
  root.items.map((obj: Head | Team | Member) => { // @ts-ignore
    if (obj.items) { // @ts-ignore not a member or the last of the chain
      getEmployees(obj, allEmployees);
    } else { // @ts-ignore
      let newObj = {id: obj.id, name: obj.name, phone_number: obj.phone_number, email: obj.email, position: undefined}; // @ts-ignore
      newObj = obj.position?{...newObj, position: obj.position}:obj.isLeader?{...newObj, position: 'Team Leader'}:{...newObj, position: 'Team Member'};
      allEmployees.push(newObj);
    }
  })
}