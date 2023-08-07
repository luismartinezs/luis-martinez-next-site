import {
  useReducer,
  createContext,
  useContext,
  type PropsWithChildren,
  type Dispatch,
  useEffect,
  useState,
} from "react";

export interface IThemeContext {
  darkMode: boolean;
}

export interface IThemeAction {
  readonly type: "toggle-theme" | "set-theme";
  readonly payload?: boolean;
}

const STORAGE_KEY = "dark-mode";

export const ThemeContext = createContext<IThemeContext | null>(null);
export const ThemeDispatchContext =
  createContext<Dispatch<IThemeAction> | null>(null);

const initialTheme: Readonly<IThemeContext> = {
  darkMode: false,
};

function themeReducer(
  theme: Readonly<IThemeContext>,
  action: IThemeAction
): Readonly<IThemeContext> {
  switch (action.type) {
    case "toggle-theme": {
      return { darkMode: !theme.darkMode };
    }
    case "set-theme": {
      return { darkMode: !!action.payload };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (item) {
      dispatch({ type: "set-theme", payload: JSON.parse(item) as boolean });
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme.darkMode));
    }
  }, [isInitialized, theme]);

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

export function useThemeDispatch(): Dispatch<IThemeAction> {
  return useContext(ThemeDispatchContext) as Dispatch<IThemeAction>;
}

export default ThemeProvider;
