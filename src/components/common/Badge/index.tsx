import { Frame } from "@/atoms";
import { Body4 } from "@/atoms/Text";

interface BadgeProps {
  children: React.ReactNode;
  categoryID: number;
  onPress?: () => void;
  selectedCategoryId?: number | null;
}

const Badge = ({
  children,
  categoryID,
  onPress,
  selectedCategoryId,
}: BadgeProps) => {
  // 색상 생성 함수
  const generateColor = (index: number) => {
    // 기본 색상 (파란색 계열)
    const baseHue = 220;
    // 색상 간격 (골든 앵글: 137.5도)
    const hueStep = 137.5;
    // 채도
    const saturation = 70;
    // 밝기
    const lightness = 35;

    // index를 기반으로 색상 계산
    const hue = (baseHue + index * hueStep) % 360;

    return {
      main: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      bg: `hsl(${hue}, ${saturation}%, 95%)`,
      bgSelected: `hsl(${hue}, ${saturation}%, 90%)`
    };
  };

  const isSelected = selectedCategoryId === categoryID;
  const colors = generateColor(categoryID);

  return (
    <Frame 
      col 
      minW={100}
      bg={isSelected ? colors.bgSelected : colors.bg} 
      py={2} 
      px={4} 
      radius={4} 
      alignment="center" 
      onClick={onPress}
    >
      <Body4 fontColor={colors.main} numberOfLine="1">
        {children}
      </Body4>
    </Frame>
  );
};

export default Badge;
