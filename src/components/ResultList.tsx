import { Divider } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";

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
    {Results.map((Result, i) => (
      <li key={i}>
        {Result}
        <Divider />
      </li>
    ))}
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
