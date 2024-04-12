import { FC, useState } from "react";
import { LinearProgress, createStyles, withStyles } from "@material-ui/core";

interface LoaderProps {
	show?: (value: boolean) => void;
}

const StyledLinear = withStyles(() =>
	createStyles({
		root: {
			marginTop: "-1px",
			position: "absolute",
			width: "100%",
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

export const LineLoader: FC<LoaderProps> = ({ show }) => {
	const [colorLineProgress, setColorLineProgress] = useState<
		"primary" | "secondary" | undefined
	>("primary");
	const [variant, setVariant] = useState<
		"determinate" | "indeterminate" | "buffer" | "query" | undefined
	>("determinate");

	window.addEventListener("openLoader", () => {
		if (show != undefined) {
			show(true);
		}
		setColorLineProgress("primary");
		setVariant("indeterminate");
	});
	window.addEventListener("closeLoader", () => {
		if (show != undefined) {
			show(false);
		}
		setColorLineProgress("secondary");
		setVariant("determinate");
	});
	return (
		<StyledLinear color={colorLineProgress} variant={variant} value={100} />
	);
};

export default LineLoader;
