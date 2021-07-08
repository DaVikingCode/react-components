import React, { FC } from "react";
export interface ResultListProps {
    children?: undefined;
    loading: boolean;
    Results: React.ReactNodeArray;
}
declare const ResultList: FC<ResultListProps>;
export default ResultList;
