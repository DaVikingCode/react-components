import { jsx as _jsx } from "react/jsx-runtime";
import { Icon as MdiIcon } from "@material-ui/core";
import styled from "styled-components";
const Icon = styled(MdiIcon) `
    line-height: 100%;
    width: ${p => p.size};
    height: ${p => p.size};
    font-size: ${p => p.size};
`;
const AppIcon = ({ name, className, size = '24px', ...rest }) => _jsx(Icon, Object.assign({}, rest, { size: size, className: `${className} mdi mdi-${name}` }), void 0);
export default AppIcon;
