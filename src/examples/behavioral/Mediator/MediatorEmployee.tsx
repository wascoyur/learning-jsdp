import { useState } from "react";
import s from "./MediatorEmployee.module.scss";
import { Employee, useStore } from "../store.ts";

const EmployeeList = () => {
  const { store, addItem } = useStore();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleAddEmployee = () => {
    const newEmployee: Omit<Employee, "uid"> = {
      name,
      role,
      manager: "boss",
    };
    addItem(newEmployee, "employees");
    setName("");
    setRole("");
  };

  return (
    <div className={s.container}>
      <form
        className={s.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddEmployee();
        }}
      >
        <div>
          <label className={s.label}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={s.input}
            />
          </label>
        </div>
        <div>
          <label className={s.label}>
            Role:
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className={s.input}
            />
          </label>
        </div>
        <button type="submit" className={s.button}>
          Add Employee
        </button>
      </form>
      <h2>Employees</h2>
      <ul className={s.employeeList}>
        {store.employees.map((employee) => (
          <li key={employee.uid} className={s.employeeItem}>
            {employee.name} - {employee.role} - Manager: {employee.manager}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
