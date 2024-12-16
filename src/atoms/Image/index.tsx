import React from "react";
import {
  Image as NextUIImage,
  ImageProps as NextUIImageProps,
} from "@nextui-org/react";

export type ImageProps = NextUIImageProps;

export const Image: React.FC<ImageProps> = (props) => {
  return <NextUIImage {...props} />;
};

export default Image;
