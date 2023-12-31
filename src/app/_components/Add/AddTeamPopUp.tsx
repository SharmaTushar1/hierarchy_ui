import { useForm } from "react-hook-form";
import { useStore } from "@/app/store";
import { addObject } from "../lib/addObject";
import { v4 as uuidv4 } from 'uuid';
import { hasTeam } from "../lib/hasTeam";

const AddTeamPopUp = ({parent, toggle}: {parent: Head, toggle: () => void}) => {

  const setRootEmployee = useStore(state => state.setRootEmployee);
  const rootEmployee = useStore(state => state.rootEmployee);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const sameNameTeamCheck = (value: string) => !hasTeam(rootEmployee, value) || 'Team with name already exists. Choose a different name.';

  const onSubmit = (teamData: any) => {
    const teamToAdd: Team = {id: uuidv4(), ...teamData, items: []};
    const obj = addObject(rootEmployee, parent.id, teamToAdd);
    const updatedRootEmployee = {...rootEmployee, items: [...obj]};
    setRootEmployee(updatedRootEmployee);
    if (typeof window !== 'undefined') localStorage.setItem('rootEmployee', JSON.stringify(updatedRootEmployee)); // Storing in localstorage
    toggle();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label htmlFor="name">Team Name: </label>
        <input placeholder="Team Name" id="name" {...register('name', { required: 'Name is required', validate: sameNameTeamCheck})} />
        {errors.name && <span>{errors.name.message as string}</span>}
      </div>

      <input type="submit" />
    </form>
  )
}
export default AddTeamPopUp