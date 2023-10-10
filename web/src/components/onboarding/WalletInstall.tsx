import React from "react";
import {
	Box,
	Typography
} from "@mui/material";
import { 
	getIsMetaMaskInstalled,
	getIsCoinbaseWalletInstalled
} from "../connectWallet/connections";

const styles = {
	headerText: {
		fontWeight: "bolder",
		marginBottom: "0.25em"
	},
	bodyText: {
		fontWeight: "bold",
		marginBottom: "0.25em",
	},
};

export default function WalletInstall() {
	const metamask = getIsMetaMaskInstalled();
	const coinbaseWallet = getIsCoinbaseWalletInstalled();

	return (
		<Box>
			<Typography variant="h4" sx={styles.headerText}>
				Install a crypto wallet
			</Typography>
			<Typography variant="body2" sx={styles.bodyText}>
				MetaMask is installed: {metamask ? "true" : "false"}
			</Typography>
			<Typography variant="body2" sx={styles.bodyText}>
				Coinbase Wallet is installed: {coinbaseWallet ? "true" : "false"}
			</Typography>
		</Box>
	);
}