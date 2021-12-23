import { mediaQuery } from "../hooks/media-query";
import React, { FC, ReactNode } from "react";
import { Divider, Typography } from "@material-ui/core";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  min-height: 48px;
`;

const SidebarWrapper = styled.aside<{ closed: boolean }>`
  display: flex;
  flex-direction: column;
  z-index: 2;
  background: white;
  height: 100%;
  overflow-x: hidden;
  transition: width 125ms ease-in;
  width: ${(p) => (p.closed ? "0px" : "320px")};
  box-shadow: ${(p) => (p.closed ? "" : "1px 0px 4px 1px #bbb")};

  /* Override so the sidebar takes all screen on mobile */
  ${(p) =>
    p.closed ? mediaQuery("sm")`width: 0px` : mediaQuery("sm")`width: 100vw`}
`;

export interface SidebarProps {
  open: boolean;
  title: string;
  searchBar?: ReactNode;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  children,
  title,
  searchBar,
  onClose,
  open = false,
  ...props
}) => {
  return (
    <SidebarWrapper closed={!open} {...props}>
      <Header>
        {searchBar}
        {title !== "" && (
          <>
            <Divider id="divideSearchBar" />
            <Typography variant="overline">{title}</Typography>
          </>
        )}
      </Header>

      <Divider />
      {children}
    </SidebarWrapper>
  );
};

export default Sidebar;
