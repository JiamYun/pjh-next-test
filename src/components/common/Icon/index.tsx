"use client";

import React, { useEffect, useMemo, useState } from "react";

import Vector from "@/atoms/Vector";
import { ResponsiveType, useResponsiveType } from "@/hooks";
import { colors } from "@/styles";
import { IconName, IconType } from "@/types/icons";

// 이 컴포넌트를 사용하려면 터미널에서 yarn generate-icon-types 명령어를 실행해야 합니다.
// you have to run yarn generate-icon-types command in your terminal to use this component.

export type IconSizeProp = {
  size?: number;
};

export type IconProps<T extends IconType> = IconSizeProp &
  Partial<Record<ResponsiveType, IconSizeProp>> & {
    type: T;
    name: IconName[T] | null;
    fill?: string;
    stroke?: string;
  };

function Icon<T extends IconType>({
  type,
  name,
  size,
  fill = colors.black,
  stroke,
  ...props
}: IconProps<T>) {
  const [IconComponent, setIconComponent] = useState<React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  > | null>(null);
  const { responsiveType } = useResponsiveType();

  useEffect(() => {
    const importIcon = async () => {
      try {
        const { default: ImportedIcon } = await import(
          `@/images/icons/${type}/${name}.svg`
        );
        setIconComponent(() => ImportedIcon);
      } catch (error) {
        console.error(`Failed to load image: ${type}/${name}, ${error}`);
        setIconComponent(null);
      }
    };

    importIcon();
  }, [type, name]);

  const getSize = useMemo(() => {
    const value = props[responsiveType]?.size;
    return value !== undefined ? value : size;
  }, [props, responsiveType, size]);

  if (!IconComponent) {
    return null;
  }

  return (
    <Vector
      src={IconComponent}
      stroke={stroke}
      fill={fill}
      width={getSize}
      height={getSize}
    />
  );
}

export default Icon;
