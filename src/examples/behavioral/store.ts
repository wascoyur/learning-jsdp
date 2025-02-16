import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Topic = {
  uid: string;
  content: string;
  identifier: string;
  stockPrice: number;
  date: number;
};

export type Store = {
  topics: Topic[];
};

let globalStore: Store = { topics: [] };

export const useStore = () => {
  const [store, setStore] = useState<Store>(globalStore);

  const addTopic = (topic: Omit<Topic, "uid">) => {
    const newTopic: Topic = { ...topic, uid: uuidv4() };
    globalStore = { topics: [...globalStore.topics, newTopic] };
    setStore(globalStore);
  };

  const initStore = () => {
    globalStore = { topics: [] };
    setStore(globalStore);
  };

  return { store, addTopic, initStore };
};
