import { useEffect, useState } from "react";
import { useStorage } from "../../../storage/Storage.ts";
import s from "./MediatorEmployee.module.scss";
import { Employee } from "../../../storage/types.ts";

const dbName = "storage";

const MediatorSecondView = () => {
  const { getAllValue, subscribe, unsubscribe } = useStorage<Employee>(dbName, [
    "employees",
  ]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentEmployees, setCurrentEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (isSubscribed) {
      const fetchData = async () => {
        await getAllValue("employees").then((r) => setCurrentEmployees(r));
      };
      fetchData();
    }
  }, [subscribe, unsubscribe, isSubscribed]);

  const toggleSubscription = () => {
    setIsSubscribed((prev) => !prev);
  };

  return (
    <div className={s.container}>
      <h2>Second Mediator</h2>
      <button onClick={toggleSubscription}>
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>
      <ul className={s.employeeList}>
        {currentEmployees.map((employee) => (
          <li key={employee.name} className={s.employeeItem}>
            {employee.name} - {employee.role} - Manager: {employee.manager}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediatorSecondView;