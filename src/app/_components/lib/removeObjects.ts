export const removeObjects = (root: CEO | Head | Team | Member, id: string) => { //@ts-ignore initially CEO is passed so we can ignore errors
  return root.items.filter((member) => member.id !== id).map((member) => {
      if (!member.items) return member;
      member.items = removeObjects(member, id);
      return member;
    });
}