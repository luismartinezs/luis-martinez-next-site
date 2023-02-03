import { useEffect, type Dispatch } from "react";
import IconSun from "~icons/heroicons-outline/sun.jsx";
import IconMoon from "~icons/heroicons-outline/moon.jsx";

import {
  useTheme,
  useThemeDispatch,
  type IThemeContext,
  type IThemeAction,
} from "store/Theme";

import Styles from "./ThemeSwitch.module.css";

export default function ThemeSwitch(): JSX.Element {
  const theme: IThemeContext = useTheme();
  const dispatch: Dispatch<IThemeAction> = useThemeDispatch();

  function handleClick() {
    dispatch({
      type: "toggle-theme",
    });
  }

  useEffect(() => {
    const html = document.documentElement;
    if (theme?.darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={handleClick}
      type="button"
      role="switch"
      aria-checked={!!theme.darkMode}
      className={Styles.switch}
      aria-label="toggle theme"
    >
      <span aria-hidden="true" className={Styles.toggler}>
        {theme.darkMode ? (
          <IconMoon className={Styles.icon} />
        ) : (
          <IconSun className={Styles.icon} />
        )}
      </span>
    </button>
  );
}
