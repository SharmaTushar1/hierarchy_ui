import { useForm } from "react-hook-form";
import { useStore } from "@/app/store";
import { addObject } from "../lib/addObject";

const AddTeamPopUp = ({parent}: {parent: Head}) => {

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
  )
}
export default AddTeamPopUp