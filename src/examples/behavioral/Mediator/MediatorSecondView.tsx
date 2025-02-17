import { useEffect, useState } from "react";
import { Store } from "../store.ts";
import s from "./MediatorEmployee.module.scss";

const MediatorSecondView = (store: Pick<Store, "employees">) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentEmployees, setCurrentEmployees] = useState(store.employees);

  useEffect(() => {
    if (isSubscribed) {
      setCurrentEmployees(store.employees);
    }
  }, [store, isSubscribed]);

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
          <li key={employee.uid} className={s.employeeItem}>
            {employee.name} - {employee.role} - Manager: {employee.manager}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediatorSecondView;
