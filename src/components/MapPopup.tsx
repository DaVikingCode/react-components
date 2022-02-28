import { Box, Card, CardActions, CardContent, Divider } from "@material-ui/core";
import React, { FC } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ResizeObserver, { SizeInfo } from "rc-resize-observer";

const PopupWrapper = styled(Card)<{ $isPhone: boolean; size: number[] }>`
  min-width: ${(p) => p.size[0]}px;
  max-width: ${(p) => p.size[1]}px;
  ${(p) =>
    p.$isPhone &&
    `
      position: fixed;
      bottom: 0;
      z-index: 1;
      border-radius: 1rem 1rem 0 0;
      
      & > div {
          width: 100vw;
          border-radius: 16px 16px 0 0;
      }
  `};
`;

const StyledBox = styled(Box)`
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-height: 600px) {
    max-height: 150px;
  }
  @media (min-height: 600px) {
    max-height: 350px;
  }
  @media (min-height: 720px) {
    max-height: 480px;
  }
  @media (min-height: 820px) {
    max-height: 650px;
  }
`;

export interface PopupProps {
  isPhone: boolean;
  isLoading: boolean;
  skeleton: React.ReactNode;
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  overlay: any;
  element: HTMLElement;
  sizeMinMax?: number[];
}

const MapPopup: FC<PopupProps> = ({
  isPhone,
  isLoading,
  skeleton,
  header,
  content,
  footer,
  overlay,
  element,
  sizeMinMax = [500, 750],
}) => {
  const resizer = (size: SizeInfo) => {
    overlay.setOffset([35, -size["height"] / 2]);
  };

  return ReactDOM.createPortal(
    isLoading ? (
      <ResizeObserver onResize={resizer}>
        <PopupWrapper $isPhone={isPhone} variant="outlined" size={sizeMinMax}>
          <CardContent>{skeleton}</CardContent>
          <Divider />
        </PopupWrapper>
      </ResizeObserver>
    ) : (
      <ResizeObserver onResize={resizer}>
        <PopupWrapper $isPhone={isPhone} variant="outlined" size={sizeMinMax}>
          <CardContent>{header}</CardContent>
          <Divider />
          <CardContent>
            <StyledBox>{content}</StyledBox>
          </CardContent>

          <Divider />
          <>
            <CardActions>{footer}</CardActions>
          </>
        </PopupWrapper>
      </ResizeObserver>
    ),
    isPhone ? document.body : element
  );
};

export const PopupMap = React.forwardRef(MapPopup);
export default PopupMap;
