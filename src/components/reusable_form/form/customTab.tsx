/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

type CustomTabsProps = {
  tabs?: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs: propTabs = [],
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  value,
  onChange,
}) => {
  const [active, setActive] = useState<Tab | null>(
    propTabs.find((t) => t.value === value) ?? propTabs[0] ?? null
  );

  useEffect(() => {
    if (value && propTabs.length > 0) {
      const matched = propTabs.find((t) => t.value === value);
      if (matched) {
        setActive(matched);
      }
    }
  }, [value, propTabs]);

  const handleTabChange = (idx: number) => {
    const selectedTab = propTabs[idx];
    if (!selectedTab) return;

    setActive(selectedTab);
    onChange?.(selectedTab.value);
  };

  if (propTabs.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No tabs available
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div
        className={cn(
          "w-full flex lg:ml-2 lg:justify-start lg:items-start gap-4 overflow-x-auto py-2 px-2 no-visible-scrollbar",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(idx)}
            className={cn(
              "relative px-4 py-2 rounded-full transition-all duration-200",
              tabClassName,
              active?.value === tab.value
                ? cn("bg-blue-200/50 dark:bg-zinc-800 font-semibold", activeTabClassName)
                : "hover:bg-gray-100 dark:hover:bg-zinc-700"
            )}
          >
            <span
              className={cn(
                "font-medium",
                active?.value === tab.value
                  ? "text-blue-700"
                  : "text-black dark:text-white"
              )}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div
        className={cn(
          "w-full mt-2 p-2 rounded-xl shadow-none",
          contentClassName
        )}
      >
        {active?.content ?? (
          <div className="text-gray-400 text-center py-4">No content</div>
        )}
      </div>
    </div>
  );
};
