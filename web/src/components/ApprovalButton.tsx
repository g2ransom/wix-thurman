import React from "react";
import { Button } from "@mui/material";
import { TransactionState } from "../reducers/TransactionReducer";
import InfoPopover from "./InfoPopover";


type ApprovalButtonProps = {
	isDirty: boolean;
	isValid: boolean;
	state: TransactionState;
	value: string;
	handleApproval: (value: string) => Promise<void>;
	asset: string;
};

const styles = {
	button: {
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#525252",
		},
		fontWeight: "600"
	},
}

const CONTENT = "To continue, you need to grant Thurman smart contracts permission to move your funds from your wallet."

export default function ApprovalButton({
	isDirty,
	isValid,
	state,
	value,
	handleApproval,
	asset
}: ApprovalButtonProps) {
	return (
		<Button
			variant="contained"
			disabled={
				!isDirty 
				|| !isValid 
				|| (state.transactionType === "approval" && state.status === "inProgress")
				|| parseFloat(value) <= 0
			}
			onClick={() => handleApproval(value)}
			endIcon={<InfoPopover content={CONTENT} />}
			sx={styles.button}
			fullWidth
		>
			Approve {asset} to continue
		</Button>
	);
}