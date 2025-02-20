import { useEffect, useState, useRef } from "react";
import { Storage, Subscriber } from "./types";

const Database = {
  version: 1,
};

interface UseStorageResult<T> {
  getAllValue: (tableName: keyof Storage) => Promise<T[]>;
  putValue: (
    tableName: keyof Storage,
    value: object,
  ) => Promise<IDBValidKey | null>;

  isDBConnecting: boolean;
  subscribe: (subscriber: Subscriber<T>, tableName: keyof Storage) => void;
  unsubscribe: (subscriber: Subscriber<T>, tableName: keyof Storage) => void;
}

export const useStorage = <T>(
  databaseName: string,
  tableNames: (keyof Storage)[],
): UseStorageResult<T> => {
  const [db, setDB] = useState<IDBDatabase | null>(null);
  const [isDBConnecting, setIsDBConnecting] = useState<boolean>(true);
  const subscribersRef = useRef<Map<keyof Storage, Subscriber<T>[]>>(new Map());

  useEffect(() => {
    const initDB = () => {
      const request = indexedDB.open(databaseName, Database.version);

      request.onupgradeneeded = () => {
        const database = request.result;
        tableNames.forEach((tableName) => {
          if (!database.objectStoreNames.contains(tableName)) {
            database.createObjectStore(tableName, {
              autoIncrement: true,
              keyPath: "id",
            });
          }
        });
      };

      request.onsuccess = () => {
        setDB(request.result);
        setIsDBConnecting(false);
      };

      request.onerror = () => {
        console.error("Error initializing IndexedDB:", request.error);
        setIsDBConnecting(false);
      };
    };

    if (!db) {
      initDB();
    }
  }, [databaseName, tableNames, db]);

  const getTransaction = (
    tableName: keyof Storage,
    mode: IDBTransactionMode,
  ) => {
    if (!db) throw new Error("Database is not initialized");
    return db.transaction(tableName, mode).objectStore(tableName);
  };

  const getAllValue = async (tableName: keyof Storage): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      try {
        const store = getTransaction(tableName, "readonly");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as T[]);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  };

  const putValue = (
    tableName: keyof Storage,
    value: object,
  ): Promise<IDBValidKey | null> => {
    return new Promise((resolve, reject) => {
      try {
        const store = getTransaction(tableName, "readwrite");
        const request = store.put(value);
        request.onsuccess = () => {
          resolve(request.result);
          notifySubscribers(tableName, value);
        };
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  };

  const subscribe = (subscriber: Subscriber<T>, tableName: keyof Storage) => {
    subscribersRef.current.set(tableName, [
      ...(subscribersRef.current.get(tableName) || []),
      subscriber,
    ]);
  };

  const unsubscribe = (subscriber: Subscriber<T>, tableName: keyof Storage) => {
    subscribersRef.current.set(
      tableName,
      (subscribersRef.current.get(tableName) || []).filter(
        (s) => s !== subscriber,
      ),
    );
  };

  const notifySubscribers = (tableName: keyof Storage, data: unknown) => {
    const currentSubscribers = subscribersRef.current.get(tableName) || [];
    currentSubscribers.forEach((subscriber) =>
      subscriber.update(tableName, data as T),
    );
  };

  return {
    getAllValue,
    putValue,
    isDBConnecting,
    subscribe,
    unsubscribe,
  };
};