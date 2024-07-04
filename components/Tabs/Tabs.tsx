import { createScopedKeydownHandler } from "lib/createScopedKeydownHandler";
import { cn } from "lib/util";
import { createContext, useContext, useState } from "react";

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
}: {
  children: React.ReactNode;
  defaultValue: Context["value"];
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
};

export function useTabs() {
  return useContext(TabsContext);
}

const TabButton = ({
  children,
  tabId,
}: {
  children: React.ReactNode;
  tabId: Context["value"];
}) => {
  const ctx = useTabs();
  const isActive = ctx.value === tabId;

  return (
    <button
      role="tab"
      id={`${tabId}-tab`}
      onClick={() => ctx.setValue(tabId)}
      aria-controls={`${tabId}-panel`}
      aria-selected={isActive ? "true" : "false"}
      className={cn(
        isActive
          ? "bg-primary-500 font-bold text-white dark:bg-primary-400 dark:text-black"
          : "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        "rounded px-4 py-2"
      )}
      tabIndex={isActive || ctx.value === null ? 0 : -1}
      onKeyDown={createScopedKeydownHandler({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: true,
        loop: true,
        dir: "ltr",
        orientation: "horizontal",
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
      className={cn(active ? "block" : "hidden")}
      role="tabpanel"
      id={`${value}-panel`}
      aria-labelledby={`${value}-tab`}
    >
      {children}
    </div>
  );
};

const TabsList = ({
  children,
  labelId,
  orientation = "horizontal",
}: {
  children: React.ReactNode;
  labelId?: string;
  orientation?: "horizontal" | "vertical";
}) => {
  return (
    <div
      className="flex space-x-4"
      role="tablist"
      aria-labelledby={labelId}
      aria-orientation={orientation}
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
