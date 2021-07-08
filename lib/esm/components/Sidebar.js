import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { mediaQuery } from "../hooks/media-query";
import { Divider, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components";
import AppIcon from "./AppIcon";
const Header = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
`;
const SidebarWrapper = styled.aside `
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
    ? mediaQuery('sm') `width: 0px`
    : mediaQuery('sm') `width: 100vw`}
`;
const Sidebar = ({ children, title, onClose, open = false, ...props }) => {
    return _jsxs(SidebarWrapper, Object.assign({ closed: !open }, props, { children: [_jsxs(Header, { children: [_jsx(Typography, Object.assign({ variant: "overline" }, { children: title }), void 0), _jsx(IconButton, Object.assign({ style: { width: '40px', height: '40px' }, size: "small", onClick: onClose() }, { children: _jsx(AppIcon, { name: 'chevron-left' }, void 0) }), void 0)] }, void 0), _jsx(Divider, {}, void 0), children] }), void 0);
};
export default Sidebar;
