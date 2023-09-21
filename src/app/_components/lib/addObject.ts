export const addObject = (root: CEO | Head | Team | Member, id: string, objectToAdd: Head | Team | Member) => {
  //@ts-ignore
  return root.items.map((obj) => {
    if (obj.id == id) {
      return {
        ...obj,
        items: [ //@ts-ignore
          ...obj.items,
          objectToAdd,
        ],
      };
    }
    // @ts-ignore
    if (obj.items) {
      return {
        ...obj, // @ts-ignore
        items: addObject(obj, id, objectToAdd),
      }
    }
    return obj;
  });
};