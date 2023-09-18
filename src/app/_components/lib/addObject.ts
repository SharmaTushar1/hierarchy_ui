// TODO: Use this function for adding object everywhere

export const addObject = (root: CEO | Head | Team | Member, id: string, objectToAdd: Head | Team | Member) => {
  console.log("root from addObject => ", root);
  //@ts-ignore
  return root.items.map((obj) => {
    console.log("obj.id => ",obj.id, ", id => ",id);
    if (obj.id == id) {
      console.log("obj => ", obj)
      console.log("obj.items => ",obj.items);
      console.log("objectToAdd => ", objectToAdd);
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