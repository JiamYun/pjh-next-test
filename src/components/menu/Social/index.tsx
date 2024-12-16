import React from "react";
import { Frame, Image } from "@/atoms";

interface SocialLink {
  id: string;
  icon: string;
  url: string;
  alt: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  onLinkClick: (url: string) => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, onLinkClick }) => {
  return (
    <Frame
      row
      w="100%"
      alignment="center"
      gap={20}
      py={20}
      position="fixed"
      bottom={0}
      bg="white"
      stroke={{ size: 1, color: "#F0F0F0", perSide: ["top"] }}
    >
      {links.map((link) => (
        <Frame
          row
          key={link.id}
          onClick={() => onLinkClick(link.url)}
          alignment="center"
        >
          <Image
            src={`/images/menu/${link.icon}.png`}
            alt={link.alt}
            width={22}
            height={22}
            radius="full"
          />
        </Frame>
      ))}
    </Frame>
  );
};

export default SocialLinks;
