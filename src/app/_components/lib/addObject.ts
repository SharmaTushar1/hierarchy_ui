// TODO: Use this function for adding object everywhere

export const addObject = (root: Head[] | Team[] | Member[], id: string, objectToAdd: Head | Team | Member) => {
  // console.log("root from addObject => ", root);
  //@ts-ignore
  return root.map((obj) => {
    // console.log("In once")
    if (obj.id == id) {
      return {
        ...root,
        items: [ //@ts-ignore
          ...(root.items ?? []),
          objectToAdd,
        ],
      };
    }
    // @ts-ignore
    if (root.items) {
      return {
        ...root, // @ts-ignore
        items: addObject(root.items, id, objectToAdd),
      }
    }
    return root;
  });
};