import { isTeam } from "../_components/lib/typeChecker";

export const findTeam = (root: CEO | Head | Team, id: string): Team | undefined => {
  if (root.id === id) {// here the id we will pass will always be of the team so root will be team and hence we can assign it while ignoring the warning
    return {...root};
  }
  if (isTeam(root)) return undefined; // if the id is not same as what we are looking for and it's still a team then we can return and look for the next teams under the head.
  for (let obj of root.items) {
    if (!obj.items) continue;
    let foundTeam = findTeam(obj, id);
    if (foundTeam) return foundTeam;
  }
  return undefined;
}