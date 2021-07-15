import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";

const SplashHintWrapper = styled.div`
    text-align: center;
    margin: 32px 16px;
`;

export interface SplashHintProps {
    Img: React.ReactNode; 
    headline: string; 
    subline: string;
}

export const SplashHint: FC<SplashHintProps>
    = ({ Img, headline, subline }) => (
        <SplashHintWrapper>
            {Img}
            <Typography color='textPrimary' variant='body2'>{headline}</Typography>
            <Typography color='textSecondary' variant='caption'>{subline}</Typography>
        </SplashHintWrapper>
    );

export default SplashHint;