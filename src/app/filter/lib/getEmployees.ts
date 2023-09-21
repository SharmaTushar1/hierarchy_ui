import { isTeam } from "@/app/_components/lib/typeChecker";

export const getEmployees = (root: any, allEmployees: Employee[]) => {
  if (!isTeam(root)) {
    let newObj = {id: root.id, name: root.name, phone_number: root.phone_number, email: root.email, position: undefined};
    newObj = root.position?{...newObj, position: root.position}:root.isLeader?{...newObj, position: 'Team Leader'}:{...newObj, position: 'Team Member'};
    allEmployees.push(newObj);
  }
  //@ts-ignore the reason I'm mapping here despite worrying about if there's an items or not in the root is because the root in the beginning will always be CEO
  return root.items.map((obj) => {
    if (obj.items) { // not a member or the last of the chain
      return getEmployees(obj, allEmployees);
    } else {
      let newObj = {id: obj.id, name: obj.name, phone_number: obj.phone_number, email: obj.email, position: undefined};
      newObj = obj.position?{...newObj, position: obj.position}:obj.isLeader?{...newObj, position: 'Team Leader'}:{...newObj, position: 'Team Member'};
      allEmployees.push(newObj);
    }
  })
}