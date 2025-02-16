import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Employee = {
  uid: string;
  name: string;
  role: string;
  manager: string;
};

export type Topic = {
  uid: string;
  content: string;
  identifier: string;
  stockPrice: number;
  date: number;
};

export type Store = {
  employees: Employee[];
  topics: Topic[];
};

let globalStore: Store = { employees: [], topics: [] };

export const useStore = () => {
  const [store, setStore] = useState<Store>(globalStore);

  const addItem = <T extends { uid: string }>(
    item: Omit<T, "uid">,
    key: keyof Store,
  ) => {
    const newItem = { ...item, uid: uuidv4() };
    globalStore = {
      ...globalStore,
      [key]: [...globalStore[key], newItem],
    };
    setStore(globalStore);
  };

  const initStore = () => {
    globalStore = { employees: [], topics: [] };
    setStore(globalStore);
  };

  return { store, addItem, initStore };
};
