import { useStore } from "@/app/store";
import { useForm } from "react-hook-form";
import { editObject } from "../lib/editObject";

const EditTeam = ({ itemToEdit}: {itemToEdit: Head}) => {

  const setRootEmployee = useStore(state => state.setRootEmployee);
  const rootEmployee = useStore(state => state.rootEmployee);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (teamData: any) => {
    const updatedTeam: Team = {...itemToEdit, ...teamData};
    const obj = editObject(rootEmployee, itemToEdit, updatedTeam);
    const updatedRootEmployee = {...rootEmployee, items: [...obj]};
    setRootEmployee(updatedRootEmployee);
    if (typeof window !== 'undefined') localStorage.setItem('rootEmployee', JSON.stringify(updatedRootEmployee)); // Storing in localstorage
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Team Name: </label>
          <input placeholder="Team Name" id="name" {...register('name', { required: 'Name is required' })} />
          {errors.name && <span>{errors.name.message as string}</span>}
        </div>

        <input type="submit" />
      </form>
  )
}
export default EditTeam