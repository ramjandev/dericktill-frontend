import React from "react";

export interface TabItem<T> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

interface TabSwitcherProps<T> {
  tabs: TabItem<T>[];
  activeTab: T;
  setActiveTab: React.Dispatch<React.SetStateAction<T>>;
  onChange?: (id: T) => void;
  className?: string;
}

const TabSwitcher = <T,>({
  tabs,
  activeTab,
  setActiveTab,
  onChange,
  className = "",
}: TabSwitcherProps<T>) => {
  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={String(tab.id)}
          onClick={() => {
            setActiveTab(tab.id);
            onChange?.(tab.id);
          }}
          className={`flex items-center justify-center cursor-pointer gap-2 py-3 text-base font-semibold transition-all rounded-[10px] border border-white ${
            activeTab === tab.id
              ? " bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]"
              : " text-white "
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
