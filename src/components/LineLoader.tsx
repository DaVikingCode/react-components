import React, { FC } from "react";
import { LinearProgress, createStyles, withStyles } from "@material-ui/core";

interface LoaderProps {
  show: (value: boolean) => void;
}

const StyledLinear = withStyles(() =>
  createStyles({
    root: {
      marginTop: "-1px",
      zIndex: 1000,
    },
    colorPrimary: {
      backgroundColor: "var(--clr-primary)",
    },
    bar: {
      backgroundColor: "var(--clr-secondary)",
    },
  })
)(LinearProgress);

const LineLoader: FC<LoaderProps> = ({ show }) => {
  window.addEventListener("openLoader", () => {
    show(true);
  });
  window.addEventListener("closeLoader", () => {
    show(false);
  });
  return <StyledLinear />;
};

export default LineLoader;
