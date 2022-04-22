import { useEffect } from "react";
import {
  useTheme,
  useThemeDispatch,
  type IThemeContext,
  type IThemeAction,
} from "store/Theme";
import IconSun from "~icons/heroicons-outline/sun.jsx";
import IconMoon from "~icons/heroicons-outline/moon.jsx";

export default function ThemeSwitch(): JSX.Element {
  const theme: IThemeContext = useTheme();
  const dispatch: React.Dispatch<IThemeAction> = useThemeDispatch();

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
      aria-checked={!theme.darkMode}
      className="switch theme-switch"
      aria-label="toggle theme"
    >
      <span aria-hidden="true">
        {theme.darkMode ? <IconMoon /> : <IconSun />}
      </span>
    </button>
  );
}
