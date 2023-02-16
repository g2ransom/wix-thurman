import React from "react";
import { Button } from "@mui/material";

type PostApprovalButtonProps = {
	isDirty: boolean;
	isValid: boolean;
	isApproved: boolean;
	stateCondition: boolean;
	notPositive: boolean;
	buttonText: string;
	onClick: (...args: any[]) => void;
}

const styles = {
	button: {
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#525252",
		},
		fontWeight: "600"
	},
}

export default function PostApprovalButton({
	isDirty,
	isValid,
	isApproved,
	stateCondition,
	notPositive,
	buttonText,
	onClick
}: PostApprovalButtonProps
) {
	return (
		<Button
			variant="contained"
			onClick={onClick}
			disabled={
				!isDirty 
				|| !isValid 
				|| !isApproved
				|| stateCondition
				|| notPositive
			}
			sx={styles.button}
			fullWidth
		>
			{buttonText}
		</Button>
	);
}