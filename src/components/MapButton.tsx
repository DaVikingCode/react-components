import { Tooltip } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const MapButtonWrapper = styled.button`
    --button-text-color: #4C5761;
    --button-border-color: var(--clr-grey-25, #d9dfe5);
    --button-background-color: var(--clr-white, white);
    --button-hovered-background-color: var(--clr-light-grey-25, #e5e8eb);
    --button-active-background-color: var(--clr-light-grey-50, #cbd1d6);

    box-shadow: 0px 0px 0px 1px var(--button-border-color);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    height: 40px;
    min-width: 40px;
    border-radius: 2px;
    
    & > * {
        font-size: 24px;
    }
    &:hover {
        background-color: var(--button-hovered-background-color);
    }
    &:active {
        background-color: var(--button-active-background-color);
    }
`;

export type MapButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    tooltip: string;
}

export const MapButton = React.forwardRef<HTMLButtonElement, MapButtonProps>(({ children, tooltip, ...props }, ref) => {
    return <Tooltip title={tooltip} enterDelay={200}>
        <MapButtonWrapper ref={ref} {...props}>
            {children}
        </MapButtonWrapper>
    </Tooltip>
});

export default MapButton;

