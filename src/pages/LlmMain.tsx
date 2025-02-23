import { Outlet } from "react-router-dom";
import s from "./pages.module.css";

const LlmMain = () => (
  <div className={s.root}>
    <h2>Здесь все эксперименты с моделями</h2>

    <Outlet />
  </div>
);

export default LlmMain;