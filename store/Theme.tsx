import * as React from "react";
import { useReducer, createContext, useContext } from "react";

export interface IThemeContext {
  darkMode: boolean;
}

export interface IThemeAction {
  readonly type: "toggle-theme";
}

export const ThemeContext = createContext<IThemeContext | null>(null);
export const ThemeDispatchContext =
  createContext<React.Dispatch<IThemeAction> | null>(null);

const initialTheme: Readonly<IThemeContext> = { darkMode: false };

function themeReducer(
  theme: Readonly<IThemeContext>,
  action: IThemeAction
): Readonly<IThemeContext> {
  switch (action.type) {
    case "toggle-theme": {
      return { darkMode: !theme.darkMode };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): Readonly<IThemeContext> {
  return useContext(ThemeContext) as Readonly<IThemeContext>;
}

export function useThemeDispatch(): React.Dispatch<IThemeAction> {
  return useContext(ThemeDispatchContext) as React.Dispatch<IThemeAction>;
}

export default ThemeProvider;
