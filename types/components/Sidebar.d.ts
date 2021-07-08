import { FC } from "react";
export interface SidebarProps {
    open: boolean;
    title: string;
    onClose: Function;
}
declare const Sidebar: FC<SidebarProps>;
export default Sidebar;
