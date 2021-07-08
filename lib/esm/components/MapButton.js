import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
const MapButtonWrapper = styled.button `
    box-shadow: 0px 0px 0px 1px var(--clr-grey-25, #d9dfe5);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: var(--clr-white, white);
    color: #4C5761;
    height: 40px;
    min-width: 40px;
    border-radius: 2px;
    & > * {
        font-size: 24px;
    }
    &:hover {
        background-color: var(--clr-light-grey-25, #e5e8eb);
    }
    &:active {
        background-color: var(--clr-light-grey-50, #cbd1d6);
    }
`;
const MapButton = React.forwardRef(({ children, tooltip, ...props }, ref) => {
    return _jsx(Tooltip, Object.assign({ title: tooltip, enterDelay: 200 }, { children: _jsx(MapButtonWrapper, Object.assign({ ref: ref }, props, { children: children }), void 0) }), void 0);
});
export default MapButton;
