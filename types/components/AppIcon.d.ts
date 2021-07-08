import { IconProps as MdiIconProps } from "@material-ui/core";
import { FC } from "react";
declare type IconProps = {
    size?: string;
};
declare const AppIcon: FC<{
    name: string;
} & IconProps & MdiIconProps>;
export default AppIcon;
