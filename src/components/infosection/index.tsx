import { Body2, Body4, Heading6 } from "@/atoms";
import Frame from "@/atoms/Frame";

interface InfoSectionProps {
  title?: string;
  icons: React.ReactNode[];
  contents: string[];
  border?: boolean;
  thickness?: number;
}

export default function InfoSection({
  title,
  icons,
  contents,
  border = true,
  thickness = 6,
}: InfoSectionProps) {
  if (icons.length !== contents.length) {
    return null;
  }

  return (
    <Frame col w="100%">
      {border && (
        <Frame
          col
          w="100%"
          h={thickness}
          stroke={{
            size: thickness,
            color: "#F0F0F0",
            perSide: ["top"],
          }}
        />
      )}
      <Frame px={20}>
        <Frame col flex={1} pt={32} pb={30}>
          {title && <Heading6>{title}</Heading6>}
          {contents.map((content, index) => (
            <Frame row w="100%" alignment="top" key={index} pt={10}>
              {icons[index]}
              <Body4 pl={icons[index] ? 8 : 0} pt={icons[index] ? 2 : 0}>
                {content}
              </Body4>
            </Frame>
          ))}
        </Frame>
      </Frame>
    </Frame>
  );
}
