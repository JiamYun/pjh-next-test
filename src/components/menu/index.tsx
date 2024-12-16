import React from "react";
import { Body4, Frame } from "@/atoms";
import { Icon } from "@/components";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  url?: string;
  onClick?: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuProps {
  sections: MenuSection[];
  onItemClick: (item: MenuItem) => void;
}

const MenuSection: React.FC<{
  section: MenuSection;
  onItemClick: (item: MenuItem) => void;
}> = ({ section, onItemClick }) => {
  return (
    <Frame col w="100%" py={12}>
      {section.title && (
        <Frame px={20} pb={12}>
          <Body4>{section.title}</Body4>
        </Frame>
      )}
      {section.items.map((item) => (
        <Frame
          key={item.id}
          row
          w="100%"
          px={20}
          py={12}
          onClick={() => onItemClick(item)}
        >
          {/* <Icon type="menu" name={item.icon} size={24} /> */}
          <Body4 pl={12}>{item.label}</Body4>
        </Frame>
      ))}
    </Frame>
  );
};

const Menu: React.FC<MenuProps> = ({ sections, onItemClick }) => {
  return (
    <Frame
      col
      w="100%"
      stroke={{ size: 1, color: "#F0F0F0", perSide: ["top"] }}
    >
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <MenuSection section={section} onItemClick={onItemClick} />
          {index < sections.length - 1 && <Frame w="100%" h={1} bg="#F0F0F0" />}
        </React.Fragment>
      ))}
    </Frame>
  );
};

export default Menu;
