import NavItem from "./MenuItem.tsx";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <NavItem to="/" label="Домой" />
        <NavItem
          to="/creational"
          label="Порождающие паттерны"
          submenu={[
            { to: "/creational/singleton", label: "Singleton" },
            { to: "/creational/factory", label: "Factory" },
            { to: "/creational/abstract-factory", label: "Abstract Factory" },
          ]}
        />
        <NavItem
          to="/structural"
          label="Структурные паттерны"
          submenu={[
            { to: "/structural/adapter", label: "Adapter" },
            { to: "/structural/decorator", label: "Decorator" },
            { to: "/structural/facade", label: "Facade" },
          ]}
        />
        <NavItem
          to="/behavioral"
          label="Поведенческие паттерны"
          submenu={[
            { to: "/behavioral/observer", label: "Observer" },
            { to: "/behavioral/strategy", label: "Strategy" },
            { to: "/behavioral/command", label: "Command" },
          ]}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
