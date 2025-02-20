import { useCallback, useEffect, useState, useRef } from "react";
import { Storage, Subscriber } from "./types";

const Database = {
  version: 1,
};

interface UseStorageResult {
  getValue: <T>(tableName: keyof Storage, id: number) => Promise<T | undefined>;
  getAllValue: <T>(tableName: keyof Storage) => Promise<T[]>;
  putValue: (
    tableName: keyof Storage,
    value: object,
  ) => Promise<IDBValidKey | null>;
  putBulkValue: (
    tableName: keyof Storage,
    values: object[],
  ) => Promise<unknown[]>;
  updateValue: (params: {
    tableName: keyof Storage;
    id: number;
    newItem: unknown;
  }) => void;
  deleteValue: (tableName: keyof Storage, id: number) => number | null;
  deleteAll: (tableName: keyof Storage) => void;
  isDBConnecting: boolean;
  subscribe: (subscriber: Subscriber, tableName: keyof Storage) => void;
  unsubscribe: (subscriber: Subscriber, tableName: keyof Storage) => void;
}

export const useStorage = (
  databaseName: string,
  tableNames: (keyof Storage)[],
): UseStorageResult => {
  const [db, setDB] = useState<IDBDatabase | null>(null);
  const [isDBConnecting, setIsDBConnecting] = useState<boolean>(true);
  const subscribersRef = useRef<Map<keyof Storage, Subscriber[]>>(new Map());

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

  const getValue = useCallback(
    async <T>(tableName: keyof Storage, id: number): Promise<T | undefined> => {
      return new Promise((resolve, reject) => {
        try {
          const store = getTransaction(tableName, "readonly");
          const request = store.get(id);
          request.onsuccess = () => resolve(request.result as T);
          request.onerror = () => reject(request.error);
        } catch (error) {
          reject(error);
        }
      });
    },
    [db],
  );

  const getAllValue = async <T>(tableName: keyof Storage): Promise<T[]> => {
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

  const putBulkValue = async (
    tableName: keyof Storage,
    values: object[],
  ): Promise<unknown[]> => {
    try {
      const store = getTransaction(tableName, "readwrite");
      values.forEach((value) => store.put(value));
      notifySubscribers(tableName, values);
      return getAllValue(tableName);
    } catch (error) {
      throw new Error("Bulk insert failed: " + error);
    }
  };

  const updateValue = ({
    tableName,
    id,
    newItem,
  }: {
    tableName: keyof Storage;
    id: number;
    newItem: unknown;
  }) => {
    try {
      const store = getTransaction(tableName, "readwrite");
      const request = store.get(id);
      request.onsuccess = () => {
        const data = request.result;
        const updatedItem = data ? { ...data, ...newItem } : { id, newItem };
        store.put(updatedItem);
        notifySubscribers(tableName, updatedItem);
      };
    } catch (error) {
      console.error("Update value failed: ", error);
    }
  };

  const deleteValue = (tableName: keyof Storage, id: number): number | null => {
    try {
      const store = getTransaction(tableName, "readwrite");
      store.delete(id);
      notifySubscribers(tableName, { id });
      return id;
    } catch (error) {
      console.error("Delete value failed: ", error);
      return null;
    }
  };

  const deleteAll = (tableName: keyof Storage) => {
    try {
      const store = getTransaction(tableName, "readwrite");
      store.clear();
      notifySubscribers(tableName, []);
    } catch (error) {
      console.error("Delete all values failed: ", error);
    }
  };

  const subscribe = (subscriber: Subscriber, tableName: keyof Storage) => {
    subscribersRef.current.set(tableName, [
      ...(subscribersRef.current.get(tableName) || []),
      subscriber,
    ]);
  };

  const unsubscribe = (subscriber: Subscriber, tableName: keyof Storage) => {
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
      subscriber.update(tableName, data),
    );
  };

  return {
    getValue,
    getAllValue,
    putValue,
    putBulkValue,
    updateValue,
    deleteValue,
    deleteAll,
    isDBConnecting,
    subscribe,
    unsubscribe,
  };
};