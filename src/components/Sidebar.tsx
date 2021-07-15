import { mediaQuery } from "../hooks/media-query";
import { FC } from "react"
import { Divider, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components";

import AppIcon from "./AppIcon";

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
`;

const SidebarWrapper = styled.aside<{ closed: boolean }>`
    display: flex;
    flex-direction: column;
    z-index: 2;
    background: white;
    height: 100%;
    overflow-x: hidden;
    transition: width 125ms ease-in;
    width: ${p => p.closed ? '0px' : '320px'};
    box-shadow: ${p => p.closed ? '' : '1px 0px 4px 1px #bbb'};

    /* Override so the sidebar takes all screen on mobile */
    ${p => p.closed 
        ? mediaQuery('sm')`width: 0px`
        : mediaQuery('sm')`width: 100vw`
    }
`;

export interface SidebarProps {
    open: boolean;
    title: string;
    onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ children, title, onClose, open = false, ...props }) => {
    return <SidebarWrapper closed={!open} {...props}>
        <Header>
            <Typography variant="overline">
                {title}
            </Typography>
            <IconButton
                style={{ width: '40px', height: '40px' }}
                size="small"
                onClick={onClose}
            >
                <AppIcon name='chevron-left' />
            </IconButton>
        </Header>

        <Divider />
        {children}
    </SidebarWrapper>
}

export default Sidebar;