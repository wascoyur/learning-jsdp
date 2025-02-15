import { useState, useEffect } from "react";
import { Card } from "../../components/Card.tsx";

// PubSub implementation
class PubSub {
  private readonly topics: object;
  private subUid: number;
  constructor() {
    this.topics = {};
    this.subUid = -1;
  }

  publish(topic, args) {
    if (!this.topics[topic]) {
      return false;
    }

    const subscribers = this.topics[topic];
    let len = subscribers.length;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return this;
  }

  subscribe(topic, func) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    const token = (++this.subUid).toString();
    this.topics[topic].push({
      token,
      func,
    });
    return token;
  }

  unsubscribe(token) {
    for (const topic in this.topics) {
      if (this.topics.hasOwnProperty(topic)) {
        const subscribers = this.topics[topic];
        for (let i = 0; i < subscribers.length; i++) {
          if (subscribers[i].token === token) {
            subscribers.splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  }
}

const pubsub = new PubSub();

const getCurrentTime = () => {
  const date = new Date();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear();
  const t = date.toLocaleTimeString().toLowerCase();

  return `${m}/${d}/${y} ${t}`;
};

const Observer = () => {
  const [stockData, setStockData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(getCurrentTime());

  useEffect(() => {
    const subscriber = pubsub.subscribe("newDataAvailable", (topic, data) => {
      setStockData((prevData) => [...prevData, data]);
      setLastUpdated(getCurrentTime());
    });

    // Simulate publishing new stock data at regular intervals
    const timer1 = setTimeout(() => {
      pubsub.publish("newDataAvailable", {
        summary: "Apple made $5 billion",
        identifier: "APPL",
        stockPrice: 570.91,
      });
    }, 2000);

    const timer2 = setTimeout(() => {
      pubsub.publish("newDataAvailable", {
        summary: "Microsoft made $20 million",
        identifier: "MSFT",
        stockPrice: 30.85,
      });
    }, 4000);

    return () => {
      pubsub.unsubscribe(subscriber);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Card>
      <div>
        <h1>Stock Information App</h1>

        <table id="stockTable">
          <thead>
            <tr>
              <th>Summary</th>
              <th>Identifier</th>
              <th>Stock Price</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((data, index) => (
              <tr key={index}>
                <td>{data.summary}</td>
                <td>{data.identifier}</td>
                <td>{data.stockPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="lastUpdated">Last Updated: {lastUpdated}</div>
      </div>
    </Card>
  );
};

export default Observer;
