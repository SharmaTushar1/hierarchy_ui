// Edit PopUp component for Members and Leaders

import { useStore } from "@/app/store";
import { useForm } from "react-hook-form";
import { editObject } from "../lib/editObject";

const EditMember = ({itemToEdit}: {itemToEdit: Member}) => {
  const setRootEmployee = useStore(state => state.setRootEmployee);
  const rootEmployee = useStore(state => state.rootEmployee);

  const validatePhoneNumber = (value: string) => /^\d{10}$/.test(value) || 'Phone number must be 10 digits';
  const validateEmail = (value: string) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) || 'Invalid email';

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (memberData: any) => {
    const updatedMember:Member = {...itemToEdit, ...memberData}
    const obj = editObject(rootEmployee, itemToEdit, updatedMember);
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

        <input type="submit" />
      </form>
  )
}
export default EditMember