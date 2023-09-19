// FIXME: Not sure if this is the file but adding team is making bugs so a new undefined object is created and that has the team that we just added.

import { useForm } from "react-hook-form";
import { useStore } from "@/app/store";
import { addObject } from "../lib/addObject";

const AddTeamPopUp = ({toggle, parent}: {toggle: ()=>void, parent: Head}) => {

  const positions = useStore(state => state.positions);
  const setRootEmployee = useStore(state => state.setRootEmployee);
  const rootEmployee = useStore(state => state.rootEmployee);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (teamData: any) => { // TODO: take care of this for now just using any
    const teamToAdd = {...teamData, items: []};
    const obj = addObject(rootEmployee, parent.id, teamToAdd);
    const updatedRootEmployee = {...rootEmployee, items: [...obj]};
    setRootEmployee(updatedRootEmployee);
    localStorage.setItem('rootEmployee', JSON.stringify(updatedRootEmployee)); // Storing in localstorage
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 w-full h-full px-4 sm:px-12 md:px-28 lg:px-60 xl:px-96">
      <div className="flex justify-between m-8 mx-auto">
        <h2>Add Team</h2>
        <span className="cursor-pointer" onClick={() => toggle()}>X</span>
      </div>
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="id">Team Id: </label>
            <input placeholder="Team ID" id="id" {...register('id', { required: 'ID is required' })} />
            {errors.id && <span>{errors.id.message as string}</span>}
          </div>

          <div>
            <label htmlFor="name">Team Name: </label>
            <input placeholder="Team Name" id="name" {...register('name', { required: 'Name is required' })} />
            {errors.name && <span>{errors.name.message as string}</span>}
          </div>

          <input type="submit" />
        </form>
      </div>
    </div>
  )
}
export default AddTeamPopUp