export const ThemeFactory = {
  createButton: () => {},
  createInput: () => {},
};

export const DarkTheme = {
  createButton: () => (
    <button style={{ background: "black", color: "white" }}>Dark Button</button>
  ),
  createInput: () => <input style={{ background: "black", color: "white" }} />,
};

export const LightTheme = {
  createButton: () => (
    <button style={{ background: "white", color: "black" }}>
      Light Button
    </button>
  ),
  createInput: () => <input style={{ background: "white", color: "black" }} />,
};

export const ThemedComponent = ({ theme }) => {
  const Button = theme.createButton();
  const Input = theme.createInput();

  return (
    <div>
      {Button}
      {Input}
    </div>
  );
};
