import { createScopedKeydownHandler } from "lib/createScopedKeydownHandler";
import { cn } from "lib/util";
import { createContext, useContext, useEffect, useState } from "react";

const config = {
  orientation: "horizontal",
} as const;

type Context = {
  value: string;
  setValue: (tab: string) => void;
};

const TabsContext = createContext<Context>({
  value: "",
  setValue: () => {},
});

const TabsProvider = ({
  children,
  defaultValue,
  tabValues,
}: {
  children: React.ReactNode;
  defaultValue: Context["value"];
  tabValues: string[];
}) => {
  const [value, setValue] = useState(defaultValue);

  function handleUpdate(value: string) {
    setValue(value);
    window.location.hash = value;
  }

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (tabValues.includes(hash)) {
      setValue(hash);
    }
  }, [tabValues]);

  return (
    <TabsContext.Provider value={{ value, setValue: handleUpdate }}>
      {children}
    </TabsContext.Provider>
  );
};

export function useTabs() {
  return useContext(TabsContext);
}

const TabButton = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Context["value"];
}) => {
  const ctx = useTabs();
  const isActive = ctx.value === value;

  return (
    <button
      role="tab"
      id={`${value}-tab`}
      onClick={() => ctx.setValue(value)}
      aria-controls={`${value}-panel`}
      aria-selected={isActive ? "true" : "false"}
      className={cn(
        isActive
          ? "border-b-4 border-primary-500"
          : "border-b-2 border-gray-200 dark:border-gray-700",
        "flex-1 px-3 py-2 text-sm dark:text-gray-200 sm:text-base md:px-4 md:py-2 md:text-xl"
      )}
      tabIndex={isActive || ctx.value === null ? 0 : -1}
      onKeyDown={createScopedKeydownHandler({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: true,
        loop: true,
        dir: "ltr",
        orientation: config.orientation,
      })}
    >
      {children}
    </button>
  );
};

const TabsPanel = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Context["value"];
}) => {
  const ctx = useTabs();
  const active = ctx.value === value;

  return (
    <div
      className={cn(active ? "block" : "hidden", "mt-2")}
      role="tabpanel"
      id={`${value}-panel`}
      aria-labelledby={`${value}-tab`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

const TabsList = ({
  children,
  labelId,
}: {
  children: React.ReactNode;
  labelId?: string;
}) => {
  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      role="tablist"
      aria-labelledby={labelId}
      aria-orientation={config.orientation}
    >
      {children}
    </div>
  );
};

const Tabs = {
  Provider: TabsProvider,
  Tab: TabButton,
  Panel: TabsPanel,
  List: TabsList,
};

export default Tabs;
