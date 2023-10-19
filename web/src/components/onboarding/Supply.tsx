import React from "react";
import { 
	Box,
	Typography,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import SupplyModalButton from "../SupplyModalButton";
import AssetBalances from "../AssetBalances";
import useWallet from "../../hooks/useWallet";
import usdcIcon from "../../images/usd-coin-usdc-logo.png";
import thurmanLogo from "../../images/thurman-logo.png";
import ethIcon from "../../images/ethereum_icon.png";

const styles = {
	box: {
		alignItems: "center",
		justifyContent: "center"
	}
}

export default function Supply() {
	let { account } = useWeb3React();
	let { usdcBalance, sUsdcBalance, ethBalance} = useWallet();
	usdcBalance = !usdcBalance ? "0.00" : usdcBalance;
	sUsdcBalance = !sUsdcBalance ? "0.00" : sUsdcBalance;
	ethBalance = !ethBalance ? "0.00" : ethBalance;
	let balances = 
	[
		{	
			name: "USDC",
			icon: usdcIcon,
			balance: usdcBalance
		},
		{
			name: "sUSDC",
			icon: thurmanLogo,
			balance: sUsdcBalance
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
				Supply USDC
			</Typography>
			<Typography variant="body2" sx={{fontWeight: "bolder"}}>
				This is a big step. Supplying USDC will require you to use your crypto wallet to supply funds to our lending pool. It's a two step process: approval and supply.
			</Typography>
			<SupplyModalButton />
			{account && (
				<Box display="flex" sx={styles.box}>
					<AssetBalances assetBalances={balances} />
				</Box>
			)}
		</Box>
	);
}