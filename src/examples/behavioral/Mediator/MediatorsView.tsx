import s from "./MediatorEmployee.module.scss";
import { useStorage } from "../../../storage/Storage.ts";
import { Card } from "../../../components/Card/Card.tsx";
import Mediator from "./EmployeeMediator";
import { Employee } from "../../../storage/types.ts";
import { useEffect, useState } from "react";

const dbName = "storage";

const EmployeeList = () => {
  const {
    getAllValue: storage,
    putValue,
    isDBConnecting,
  } = useStorage(dbName, ["employees"]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isDBConnecting) {
        const employeesResult = await storage<Employee>("employees");
        setEmployees(employeesResult);
      }
    };
    fetchData();
  }, [isDBConnecting]);

  const addConvertedItem = (item: Omit<Employee, "uid">) => {
    putValue("employees", item);
  };

  return (
    <Card>
      <h1>Pattern Mediator</h1>
      <p>Он же в экосистеме Реакт - "Container Component"</p>
      <div className={s.container}>
        <Mediator addItem={addConvertedItem} />
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