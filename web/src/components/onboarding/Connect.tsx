import React from "react";
import {
	Box,
	Typography
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "../connectWallet/ConnectWallet";


export default function Connect() {

	return (
		<Box>
			<Typography variant="h4">
				Connect to a wallet
			</Typography>
			<ConnectWallet />
		</Box>
	);
}