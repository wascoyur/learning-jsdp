import s from "./Card.module.css";
import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className={s.card}>{children}</div>;
};
