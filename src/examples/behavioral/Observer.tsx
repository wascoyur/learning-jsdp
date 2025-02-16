import { useEffect, useState } from "react";
import { Card } from "../../components/Card.tsx";
import { useStore } from "./store.ts";
import { useSimulateFetchData } from "./fetchSimulator.ts";

const getCurrentTime = () => {
  const date = new Date();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear();
  const t = date.toLocaleTimeString().toLowerCase();

  return `${m}/${d}/${y} ${t}`;
};

export const Observer = () => {
  const { store, initStore, addTopic } = useStore();
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);

  useEffect(() => {
    if (!isStoreInitialized) {
      initStore();
      setIsStoreInitialized(true);
    }
  }, [isStoreInitialized, initStore]);

  useSimulateFetchData(addTopic);

  return (
    <Card>
      <div>
        <h1>Приложение для информации о акциях</h1>

        <table id="stockTable">
          <thead>
            <tr>
              <th>Сводка</th>
              <th>Идентификатор</th>
              <th>Цена акции</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {store.topics.length > 0 ? (
              store.topics.map((topic) => (
                <tr key={topic.uid}>
                  <td>{topic.content}</td>
                  <td>{topic.identifier}</td>
                  <td>{topic.stockPrice.toFixed(2)}</td>
                  <td>{new Date(topic.date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>

        <div id="lastUpdated">Последнее обновление: {getCurrentTime()}</div>
      </div>
    </Card>
  );
};
