import { useStore } from "@/app/store";
import { useForm } from "react-hook-form";
import { addObject } from "../lib/addObject";
import { v4 as uuidv4 } from 'uuid';

const AddMemberPopUp = ({parent}: {parent: Team}) => {

  const positions = useStore(state => state.positions);
  const setRootEmployee = useStore(state => state.setRootEmployee);
  const rootEmployee = useStore(state => state.rootEmployee);

  const validatePhoneNumber = (value: string) => /^\d{10}$/.test(value) || 'Phone number must be 10 digits';
  const validateEmail = (value: string) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) || 'Invalid email';

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (memberData: any) => {
    const memberToAdd:Member = {id: uuidv4(), ...memberData, isLeader: positions.indexOf(memberData.position) == 4}
    const obj = addObject(rootEmployee, parent.id, memberToAdd);
    const updatedRootEmployee = {...rootEmployee, items: [...obj]};
    setRootEmployee(updatedRootEmployee);
    if (typeof window !== 'undefined') localStorage.setItem('rootEmployee', JSON.stringify(updatedRootEmployee)); // Storing in localstorage
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label htmlFor="name">Employee Name: </label>
        <input placeholder="Employee Name" id="name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message as string}</span>}
      </div>

      <div>
        <label htmlFor="phone_number">Phone Number: </label>
        <input placeholder="Phone Number" id="phone_number" {...register('phone_number', { required: 'Phone number is required', validate: validatePhoneNumber })} />
        {errors.phone_number && <span>{errors.phone_number.message as string}</span>}
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input placeholder="Email" id="email" type = "email" {...register('email', { required: 'Email is required', validate: validateEmail })} />
        {errors.email && <span>{errors.email.message as string}</span>}
      </div>

      <div>
        <label htmlFor="position">Position:</label>
        {/* Storing name here but will change that to id */}
        <select id="position" {...register('position', { required: 'Position is required' })}>
          <option value={positions[4]}>
            {positions[4]}
          </option>
          <option value={positions[5]}>
            {positions[5]}
          </option>
        </select>
        {errors.position && <span>{errors.position.message as string}</span>}
      </div>

      <input type="submit" />
    </form>
  )
}
export default AddMemberPopUp