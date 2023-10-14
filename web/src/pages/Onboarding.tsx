import React, { useState, useEffect } from "react";
import {
	Box,
	Typography
} from "@mui/material";
import { 
	ethers, 
	Contract
} from "ethers";
import { useWeb3React } from "@web3-react/core";
import useWallet from "../hooks/useWallet";
import { 
	getIsMetaMaskInstalled,
	getIsCoinbaseWalletInstalled
} from "../components/connectWallet/connections";
import MultiStep from "../components/multistep/MultiStep";
import Welcome from "../components/onboarding/Welcome";
import Overview from "../components/onboarding/Overview";
import WalletInstall from "../components/onboarding/WalletInstall";
import Connect from "../components/onboarding/Connect";
import FundWallet from "../components/onboarding/FundWallet";
import Supply from "../components/onboarding/Supply";
import Delegate from "../components/onboarding/Delegate";
import { NetworkContractMap } from "../constants/constants";

const steps = ["Welcome", "Overview", "Install Wallet", "Connect Wallet", "Fund Wallet", "Supply", "Delegate"];
const AddressZero = "0x0000000000000000000000000000000000000000";

export default function Onboarding() {
	const { account, chainId } = useWeb3React();
	let { sUsdcBalance } = useWallet();
	const [activeStep, setActiveStep] = useState<number>(0);
	const [metamask, setMetaMask] = useState<boolean>(false);
	const [coinbaseWallet, setCoinbaseWallet] = useState<boolean>(false);
	const [delegatedVoting, setDelegatedVoting] = useState<boolean>(false);
	sUsdcBalance = !sUsdcBalance ? "0.0" : sUsdcBalance;
	const networkChainId = !chainId ? 1 : chainId; 
	
	
	useEffect(() => {
		const getWalletStatus = () => {
			const metamaskStatus = getIsMetaMaskInstalled();
			setMetaMask(metamaskStatus);
			const coinbaseWalletStatus = getIsCoinbaseWalletInstalled();
			setCoinbaseWallet(coinbaseWalletStatus);
		}
		getWalletStatus();
	}, [metamask, coinbaseWallet]);

	useEffect( () => {
		const getVotingStatus = async () => {
			const { ethereum } = window;
			const provider = new ethers.BrowserProvider(ethereum as any);
			const signer = await provider.getSigner();
			try {
				const thurmanToken: Contract = new ethers.Contract(
					NetworkContractMap[networkChainId]["ThurmanToken"].address,
					NetworkContractMap[networkChainId]["ThurmanToken"].abi,
					signer,
				);

				const delegatee = await thurmanToken.delegates(account);
				if (delegatee === AddressZero) {
					setDelegatedVoting(false);
				} else {
					setDelegatedVoting(true);
				}
			} catch (e) {
				console.error(e);
				setDelegatedVoting(false);
			}
		}
		getVotingStatus();
	}, [delegatedVoting, account, networkChainId]);

	const walletInstalled = coinbaseWallet || metamask ? true : false;
	const accountConnected = account ? true : false;
	const suppliedUsdc = parseFloat(sUsdcBalance) > 0 ? true : false;
	const votingDelegated = delegatedVoting ? true : false;

	let conditions = [true, true, walletInstalled, accountConnected, suppliedUsdc, true, votingDelegated];
	return (
		<MultiStep 
			steps={steps} 
			activeStep={activeStep}
			setActiveStep={setActiveStep}
			conditions={conditions}
		>
			<Box>
			{activeStep === 0 && <Welcome />}
			{activeStep === 1 && <Overview />}
			{activeStep === 2 && <WalletInstall metamask={metamask} coinbaseWallet={coinbaseWallet} />}
			{activeStep === 3 && <Connect />}
			{activeStep === 4 && <FundWallet />}
			{activeStep === 5 && <Supply />}
			{activeStep === 6 && <Delegate />}
			</Box>
		</MultiStep>
	);
}