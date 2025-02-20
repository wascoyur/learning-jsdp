import s from "./MediatorEmployee.module.scss";
import { useStorage } from "../../../storage/Storage.ts";
import { Card } from "../../../components/Card/Card.tsx";
import Mediator from "./EmployeeMediator";
import { Employee } from "../../../storage/types.ts";
import { useEffect, useState } from "react";

const dbName = "storage";

const EmployeeList = () => {
  const { getAllValue, putValue, isDBConnecting } = useStorage(dbName, [
    "employees",
  ]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isDBConnecting) {
        const employeesResult = await getAllValue<Employee>("employees");
        setEmployees(employeesResult);
      }
    };
    fetchData();
  }, [isDBConnecting]);

  const pushToDbItem = (item: Omit<Employee, "uid">) => {
    putValue("employees", item);
  };

  return (
    <Card>
      <h1>Pattern Mediator</h1>
      <p>Он же в экосистеме Реакт - "Container Component"</p>
      <div className={s.container}>
        <Mediator addItem={pushToDbItem} />
        <h2>Employees</h2>
        <ul className={s.employeeList}>
          {employees.map((employee) => (
            <li key={employee.uid} className={s.employeeItem}>
              {employee.name} - {employee.role} - Manager: {employee.manager}
            </li>
          ))}
        </ul>
      </div>

      {/*<MediatorSecondView employees={employees} />*/}
    </Card>
  );
};

export default EmployeeList;