// function for checking if the team with the name is already present

import { isTeam } from "./typeChecker";

export const hasTeam: (root: CEO | Head | Team, name: string) => boolean = (root: CEO | Head | Team, name: string) => {
  if (!root) return false;
  if (isTeam(root) && root.name === name) return true;
  if (isTeam(root)) return false; // if the name is not same as what we are looking for and it's still a team then we can return and look for the next teams under the head.
  let foundTeam: boolean = false;
  for (let obj of root.items) {
    if (!obj.items) continue;
    foundTeam = hasTeam(obj, name);
    if (foundTeam) return foundTeam;
  }
  return foundTeam;
}