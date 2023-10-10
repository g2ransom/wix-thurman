import React, { useState } from "react";
import {
	Box,
	Typography
} from "@mui/material";
import MultiStep from "../components/multistep/MultiStep";
import Welcome from "../components/onboarding/Welcome";
import Overview from "../components/onboarding/Overview";
import WalletInstall from "../components/onboarding/WalletInstall";
import Connect from "../components/onboarding/Connect";
import FundWallet from "../components/onboarding/FundWallet"

const steps = ["Welcome", "Overview", "Install Wallet", "Connect Wallet", "Fund Wallet"];
const conditions = [true, true, true, true, true];

export default function Onboarding() {
		const [activeStep, setActiveStep] = useState<number>(0);

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
			{activeStep === 2 && <WalletInstall />}
			{activeStep === 3 && <Connect />}
			{activeStep === 4 && <FundWallet />}
			</Box>
		</MultiStep>
	);
}