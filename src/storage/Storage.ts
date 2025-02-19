import { useState, useEffect } from "react";
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

export type Storage = {
  employees: Employee[];
  topics: Topic[];
};

let globalStore: Storage = { employees: [], topics: [] };
let subscribers: ((store: Storage) => void)[] = [];

export const useStore = () => {
  const [store, setStore] = useState<Storage>(globalStore);

  useEffect(() => {
    const handleStoreUpdate = (updatedStore: Storage) => {
      setStore(updatedStore);
    };

    subscribers.push(handleStoreUpdate);

    return () => {
      subscribers = subscribers.filter((sub) => sub !== handleStoreUpdate);
    };
  }, []);

  const addItem = <T extends { uid: string }>(
    item: Omit<T, "uid">,
    key: keyof Storage,
  ) => {
    const newItem = { ...item, uid: uuidv4() };
    globalStore = {
      ...globalStore,
      [key]: [...globalStore[key], newItem],
    };
    notifySubscribers();
  };

  const initStore = () => {
    globalStore = { employees: [], topics: [] };
    setStore(globalStore);
    notifySubscribers();
  };

  const subscribe = (callback: (store: Storage) => void) => {
    subscribers.push(callback);
  };

  const unsubscribe = (callback: (store: Storage) => void) => {
    subscribers = subscribers.filter((sub) => sub !== callback);
  };

  const notifySubscribers = () => {
    subscribers.forEach((callback) => callback(globalStore));
  };

  return { store, addItem, initStore, subscribe, unsubscribe };
};