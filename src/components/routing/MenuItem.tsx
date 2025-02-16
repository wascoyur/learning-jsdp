// src/components/MenuItem.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

interface MenuItemProps {
  to: string;
  label: string;
  submenu?: { to: string; label: string }[];
}

const MenuItem = ({ to, label, submenu }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={styles.navItem}>
      <Link to={to} onClick={submenu ? toggleSubMenu : undefined}>
        {label}
      </Link>
      {submenu && isOpen && <SubMenu items={submenu} />}
    </li>
  );
};

export default MenuItem;

interface SubMenuProps {
  items: { to: string; label: string }[];
}

const SubMenu: React.FC<SubMenuProps> = ({ items }) => {
  return (
    <ul className={styles.subMenu}>
      {items.map((item, index) => (
        <li key={index} className={styles.subMenuItem}>
          <Link to={item.to}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};
