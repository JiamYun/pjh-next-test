"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// 메뉴 항목의 타입 정의 수정
interface MenuItem {
  name: string;
  path: string;
  icon?: string;
  subItems?: MenuItem[];
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleItemClick = (path: string) => {
    router.push(path);
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const itemIsActive = isActive(item.path);

    return (
      <div key={item.path} className={`${depth > 0 ? "ml-4" : ""}`}>
        <div className="px-4">
          {" "}
          {/* 여기에 px-4 추가 */}
          <div
            className={`flex items-center p-2 my-1 cursor-pointer rounded-md transition-all duration-200 ${
              itemIsActive
                ? "bg-neutral-100 font-semibold"
                : "hover:bg-neutral-50"
            }`}
            onClick={() => handleItemClick(item.path)}
          >
            {item.icon && (
              <Image
                src={item.icon}
                alt={item.name}
                width={20}
                height={20}
                className="mr-3"
              />
            )}
            <span className={`text-sm text-black`}>{item.name}</span>
          </div>
        </div>
        {item.subItems && (
          <div className="mt-1">
            {item.subItems.map((subItem) => renderMenuItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="w-64 bg-white h-screen border-r border-neutral-200 pt-4">
      {menuItems.map((item) => renderMenuItem(item))}
    </nav>
  );
};

export default Sidebar;
