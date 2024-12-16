import React from "react";
import {
  Switch as NextUISwitch,
  SwitchProps as NextUISwitchProps,
} from "@nextui-org/react";

export interface SwitchProps extends Omit<NextUISwitchProps, "onChange"> {
  onChange?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return <NextUISwitch onChange={handleChange} {...props} />;
};

export default Switch;
