import { useEffect, useState } from "react";
import { Topic } from "./store.ts";

const getRandomPercentageChange = () => {
  return (Math.random() * 20 + 10) / 100;
};

const addAppleTopic = (
  addTopic: (topic: Omit<Topic, "uid">) => void,
  setAppleCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const stockPrice = 570.91 * (1 + getRandomPercentageChange());
  addTopic({
    content: "Apple made $5 billion",
    identifier: "APPL",
    stockPrice,
    date: Date.now(),
  });
  setAppleCount((prevCount) => prevCount + 1);
};

const addMicrosoftTopic = (addTopic: (topic: Omit<Topic, "uid">) => void) => {
  const stockPrice = 30.85 * (1 + getRandomPercentageChange());
  addTopic({
    content: "Microsoft made $20 million",
    identifier: "MSFT",
    stockPrice,
    date: Date.now(),
  });
};

const setupTimers = (
  addTopic: (topic: Omit<Topic, "uid">) => void,
  appleCount: number,
  setAppleCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const timer1 = setTimeout(() => {
    addAppleTopic(addTopic, setAppleCount);
    if (appleCount >= 3 && appleCount <= 6) {
      addMicrosoftTopic(addTopic);
    }
  }, 2000);

  const priceUpdateTimer = setInterval(() => {
    addAppleTopic(addTopic, setAppleCount);
    addMicrosoftTopic(addTopic);
  }, 30000);

  return () => {
    clearTimeout(timer1);
    clearInterval(priceUpdateTimer);
  };
};

export const useSimulateFetchData = (
  addTopic: (topic: Omit<Topic, "uid">) => void,
) => {
  const [appleCount, setAppleCount] = useState(0);

  useEffect(() => {
    return setupTimers(addTopic, appleCount, setAppleCount);
  }, [addTopic, appleCount]);
};
