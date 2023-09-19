// function similar to addObject. Recursively updated the rootEmployee object and returns it. Deep copy basically.

export const editObject = (root: CEO | Head | Team | Member, itemToEdit: CEO | Head | Team | Member, updatedObject: Head | Team | Member) => {
  //@ts-ignore
  return root.items.map((obj) => {
    if (obj.id == itemToEdit.id) {
      return {
        ...updatedObject
      };
    }
    // @ts-ignore
    if (obj.items) {
      return {
        ...obj, // @ts-ignore
        items: editObject(obj, itemToEdit, updatedObject),
      }
    }
    return obj;
  });
};