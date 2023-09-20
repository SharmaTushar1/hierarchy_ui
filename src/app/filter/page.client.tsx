'use client'

import { ChangeEvent, useState } from "react";
import { getEmployees } from "./lib/getEmployees";
import { useStore } from "../store";
import ShowItems from "./_components/ShowItems";

const PageClient = () => {

  const [value, setValue] = useState('');
  const [option, setOption] = useState('name');

  const rootEmployees = useStore(state => state.rootEmployee);
  const employeeCollector = [] as Employee[];
  getEmployees(rootEmployees, employeeCollector);

  const [filteredArray, setFilteredArray] = useState<Employee[]>([]);

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (option === 'name') {
      setFilteredArray(employeeCollector.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase())));
      console.log("filteredArray from inside the client=> ", filteredArray);
    } else if (option === 'phone') {
      setFilteredArray(employeeCollector.filter(item => item.phone_number.toLowerCase().includes(event.target.value.toLowerCase())));
    } else if (option === 'email') {
      setFilteredArray(employeeCollector.filter(item => item.email.toLowerCase().includes(event.target.value.toLowerCase())));
    }
  }

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
  }

  return (
    <div>
      <div>
        <label htmlFor="filter-name">Search User (by Name or Phone or Email): </label>
        <input type="text" id="filter-name" value={value} className="border-4 border-black" onChange={(event) => handleValueChange(event)} />
        <select name="option" value={option} onChange={(event) => handleOptionChange(event)} id="">
          <option value="name">Name</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </select>
      </div>
      <ShowItems array = {filteredArray} />
    </div>
  )
}
export default PageClient