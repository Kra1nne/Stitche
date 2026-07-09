import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

declare global {
  interface TabIconProps {
    focused: boolean;
    icon: ComponentType<SvgProps>;
  }
}

export { };

