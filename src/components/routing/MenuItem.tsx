// src/components/MenuItem.tsx

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: MenuItemProps) => {
  return (
    <li>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {label}
      </a>
    </li>
  );
};

export default MenuItem;
