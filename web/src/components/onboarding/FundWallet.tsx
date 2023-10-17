import React, { useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import {
	Box,
	Button,
	Typography
} from "@mui/material";
import useWallet from "../../hooks/useWallet";

const styles = {
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
		marginLeft: "1.5em",
	},
}

export default function FundWallet() {
	let { account } = useWeb3React();
	const { usdcBalance, ethBalance } = useWallet();

	const moonpaySdk = window.MoonPayWebSdk.init({
	  flow: "buy", // buy, sell, nft
	  environment: "sandbox", // production, sandbox
	  currencyCode: "USDC",
	  walletAddress: account,
	  // containerNodeSelector: "div",
	  variant: "overlay", // drawer, embedded, overlay, newTab, newWindow
	  params: {
	    apiKey: process.env.REACT_APP_MOONPAY
	  }
	});

	const moonpayWidget = useRef(null);
	
	const handleClick = () => {
		moonpayWidget.current = moonpaySdk.show();
	}

	return (
		<Box>
			<Typography variant="h4" sx={{fontWeight: "bolder"}}>
				Fund your wallet
			</Typography>
			<Typography variant="body2" sx={{fontWeight: "bolder"}}>
				MoonPay makes it simple to use your debit card to purchase crypto. You'll need USDC and around $30 worth of ETH to pay for transaction fees. If your bank rejects your first MoonPay transaction, give them a call. Once resolved, you should be in the clear for future crypto purchases.
			</Typography>
			<Typography variant="body1">
				Current USDC Balance: {usdcBalance}
			</Typography>
			<Typography variant="body1">
				Current ETH Balance: {ethBalance}
			</Typography>
			<Button 
				variant="contained"
				onClick={handleClick}
				sx={styles.button}
			>
				Buy Crypto
			</Button>
		</Box>
	);
}