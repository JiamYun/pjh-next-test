import React, { ReactNode, forwardRef } from "react";
import { Tabs as NextUITabs, Tab as NextUITab } from "@nextui-org/react";

export interface TabsProps {
  children?: ReactNode;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ children }, ref) => {
  return (
    <NextUITabs
      ref={ref}
      aria-label="Options"
      variant="underlined"
      fullWidth
      classNames={{
        tabList: "gap-0 w-full relative rounded-none p-0",
        // 탭 하단 선 스타일링
        cursor: "w-full bg-transparent",
        tab: "flex-1 px-0 h-12 border-b-2 data-[selected=true]:border-[#000000] data-[selected=false]:border-[#F0F0F0]",
        tabContent:
          "group-data-[selected=true]:text-[#000000] group-data-[selected=false]:text-[#959CAA] border-none",
        base: "w-full",
        panel: "w-full pt-4",
      }}
    >
      {children}
    </NextUITabs>
  );
});

const Tab = NextUITab;

Tabs.displayName = "Tabs";

export { Tabs, Tab };
