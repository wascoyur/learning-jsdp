import { Employee, useStore } from "../store.ts";

const EmployeeList = () => {
  const { store, addItem } = useStore();

  const handleAddEmployee = () => {
    const newEmployee: Omit<Employee, "uid"> = {
      name: "worker",
      role: "stuff",
      manager: "boss",
    };
    addItem(newEmployee, "employees");
  };

  return (
    <div>
      <button onClick={handleAddEmployee}>Add Employee</button>
      <h2>Employees</h2>
      <ul>
        {store.employees.map((employee) => (
          <li key={employee.uid}>
            {employee.name} - {employee.role} - Manager: {employee.manager}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
