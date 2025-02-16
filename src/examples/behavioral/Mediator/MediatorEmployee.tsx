import { useState } from "react";
import s from "./MediatorEmployee.module.scss";
import { Employee, useStore } from "../store.ts";
import { Card } from "../../../components/Card/Card.tsx";

const managers = ["Alice", "Bob", "Charlie", "David", "Eve"];
const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "QA Engineer",
  "DevOps Engineer",
  "Project Manager",
  "Business Analyst",
  "Marketing Specialist",
  "HR Manager",
];

const EmployeeList = () => {
  const { store, addItem } = useStore();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleAddEmployee = () => {
    const randomManager = managers[Math.floor(Math.random() * managers.length)];
    const newEmployee: Omit<Employee, "uid"> = {
      name,
      role,
      manager: randomManager,
    };
    addItem(newEmployee, "employees");
    setName("");
    setRole("");
  };

  return (
    <Card>
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
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className={s.input}
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((roleOption, index) => (
                  <option key={index} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
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
        <h2>Managers</h2>
        <div className={s.managerList}>
          {managers.map((manager, index) => (
            <div key={index} className={s.managerItem}>
              {manager}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EmployeeList;
