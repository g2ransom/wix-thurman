import React from "react";
import {
	Box,
	Typography
} from "@mui/material";
import useWallet from "../../hooks/useWallet";

export default function FundWallet() {
	const { account, usdcBalance, ethBalance} = useWallet();

	return (
		<Box>
			<Typography variant="h4">
				Fund your wallet
			</Typography>
			<Typography variant="body1">
				Current USDC Balance: {usdcBalance}
			</Typography>
			<Typography variant="body2">
				Current ETH Balance: {ethBalance}
			</Typography>
			<Typography variant="h5">
				Buy Crypto Here!
			</Typography>
		</Box>
	);
}