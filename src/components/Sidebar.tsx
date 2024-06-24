import React, { FC, ReactNode } from "react";
import { Divider, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components";
import { AppIcon } from "./AppIcon";

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	min-height: 62px;
`;

const SidebarWrapper = styled.aside<{ closed: boolean; isPhone: boolean }>`
	display: flex;
	flex-direction: column;
	z-index: 2;
	background: white;
	height: 100%;
	overflow-x: hidden;
	transition: width 125ms ease-in;
	${(p) => {
		if (!p.closed) {
			return p.isPhone ? `width: 100vw;` : `width: 340px;`;
		} else {
			return `width: 0px;`;
		}
	}}
	box-shadow: ${(p) => (p.closed ? "" : "1px 0px 4px 1px #bbb")};
`;

export interface SidebarProps {
	open: boolean;
	title: string;
	searchBar?: ReactNode;
	isPhone: boolean;
	onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
	children,
	title,
	searchBar,
	onClose,
	isPhone,
	open = false,
	...props
}) => {
	return (
		<SidebarWrapper closed={!open} isPhone={isPhone} {...props}>
			<Header>
				{searchBar}
				{title !== "" && (
					<>
						<Divider id="divideSearchBar" />
						<Typography variant="overline">{title}</Typography>
					</>
				)}
				{isPhone && open && (
					<IconButton
						style={{ width: "40px", height: "40px" }}
						size="small"
						onClick={onClose}
					>
						<AppIcon name="chevron-left" />
					</IconButton>
				)}
			</Header>

			<Divider />
			{children}
		</SidebarWrapper>
	);
};

export default Sidebar;
