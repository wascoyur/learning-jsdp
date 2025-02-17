import { Dispatch, SetStateAction } from "react";

type EventCallback = Dispatch<SetStateAction<string | null>>;
type Subscribers = Record<string, EventCallback[]>;

export type SubscribeFunction = (
  event: string,
  callback: EventCallback,
) => void;
export type PublishFunction = (event: string, data: string) => void;

export const createMediator = (): {
  subscribe: SubscribeFunction;
  publish: PublishFunction;
} => {
  const subscribers: Subscribers = {};

  const subscribe: SubscribeFunction = (event, callback) => {
    if (!subscribers[event]) {
      subscribers[event] = [];
    }
    subscribers[event].push(callback);
  };

  const publish: PublishFunction = (event, data) => {
    subscribers[event]?.forEach((callback) => callback(data));
  };

  return {
    subscribe,
    publish,
  };
};
