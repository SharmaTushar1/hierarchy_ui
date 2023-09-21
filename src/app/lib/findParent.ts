export const findParent = (root: CEO | Head | Team, childId: string): CEO | Head | Team | undefined => {
  for (let obj of root.items) {
    if (obj.id === childId) {
      return root;
    } // @ts-ignore obj.items basically means a check if it's a member or not while checking if there are more items in it.
    if (!obj.items) continue; // @ts-ignore it won't be item
    let foundTeam = findParent(obj, childId);
    if (foundTeam) return foundTeam;
  }
  return undefined;
}