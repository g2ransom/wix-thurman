import React from "react";
import { useWeb3React } from "@web3-react/core";
import {
	Box,
	Button,
	Typography
} from "@mui/material";
import AssetBalances from "../AssetBalances";
import useWallet from "../../hooks/useWallet";
import usdcIcon from "../../images/usd-coin-usdc-logo.png";
import ethIcon from "../../images/ethereum_icon.png";

const styles = {
	box: {
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
		marginLeft: "1.5em",
		width: "12em",
	},
}

export default function FundWallet() {
	let { account } = useWeb3React();
	let { usdcBalance, ethBalance } = useWallet();
	usdcBalance = !usdcBalance ? "0.00" : usdcBalance;
	ethBalance = !ethBalance ? "0.00" : ethBalance;
	let balances = 
	[
		{	
			name: "USDC",
			icon: usdcIcon,
			balance: usdcBalance
		},
		{
			name: "ETH",
			icon: ethIcon,
			balance: ethBalance
		}
	];

	return (
		<Box>
			<Typography variant="h4" sx={{fontWeight: "bolder"}}>
				Fund your wallet
			</Typography>
			<Typography variant="body2" sx={{fontWeight: "bolder"}}>
				You'll need USDC and around $20 worth of ETH to pay for transaction fees, depending on how busy Ethereum's network is. Use Coinbase and the accompanying tutorial to purchase both cryptocurrencies.
			</Typography>
			<Typography variant="body2" sx={{fontWeight: "bold"}}>
				Using your debit card is fastest, but using your bank account is cheaper. If you use your bank, come back to this page when your crypto arrives!
			</Typography>
			{account && (
				<Box display="flex" sx={styles.box}>
					<AssetBalances assetBalances={balances} />
				</Box>
			)}
			<Box display="flex" sx={styles.box}>
				<Button 
					variant="contained"
					href="https://www.coinbase.com/"
					target="_blank"
					sx={styles.button}
				>
					Coinbase
				</Button>
				<Button 
					variant="contained"
					href="https://thurmanlabs.notion.site/Buying-and-sending-crypto-to-your-account-address-using-Coinbase-e4a7216809fd47e39f5dcb11f45445bb"
					target="_blank"
					sx={styles.button}
				>
					Tutorial
				</Button>
			</Box>
		</Box>
	);
}