import { Divider, Typography } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";
import NoResultIcon from '../assets/no_result.svg';
import DataLoadingIcon from '../assets/data_loading.svg';

const SplashHintWrapper = styled.div`
    text-align: center;
    margin: 32px 16px;
`;

const SplashHint: FC<{ imgSrc: string, headline: string, subline: string }> = ({ imgSrc, headline, subline }) =>
    <SplashHintWrapper>
        <img src={imgSrc}></img>
        <Typography color='textPrimary' variant='body2'>{headline}</Typography>
        <Typography color='textSecondary' variant='caption'>{subline}</Typography>
    </SplashHintWrapper>

const ActualResultListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ActualResultList: FC<{ Results: React.ReactNodeArray }> = ({ Results }) => <ActualResultListWrapper>{
    Results.map((Result, i) => <li key={i}>
        {Result}
        <Divider />
    </li>)
}</ActualResultListWrapper>;

export interface ResultListProps {
    children?: undefined;
    loading: boolean;
    Results: React.ReactNodeArray;
}

const ResultList: FC<ResultListProps> = ({ loading, Results }) => {
    if (loading) {
        return <SplashHint imgSrc={DataLoadingIcon} headline={'Veuillez patienter...'} subline={"Les données chargent."} />;
    }
    return (Results && Results.length > 0)
        ? <ActualResultList Results={Results} />
        : <SplashHint imgSrc={NoResultIcon} headline={'Aucun résultat...'} subline={"Peut être avec d'autre mot-clefs ?"} />
};

export default ResultList;
