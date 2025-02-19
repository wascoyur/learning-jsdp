import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DBinteraction } from "./storage/interactionDB.ts";

const { initDB: initializeDB } = DBinteraction();

initializeDB("globalStorage")
  .then((r) => {
    console.debug(`DB ${r} initialized`);
  })
  .catch((error) => {
    console.error(`DB initialized Error ${error}`);
  });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
