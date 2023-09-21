'use client'

import { ReactNode } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useStore } from "./store"
import { findTeam } from "./lib/findTeam"
import { editObject } from "./_components/lib/editObject"

const Providers = ({children}: {children: ReactNode}) => {

  const rootEmployee = useStore(state => state.rootEmployee);
  const setRootEmployee = useStore(state => state.setRootEmployee);

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    // if user is dropping at a position where dropping is not allowed
    if (!destination) return;
    // if the user is dropping at the same position where the item initially is
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    //@ts-ignore it gives warning but it will have value that's why we are dragging in first place.
    let sourceTeam: Team = findTeam(rootEmployee, source.droppableId);
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    // Delete from the original place and append on the destination one
    const itemToMove = sourceTeam.items[sourceIndex];
    const newItemsArrayForSource = [...sourceTeam?.items?.filter((item, index) => index !== sourceIndex)];
    const updatedSourceTeam = {...sourceTeam, items: newItemsArrayForSource};
    let newItemsRootEmployee = editObject(rootEmployee, sourceTeam, updatedSourceTeam);
    let updatedRootEmployee = {...rootEmployee, items: [...newItemsRootEmployee]};
    setRootEmployee(updatedRootEmployee); // @ts-ignore
    let destinationTeam: Team = findTeam(updatedRootEmployee, destination.droppableId);
    const newItemsArrayForDestination = [...destinationTeam.items];
    newItemsArrayForDestination.splice(destinationIndex, 0, itemToMove);
    const updatedDestinationTeam = {...destinationTeam, items: newItemsArrayForDestination};
    newItemsRootEmployee = editObject(updatedRootEmployee, destinationTeam, updatedDestinationTeam);
    updatedRootEmployee = {...updatedRootEmployee, items: [...newItemsRootEmployee]};
    setRootEmployee(updatedRootEmployee);
    localStorage.setItem('rootEmployee', JSON.stringify(updatedRootEmployee));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  )
}
export default Providers