// Add Member component. This will be triggered when user clicks the Add Member button and is the only thing visible in the app when it is loaded at first i.e. when the employees array is empty.
// This will be used for adding CEO and head of employees as the have similar data structure.

import { useStore } from "@/app/store";
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const AddHeadOrCeoPopUp = ({parent}: {parent: null | CEO | Head}) => {

  const positions = useStore(state => state.positions);
  const setRootEmployee = useStore(state => state.setRootEmployee);
  const rootEmployee = useStore(state => state.rootEmployee);

  const { register, handleSubmit, formState: { errors } } = useForm();


  const validatePhoneNumber = (value: string) => /^\d{10}$/.test(value) || 'Phone number must be 10 digits';
  const validateEmail = (value: string) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) || 'Invalid email';


  const onSubmit = (employeeData: any) => {
    let updatedRootEmployee = {...rootEmployee};
    if (employeeData.position === 'CEO') {
        updatedRootEmployee = {id: uuidv4(), ...employeeData, items: []};
    } else {
      const headEmployee = {id: uuidv4(), ...employeeData, items: []};
      updatedRootEmployee.items.push(headEmployee);
    }
    setRootEmployee(updatedRootEmployee);
    localStorage.setItem('rootEmployee', JSON.stringify(updatedRootEmployee)); // Storing in localstorage
  };

  const DropDown = () => {
    if (parent === null) { // if parent is null
      return <select id="position" {...register('position', { required: 'Position is required' })}>
      <option value={positions[0]}>
        {positions[0]}
      </option>
    </select>
    } else if (parent.position === 'CEO') { // if parent is CEO
      return <select id="position" {...register('position', { required: 'Position is required' })}>
        <option value={positions[1]}>
          {positions[1]}
        </option>
        <option value={positions[2]}>
          {positions[2]}
        </option>
        <option value={positions[3]}>
          {positions[3]}
        </option>
      </select>
    }
  }

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
        <DropDown />
        {errors.position && <span>{errors.position.message as string}</span>}
      </div>

      <input type="submit" />
    </form>
  )
}


export default AddHeadOrCeoPopUp