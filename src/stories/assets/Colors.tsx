import {
  Typography,
  Tooltip,
  ButtonBase,
  ButtonBaseProps,
} from "@material-ui/core";
import { FC, useState } from "react";
import styled from "styled-components";

const ColorWrapper = styled.span<{ $color: string; $fontColor: string }>`
  background-color: var(--clr-${(p) => p.$color});
  color: ${(p) => p.$fontColor};
  height: 48px;
  width: 256px;

  align-items: center;
  justify-content: space-between;
  display: flex;
  /* flex-direction: column; */
`;

const CopyButton: FC<ButtonBaseProps & { copyText: string }> = ({
  children,
  copyText,
  ...props
}) => {
  const [tooltip, setTooltip] = useState("COPY");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(copyText);
    setTooltip("COPIED");
    setTimeout(() => {
      setTooltip("COPY");
    }, 1000);
  };

  return (
    <Tooltip title={tooltip}>
      <ButtonBase onClick={copyToClipboard} {...props}>
        {children}
      </ButtonBase>
    </Tooltip>
  );
};

const Color: FC<{ color: string; fontColor?: string }> = ({
  color,
  fontColor = "black",
}) => {
  const [hex] = useState(() => {
    const style = window.getComputedStyle(window.document.documentElement);
    return style.getPropertyValue(`--clr-${color}`);
  });

  return (
    <ColorWrapper $color={color} $fontColor={fontColor}>
      <CopyButton
        focusRipple
        style={{ height: "100%", padding: "8px" }}
        copyText={`var(--clr-${color})`}
      >
        <Typography variant="body1">--clr-{color}</Typography>
      </CopyButton>
      <CopyButton
        focusRipple
        style={{ height: "100%", padding: "8px" }}
        copyText={hex}
      >
        <Typography variant="overline" style={{ textTransform: "uppercase" }}>
          {hex}
        </Typography>
      </CopyButton>
      {/*  */}
      {/* <Button style={{color: fontColor}} size="small"><AppIcon name='content-copy' />&nbsp;--clr-{color}</Button> */}
    </ColorWrapper>
  );
};

const Line = styled.div`
  .colors {
    display: flex;
    flex-direction: column;
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
`;

const Colors: FC<{ colors: string[] }> = ({ colors }) => {
  return (
    <Grid>
      {colors.map((c, i) => (
        <Line key={i}>
          <Typography style={{ textTransform: "capitalize" }} variant="h6">
            {c.replace("-", " ")}
          </Typography>
          <div className="colors">
            <Color fontColor="white" color={c} />
            <Color color={`${c}-50`} />
            <Color color={`${c}-25`} />
          </div>
        </Line>
      ))}
    </Grid>
  );
};

export default Colors;
