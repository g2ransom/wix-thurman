import React from "react";
import {
	Box,
	Typography
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "../connectWallet/ConnectWallet";
import useWallet from "../../hooks/useWallet";

const styles = {
	bodyText: {
		fontWeight: "bold",
		margin: "0.25em 0em 0.25em 0em",
	},
}

type ConnectProps = {
	metamask: boolean;
	coinbaseWallet: boolean;
}

export default function Connect({ metamask, coinbaseWallet }: ConnectProps) {
	const { account } = useWeb3React();
	const { usdcBalance, ethBalance} = useWallet();
	const walletInstalled = metamask || coinbaseWallet;

	return (
		<Box>
			<Typography variant="h4" sx={{fontWeight: "bolder"}}>
				Connect to a wallet
			</Typography>
			<Typography variant="body2" sx={{fontWeight: "bolder"}}>
				The first step is installing a crypto wallet browser extension and connecting to the Thurman App! Your crypto wallet is your personal gateway to transact on Thurman and other blockchain-based apps.
			</Typography>
			{!walletInstalled && (
				<Typography variant="body2">
					We don't see any installed wallet on your end. Use the button below to install a crypto wallet. Afterwards, refresh your page and try connecting again.
				</Typography>
			)}
			<ConnectWallet />
			{account && (
				<Box>
					<Typography variant="body1">
						Current USDC Balance: {usdcBalance}
					</Typography>
					<Typography variant="body1">
						Current ETH Balance: {ethBalance}
					</Typography>
				</Box>
			)}
			<Typography variant="body2" sx={styles.bodyText}>
				You'll need both USDC and Ether (ETH) to become a voting member of our community. The next step will give you the option to purchase crypto using MoonPay!
			</Typography>
		</Box>
	);
}