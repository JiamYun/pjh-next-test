import { UseFontStyleProps } from "../useFontStyle";

type TypographySize =
  | "Heading1"
  | "Heading2"
  | "Heading3"
  | "Heading4"
  | "Heading5"
  | "Heading6"
  | "Body1"
  | "Body2"
  | "Body3"
  | "Body4"
  | "Body5"
  | "Body6"
  | "Link1"
  | "Link2"
  | "Link3";
type TypographyKeyType = UseFontStyleProps;

const typography: Record<TypographySize, TypographyKeyType> = {
  Heading1: {
    fontSize: "48px",
    lineHeight: "58px",
    fontWeight: "700",
  },
  Heading2: {
    fontSize: "36px",
    lineHeight: "48px",
    fontWeight: "700",
  },
  Heading3: {
    fontSize: "30px",
    lineHeight: "38px",
    fontWeight: "700",
  },
  Heading4: {
    fontSize: "24px",
    lineHeight: "34px",
    fontWeight: "700",
  },
  Heading5: {
    fontSize: "20px",
    lineHeight: "30px",
    fontWeight: "700",
  },
  Heading6: {
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: "700",
  },
  Body1: {
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: "400",
  },
  Body2: {
    fontSize: "16px",
    lineHeight: "26px",
    fontWeight: "400",
  },
  Body3: {
    fontSize: "14px",
    lineHeight: "22px",
    fontWeight: "400",
  },
  Body4: {
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: "400",
  },
  Body5: {
    fontSize: "10px",
    lineHeight: "16px",
    fontWeight: "400",
  },
  Body6: {
    fontSize: "8px",
    lineHeight: "12px",
    fontWeight: "400",
  },
  Link1: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "400",
    underline: true,
    underlineOffset: 2,
  },
  Link2: {
    fontSize: "14px",
    lineHeight: "22px",
    fontWeight: "400",
    underline: true,
    underlineOffset: 2,
  },
  Link3: {
    fontSize: "24px",
    lineHeight: "34px",
    fontWeight: "400",
    underline: true,
    underlineOffset: 2,
  },
};

export default typography;
