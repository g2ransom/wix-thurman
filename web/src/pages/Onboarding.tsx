import React, { useState, useEffect } from "react";
import {
	Box,
	Container,
	Grid,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import useWallet from "../hooks/useWallet";
import { ZERO_ADDRESS } from "../constants/constants";
import { 
	getIsMetaMaskInstalled,
	getIsCoinbaseWalletInstalled
} from "../components/connectWallet/connections";
import MultiStep from "../components/multistep/MultiStep";
import Welcome from "../components/onboarding/Welcome";
import Connect from "../components/onboarding/Connect";
import FundWallet from "../components/onboarding/FundWallet";
import Supply from "../components/onboarding/Supply";
import Delegate from "../components/onboarding/Delegate";

const styles = {
	container: {
		backgroundColor: "#E8E8E8",
		minHeight: "100vh",
		paddingBottom: "5em",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	box: {
		marginTop: "1.5em",
		width: "65%"
	},
}

const steps = ["Welcome", "Connect Wallet", "Fund Wallet", "Supply", "Delegate Voting"];

export default function Onboarding() {
	const { account } = useWeb3React();
	let { sUsdcBalance, delegate } = useWallet();
	const [activeStep, setActiveStep] = useState<number>(0);
	const [metamask, setMetaMask] = useState<boolean>(false);
	const [coinbaseWallet, setCoinbaseWallet] = useState<boolean>(false);
	sUsdcBalance = !sUsdcBalance ? "0.0" : sUsdcBalance;
	let hasDelegate = delegate !== ZERO_ADDRESS ? true : false;
	
	
	useEffect(() => {
		const getWalletStatus = () => {
			const metamaskStatus = getIsMetaMaskInstalled();
			setMetaMask(metamaskStatus);
			const coinbaseWalletStatus = getIsCoinbaseWalletInstalled();
			setCoinbaseWallet(coinbaseWalletStatus);
		}
		getWalletStatus();
	}, [metamask, coinbaseWallet]);

	const accountConnected = account ? true : false;
	const suppliedUsdc = parseFloat(sUsdcBalance) > 0 ? true : false;

	let conditions = [true, accountConnected, true, suppliedUsdc, hasDelegate];
	return (
		<Container maxWidth={false} sx={styles.container}>
			<Box display="flex" alignItems="center" justifyContent="center" sx={styles.box}>
				<Grid container spacing={2}>
					<MultiStep 
						steps={steps} 
						activeStep={activeStep}
						setActiveStep={setActiveStep}
						conditions={conditions}
					>
						<Box>
						{activeStep === 0 && <Welcome />}
						{activeStep === 1 && <Connect metamask={metamask} coinbaseWallet={coinbaseWallet} />}
						{activeStep === 2 && <FundWallet />}
						{activeStep === 3 && <Supply />}
						{activeStep === 4 && <Delegate />}
						</Box>
					</MultiStep>
				</Grid>
			</Box>
		</Container>
	);
}