import { useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isCreationalOpen, setIsCreationalOpen] = useState(false);
  const [isStructuralOpen, setIsStructuralOpen] = useState(false);
  const [isBehavioralOpen, setIsBehavioralOpen] = useState(false);

  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <a href="/">Домой</a>
        </li>
        <li className={styles.dropdown}>
          <a href="#" onClick={() => setIsCreationalOpen(!isCreationalOpen)}>
            Порождающие паттерны
          </a>
          {isCreationalOpen && (
            <ul className={styles.dropdownContent}>
              <li>
                <a href="/creational/singleton">Singleton</a>
              </li>
              <li>
                <a href="/creational/factory">Factory</a>
              </li>
              <li>
                <a href="/creational/abstract-factory">Abstract Factory</a>
              </li>
              {/* Добавьте больше порождающих паттернов по необходимости */}
            </ul>
          )}
        </li>
        <li className={styles.dropdown}>
          <a href="#" onClick={() => setIsStructuralOpen(!isStructuralOpen)}>
            Структурные паттерны
          </a>
          {isStructuralOpen && (
            <ul className={styles.dropdownContent}>
              <li>
                <a href="/structural/adapter">Adapter</a>
              </li>
              <li>
                <a href="/structural/decorator">Decorator</a>
              </li>
              <li>
                <a href="/structural/facade">Facade</a>
              </li>
              {/* Добавьте больше структурных паттернов по необходимости */}
            </ul>
          )}
        </li>
        <li className={styles.dropdown}>
          <a href="#" onClick={() => setIsBehavioralOpen(!isBehavioralOpen)}>
            Поведенческие паттерны
          </a>
          {isBehavioralOpen && (
            <ul className={styles.dropdownContent}>
              <li>
                <a href="/behavioral/observer">Observer</a>
              </li>
              <li>
                <a href="/behavioral/strategy">Strategy</a>
              </li>
              <li>
                <a href="/behavioral/command">Command</a>
              </li>
              {/* Добавьте больше поведенческих паттернов по необходимости */}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
