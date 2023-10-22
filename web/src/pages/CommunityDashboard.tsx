import React, { useEffect, useState } from "react";
import { 
	Box,
	Typography 
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { getCommunityState, CommunityState } from "../utils/ethersUtils";

export default function CommunityDashboard() {
	const [communityState, setCommunityState] = useState<CommunityState>({
		tvl: "0.00", 
		supplyTxs: 0, 
		createdLines: 0, 
		proposals: 0, 
		repayments: 0
	});
	let { chainId } = useWeb3React();
	let networkChainId = !chainId ? 1 : chainId;

	useEffect(() => {
		const getState = async () => {
			const { ethereum } = window;
			const provider = new ethers.BrowserProvider(ethereum as any);
			let communityState = await getCommunityState(networkChainId, provider);
			setCommunityState(communityState);
		}
		getState();
	}, [networkChainId])

	return (
		<Box>
			<Typography>
				TVL: {parseFloat(communityState.tvl).toFixed(2)}
			</Typography>
			<Typography>
				Supply Transactions: {communityState.supplyTxs}
			</Typography>
			<Typography>
				Lines of Credit: {communityState.createdLines}
			</Typography>
			<Typography>
				Governance Proposals: {communityState.proposals}
			</Typography>
			<Typography>
				Repayments: {communityState.repayments}
			</Typography>
		</Box>

	)
}