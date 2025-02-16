import s from "./MediatorEmployee.module.scss";
import { useStore } from "../store.ts";
import { Card } from "../../../components/Card/Card.tsx";
import Mediator from "./EmployeeMediator";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

const SecondMediator = () => {
  const createMediator = () => {
    const subscribers: Record<
      string,
      Dispatch<SetStateAction<string | null>>[]
    > = {};

    return {
      subscribe: (
        event: string,
        callback: Dispatch<SetStateAction<string | null>>,
      ) => {
        if (!subscribers[event]) {
          subscribers[event] = [];
        }
        subscribers[event].push(callback);
      },
      publish: (event: string, data: string) => {
        subscribers[event]?.forEach((callback) => callback(data));
      },
    };
  };

  const mediator = createMediator();

  const TabButton = ({ index }: { index: string }) => (
    <button
      className={s.button}
      onClick={() => mediator.publish("tabChange", index)}
    >
      Tab {index}
    </button>
  );

  const TabContent = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
      return mediator.subscribe("tabChange", setActiveTab);
    }, []);

    return activeTab ? (
      <div className={s.tabContent}>Выбранная вкладка: {activeTab}</div>
    ) : (
      <div>Выберите вкладку</div>
    );
  };

  return (
    <div className={s.container}>
      <p>Second implementation</p>
      <TabButton index={"left"} />
      <TabButton index={"right"} />
      <TabContent />
    </div>
  );
};
