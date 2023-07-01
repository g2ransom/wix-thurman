import React from "react";
import { Button } from "@mui/material";
import { TransactionState } from "../reducers/TransactionReducer";
import InfoPopover from "./InfoPopover";
import { handleApproval, ApprovalFuncParams } from "../utils/ethersUtils";

// export type ApprovalFuncParams = {
// 	dispatch: (action: ACTION_TYPE) => void;
// 	update: () => void;
// 	value: string;
// 	networkChainId: string;
// }

type ApprovalButtonProps = {
	isDirty: boolean;
	isValid: boolean;
	state: TransactionState;
	params: ApprovalFuncParams;
	handleApproval: (params: ApprovalFuncParams) => Promise<void>;
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
	params,
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
				|| parseFloat(params.value) <= 0
			}
			onClick={() => handleApproval(params)}
			endIcon={<InfoPopover content={CONTENT} />}
			sx={styles.button}
			fullWidth
		>
			Approve {asset} to continue
		</Button>
	);
}