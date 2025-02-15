import { useEffect } from "react";
import { Card } from "../../components/Card.tsx";
import { useStore } from "./store.ts";

const getCurrentTime = () => {
  const date = new Date();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear();
  const t = date.toLocaleTimeString().toLowerCase();

  return `${m}/${d}/${y} ${t}`;
};

export const Observer = () => {
  const { store, addTopic } = useStore();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      addTopic({
        content: "Apple made $5 billion",
        identifier: "APPL",
        stockPrice: 570.91,
        date: Date.now(),
      });
    }, 20000);

    const timer2 = setTimeout(() => {
      addTopic({
        content: "Microsoft made $20 million",
        identifier: "MSFT",
        stockPrice: 30.85,
        date: Date.now(),
      });
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [addTopic]);

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
            {store.topics.map((topic) => (
              <tr key={topic.uid}>
                <td>{topic.content}</td>
                <td>{topic.identifier}</td>
                <td>{topic.stockPrice.toFixed(2)}</td>
                <td>{new Date(topic.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="lastUpdated">Последнее обновление: {getCurrentTime()}</div>
      </div>
    </Card>
  );
};
