import s from "./MediatorEmployee.module.scss";
import { useStorage } from "../../../storage/Storage.ts";
import { Card } from "../../../components/Card/Card.tsx";
import Mediator from "./EmployeeMediator";
import { Employee, Subscriber } from "../../../storage/types.ts";
import { useEffect, useState } from "react";

const dbName = "storage";

const EmployeeList = () => {
  const {
    getAllValue: storage,
    putValue,
    isDBConnecting,
    subscribe,
    unsubscribe,
  } = useStorage<Employee>(dbName, ["employees"]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isDBConnecting) {
        const employeesResult = await storage("employees");
        setEmployees(employeesResult);
      }
    };
    fetchData();
  }, [isDBConnecting]);

  const addConvertedItem = (item: Employee) => {
    putValue("employees", item);
  };

  useEffect(() => {
    const subscriber: Subscriber<Employee> = {
      update: (tableName: keyof Storage, data: Employee) => {
        if (tableName === "employees") {
          setEmployees((prevEmployees) => [...prevEmployees, data]);
        }
      },
    };

    subscribe(subscriber, "employees");

    return () => {
      unsubscribe(subscriber, "employees");
    };
  }, [subscribe, unsubscribe]);

  return (
    <Card>
      <h1>Pattern Mediator</h1>
      <p>Он же в экосистеме Реакт - "Container Component"</p>
      <div className={s.container}>
        <Mediator addItem={addConvertedItem} />
        <h2>Employees</h2>
        <ul className={s.employeeList}>
          {employees.map((employee) => (
            <li key={employee.id} className={s.employeeItem}>
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