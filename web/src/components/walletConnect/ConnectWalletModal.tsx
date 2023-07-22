import React, { useState } from "react";
import {
	Box,
	Button,
	Grid,
	Modal,
	Paper,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import CloseButton from "../CloseButton";

type ConnectWalletModalProps = {
	children?: 
		| React.ReactChild 
		| React.ReactChild[];
}

const styles = {
	modal: {
		display: "flex",
		alignItems: "center", 
		justifyContent: "center",
	},
	paper: {
    position: "absolute",
    maxWidth: 450,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    padding: "1em 1em 1em 1em",
	}
};

export default function ConnectWalletModal({ children }: ConnectWalletModalProps) {
	const { account } = useWeb3React();
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Button
				variant="contained"
				onClick={handleOpen}
			>
				{account ? "Disconnect Wallet" : "Connect Wallet"}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				sx={styles.modal}
			>
				<Box>
					<Paper elevation={1} sx={styles.paper}>
						<Grid container spacing={1}>
							<CloseButton handleClose={handleClose} />
							{children}
						</Grid>
					</Paper>
				</Box>
			</Modal>
		</>
	)
}