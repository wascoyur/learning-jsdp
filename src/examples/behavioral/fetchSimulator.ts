import { useEffect, useState } from "react";
import { Storage } from "../../storage/Storage.ts";

const getRandomPercentageChange = () => {
  return (Math.random() * 20 + 10) / 100;
};

const addAppleTopic = (
  addTopic: <T extends { uid: string }>(
    item: Omit<T, "uid">,
    key: keyof Storage,
  ) => void,
  setAppleCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const stockPrice = 570.91 * (1 + getRandomPercentageChange());
  addTopic(
    {
      content: "Apple made $5 billion",
      identifier: "APPL",
      stockPrice,
      date: Date.now(),
    },
    "topics",
  );
  setAppleCount((prevCount) => prevCount + 1);
};

const addMicrosoftTopic = (
  addTopic: <T extends { uid: string }>(
    item: Omit<T, "uid">,
    key: keyof Storage,
  ) => void,
) => {
  const stockPrice = 30.85 * (1 + getRandomPercentageChange());
  addTopic(
    {
      content: "Microsoft made $20 million",
      identifier: "MSFT",
      stockPrice,
      date: Date.now(),
    },
    "topics",
  );
};

const setupTimers = (
  addTopic: <T extends { uid: string }>(
    item: Omit<T, "uid">,
    key: keyof Storage,
  ) => void,
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
  addTopic: <T extends { uid: string }>(
    item: Omit<T, "uid">,
    key: keyof Storage,
  ) => void,
) => {
  const [appleCount, setAppleCount] = useState(0);

  useEffect(() => {
    return setupTimers(addTopic, appleCount, setAppleCount);
  }, [addTopic, appleCount]);
};