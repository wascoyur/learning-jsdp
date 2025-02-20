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