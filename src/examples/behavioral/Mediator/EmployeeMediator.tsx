import { useState } from "react";
import s from "./MediatorEmployee.module.scss";
import { Employee } from "../../../storage/types.ts";

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

export interface EmployeeMediatorProps {
  addItem: (newEmployee: Omit<Employee, "uid">) => void;
}

const EmployeeMediator = (props: EmployeeMediatorProps) => {
  const { addItem } = props;

  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  const handleAddEmployee = () => {
    const newEmployee: Omit<Employee, "uid"> = {
      name,
      role: selectedRole,
      manager: selectedManager,
    };
    addItem(newEmployee);
    setName("");
    setSelectedRole("");
    setSelectedManager("");
  };

  return (
    <div>
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
          <div className={s.roleList}>
            {roles.map((roleOption, index) => (
              <div
                key={index}
                className={`${s.roleItem} ${selectedRole === roleOption ? s.selectedRole : ""}`}
                onClick={() => setSelectedRole(roleOption)}
              >
                {roleOption}
              </div>
            ))}
          </div>
        </label>
      </div>
      <div>
        <label className={s.label}>
          Manager:
          <div className={s.managerList}>
            {managers.map((manager, index) => (
              <div
                key={index}
                className={`${s.managerItem} ${selectedManager === manager ? s.selectedManager : ""}`}
                onClick={() => setSelectedManager(manager)}
              >
                {manager}
              </div>
            ))}
          </div>
        </label>
      </div>
      <button
        type="button"
        className={s.button}
        onClick={handleAddEmployee}
        disabled={!name || !selectedRole || !selectedManager}
      >
        Add Employee
      </button>
    </div>
  );
};

export default EmployeeMediator;