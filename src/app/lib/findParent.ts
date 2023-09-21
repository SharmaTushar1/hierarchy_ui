export const findParent = (root: CEO | Head | Team, childId: string): CEO | Head | Team | undefined => {
  for (let obj of root.items) {
    if (obj.id === childId) {
      return root;
    }
    if (!obj.items) continue;
    let foundTeam = findParent(obj, childId);
    if (foundTeam) return foundTeam;
  }
  return undefined;
}