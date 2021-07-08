import { Icon as MdiIcon, IconProps as MdiIconProps } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";

type IconProps = {
    size?: string;
};

const Icon = styled(MdiIcon)<IconProps>`
    line-height: 100%;
    width: ${p => p.size};
    height: ${p => p.size};
    font-size: ${p => p.size};
`;

const AppIcon: FC<{ name: string } & IconProps & MdiIconProps>
    = ({ name, className, size = '24px', ...rest }) =>
        <Icon
            {...rest}
            size={size}
            className={`${className} mdi mdi-${name}`}
        />;

export default AppIcon;