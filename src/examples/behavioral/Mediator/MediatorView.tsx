import s from "./MediatorEmployee.module.scss";
import { useStore } from "../store.ts";
import { Card } from "../../../components/Card/Card.tsx";
import Mediator from "./EmployeeMediator";

import { SecondMediator } from "./MediatorTab.tsx";

const EmployeeList = () => {
  const { store, addItem } = useStore();
  return (
    <Card>
      <h1>Pattern Mediator</h1>
      <p>Он же в экосистеме Реакт - "Container Component"</p>
      <div className={s.container}>
        <Mediator addItem={addItem} />
        <h2>Employees</h2>
        <ul className={s.employeeList}>
          {store.employees.map((employee) => (
            <li key={employee.uid} className={s.employeeItem}>
              {employee.name} - {employee.role} - Manager: {employee.manager}
            </li>
          ))}
        </ul>
      </div>

      <SecondMediator />
    </Card>
  );
};

export default EmployeeList;
