import React, { useRef, useState } from "react";
import {
	Box,
	Button,
	Modal,
	Typography
} from "@mui/material";
import useWallet from "../../hooks/useWallet";

export default function FundWallet() {
	const { usdcBalance, ethBalance} = useWallet();
	const [open, setOpen] = useState<boolean>(false);

	const moonpaySdk = window.MoonPayWebSdk.init({
	  flow: "buy", // buy, sell, nft
	  environment: "sandbox", // production, sandbox
	  // containerNodeSelector: "#moonpay-widget",
	  variant: "overlay", // drawer, embedded, overlay, newTab, newWindow
	  params: {
	    apiKey: process.env.REACT_APP_MOONPAY
	  }
	});

	const moonpayWidget = useRef(moonpaySdk.show());
	
	const handleOpen = () => {
		setOpen(true);
	}
	const handleClose = () => setOpen(false);

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
			<Button onClick={handleOpen}>
				Buy Crypto
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Box ref={moonpayWidget} />	
			</Modal>
			<Typography variant="h5">
				Buy Crypto Here!
			</Typography>
			
		</Box>
	);
}