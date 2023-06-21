import React, { useState } from "react";
import {
	Box,
	Button,
	Grid,
	Typography
} from "@mui/material";
import useWallet from "../hooks/useWallet";
import {
	initialTransactionState,
	TransactionReducer
} from "../reducers/TransactionReducer";
import TransactionModal from "./TransactionModal";
import { NetworkContractMap } from "../constants/constants";

const styles = {
	button: {
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#525252",
		},
		fontWeight: "600"
	},
}

const infoPopoverContent = "When you delegate your vote to an address (including your own), that address has the ability to vote on proposals.";

export default function DelegateVoteButton() {
	let { account, chainId } = useWallet();
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const networkChainId = !chainId ? "0x1" : chainId;


	const handleClose = () => {
		setOpen(false);
	}

	return (
		<TransactionModal
			account={account}
			chainId={networkChainId}
			modalButtonName="Delegate vote"
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			modalHeaderText="Delegate Vote"
			infoPopoverContent={infoPopoverContent}
		>
			<Grid item xs={12}>
				<Typography variant="body1">
					Would you like to delegate your vote to yourself?
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Box display="flex">
					<Button 
						variant="contained" 
						sx={styles.button} 
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button variant="contained" sx={styles.button}>
						Delegate
					</Button>
				</Box>
			</Grid>
		</TransactionModal>
	);
}