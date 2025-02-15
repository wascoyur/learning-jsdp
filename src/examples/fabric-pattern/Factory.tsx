import s from "./Factory.module.css";
import cn from "classnames";

type FactoryProps = "black" | "white";
const ThemeFactory = (theme: FactoryProps) => {
  /*if (theme === "black") */ {
    return {
      createButton: () => (
        <button
          className={cn(
            s.button,
            theme === "black" ? s.buttonBlack : s.buttonBlack,
          )}
        >
          Dark Button
        </button>
      ),
      createInput: () => <input className={s.inputBlack} />,
    };
  } /*else {
    return {
      createButton: () => (
        <button className={s.buttonLight}>Light Button</button>
      ),
      createInput: () => <input className={s.inputLight} />,
    };
  }*/
};

export const ThemedComponent = ({
  theme,
}: {
  theme: ReturnType<typeof ThemeFactory>;
}) => {
  const Button = theme.createButton();
  const Input = theme.createInput();

  return (
    <div>
      {Button}
      {Input}
    </div>
  );
};

const Factory = () => (
  <div className="card">
    <h2>Factory</h2>
    <h3>Factory Pattern Example</h3>
    <ThemedComponent theme={ThemeFactory("black")} />
    {/*<ThemedComponent theme={ThemeFactory("white")} />*/}
  </div>
);

export default Factory;
