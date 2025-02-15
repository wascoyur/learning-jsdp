import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Topic = {
  uid: string;
  content: string;
  date: number;
  identifier: string;
  stockPrice: number;
};

type Store = {
  topics: Topic[];
};

export const useStore = () => {
  const [store, setStore] = useState<Store>({ topics: [] });

  const addTopic = (topic: Omit<Topic, "uid">) => {
    const newTopic: Topic = {
      ...topic,
      uid: uuidv4(),
    };
    setStore((prevStore) => ({
      topics: [...prevStore.topics, newTopic],
    }));
  };

  return { store, addTopic };
};
