import { Divider } from "@material-ui/core";
import React, { FC, ReactNodeArray } from "react";
import styled from "styled-components";
//@ts-ignore
import VirtualScroll from "react-dynamic-virtual-scroll";

const ActualResultListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    margin: 0;
  }
`;

const ActualResultList: FC<{ Results: React.ReactNodeArray }> = ({
  Results,
}) => (
  <ActualResultListWrapper>
    {/* {Results.map((Result, i) => (
      <li key={i}>
        {Result}
        <Divider />
      </li>
    ))} */}
    <VirtualScroll
      totalLength={Results.length}
      length="5"
      buffer="5"
      renderItem={(Results: ReactNodeArray, i: number) => {
        <li key={i}>{Results}</li>;
        <Divider />;
      }}
    />
  </ActualResultListWrapper>
);

export interface ResultListProps {
  children?: undefined;
  loading: boolean;
  Results: React.ReactNodeArray;
  LoadingSplash: React.ReactNode;
  NoResultSplash: React.ReactNode;
}

export const ResultList: FC<ResultListProps> = ({
  loading,
  LoadingSplash,
  NoResultSplash,
  Results,
}) => {
  if (loading) {
    return <>{LoadingSplash}</>;
  }
  return Results && Results.length > 0 ? (
    <ActualResultList Results={Results} />
  ) : (
    <>{NoResultSplash}</>
  );
};

export default ResultList;
