import React from "react";
import {
	Box,
	Button,
	Grid,
	Modal,
	Paper,
	Typography,
	Stack,
} from "@mui/material";
import useWallet from "../hooks/useWallet";
import CloseButton from "./CloseButton";
import InfoPopover from "./InfoPopover";
import { NetworkContractMap } from "../constants/constants";


type TransactionModalProps = {
	modalButtonName: string;
	open: boolean;
	handleOpen: () => void;
	handleClose: () => void;
	modalHeaderText: string;
	infoPopoverContent: string;
	children?: 
		| React.ReactChild 
		| React.ReactChild[];
}

const styles = {
	button: {
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#525252",
		},
		fontWeight: "600",
		width: "10.5em",
	},
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
	},
  modalHeaderTypography: {
  	fontWeight: "800",
  	paddingRight: "0.25em",
  },
	approvedBalanceTypography: {
		fontSize: "0.75em",
		fontWeight: "600",
		color: "#484848",
	},
};

export default function TransactionModal({
	modalButtonName,
	open,
	handleOpen,
	handleClose,
	modalHeaderText,
	infoPopoverContent,
	children
}: TransactionModalProps) {
	const { account, chainId, lineOfCredit } = useWallet();
	const borrowMax = !lineOfCredit?.borrowMax ? "0.0" : lineOfCredit?.borrowMax;
	const hasLineOfCredit: boolean = parseFloat(borrowMax) > 0 ? true : false;

	return (
		<div>
			<Button
				variant="contained"
				sx={styles.button}
				onClick={handleOpen}
				disabled={!account
				|| !NetworkContractMap[chainId]["Polemarch"]?.address
				|| (modalButtonName === "Borrow" && !hasLineOfCredit)
				}
			>
				{modalButtonName}
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
								<Grid item xs={12}>
									<Stack direction="row" display="flex" alignItems="center">
										<Typography variant="h6" sx={styles.modalHeaderTypography}>
											{modalHeaderText}
										</Typography>
										<InfoPopover content={infoPopoverContent} />
									</Stack>
								</Grid>
								{children}
							</Grid>
					</Paper>
				</Box>
			</Modal>
		</div>
	);
}