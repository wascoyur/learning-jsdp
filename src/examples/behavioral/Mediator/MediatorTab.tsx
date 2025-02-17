import {
  createMediator,
  SubscribeFunction,
  PublishFunction,
} from "./MediatorTab.ts";
import s from "./MediatorEmployee.module.scss";
import { useEffect, useState } from "react";

export const SecondMediator = () => {
  const mediator = createMediator();

  return (
    <div className={s.container}>
      <p>Second implementation</p>
      <TabButton mediator={mediator} index={"left"} />
      <TabButton mediator={mediator} index={"right"} />
      <TabContent mediator={mediator} />
    </div>
  );
};

type TabButtonProps = {
  mediator: { publish: PublishFunction };
  index: string;
};

const TabButton = ({ mediator, index }: TabButtonProps) => (
  <button
    className={s.button}
    onClick={() => mediator.publish("tabChange", index)}
  >
    Tab {index}
  </button>
);

type TabContentProps = {
  mediator: { subscribe: SubscribeFunction };
};

const TabContent = ({ mediator }: TabContentProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    mediator.subscribe("tabChange", setActiveTab);
  }, [mediator]);

  return activeTab ? (
    <div className={s.tabContent}>Выбранная вкладка: {activeTab}</div>
  ) : (
    <div className={s.tabContent}>Выберите вкладку</div>
  );
};
