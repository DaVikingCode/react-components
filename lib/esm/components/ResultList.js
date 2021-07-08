import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Divider, Typography } from "@material-ui/core";
import styled from "styled-components";
import NoResultIcon from '../assets/no_result.svg';
import DataLoadingIcon from '../assets/data_loading.svg';
const SplashHintWrapper = styled.div `
    text-align: center;
    margin: 32px 16px;
`;
const SplashHint = ({ Img, headline, subline }) => _jsxs(SplashHintWrapper, { children: [Img, _jsx(Typography, Object.assign({ color: 'textPrimary', variant: 'body2' }, { children: headline }), void 0), _jsx(Typography, Object.assign({ color: 'textSecondary', variant: 'caption' }, { children: subline }), void 0)] }, void 0);
const ActualResultListWrapper = styled.ul `
    list-style: none;
    padding: 0;
    margin: 0;
`;
const ActualResultList = ({ Results }) => _jsx(ActualResultListWrapper, { children: Results.map((Result, i) => _jsxs("li", { children: [Result, _jsx(Divider, {}, void 0)] }, i)) }, void 0);
const ResultList = ({ loading, Results }) => {
    if (loading) {
        return _jsx(SplashHint, { Img: DataLoadingIcon, headline: 'Veuillez patienter...', subline: "Les données chargent." }, void 0);
    }
    return (Results && Results.length > 0)
        ? _jsx(ActualResultList, { Results: Results }, void 0)
        : _jsx(SplashHint, { Img: NoResultIcon, headline: 'Aucun résultat...', subline: "Peut être avec d'autre mot-clefs ?" }, void 0);
};
export default ResultList;
