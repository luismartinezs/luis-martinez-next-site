import { cn } from "lib/util";
import { createContext, useContext, useState } from "react";

type Context = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<Context>({
  activeTab: "",
  setActiveTab: () => {},
});

const TabsProvider = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: Context["activeTab"];
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
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
  tabId: Context["activeTab"];
}) => {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <button
      onClick={() => setActiveTab(tabId)}
      className={cn(
        activeTab === tabId
          ? "bg-primary-500 font-bold text-white"
          : "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        "rounded px-4 py-2"
      )}
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
  value: Context["activeTab"];
}) => {
  const { activeTab } = useTabs();
  const active = activeTab === value;

  return <div className={cn(active ? "block" : "hidden")}>{children}</div>;
};

const Tabs = {
  Provider: TabsProvider,
  Tab: TabButton,
  Panel: TabsPanel,
};

export default Tabs;
