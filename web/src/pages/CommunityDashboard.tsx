import React, { useEffect, useState } from "react";
import { 
	Box,
	Typography 
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { getCommunityState } from "../utils/ethersUtils";

export default function CommunityDashboard() {
	const [tvl, setTvl] = useState<string>("0.00");
	const [members, setMembers] = useState<number>(0);
	const [createdLines, setCreatedLines] = useState<number>(0);
	const [proposals, setProposals] = useState<number>(0);
	const [repayments, setRepayments] = useState<number>(0);
	let { chainId } = useWeb3React();
	let networkChainId = !chainId ? 1 : chainId;

	useEffect(() => {
		const getState = async () => {
			const { ethereum } = window;
			const provider = new ethers.BrowserProvider(ethereum as any);
			let { tvl, members, createdLines, proposals, repayments } = await getCommunityState(networkChainId, provider);
			setTvl(tvl);
			setMembers(members);
			setCreatedLines(createdLines);
			setProposals(proposals);
			setRepayments(repayments);
		}
		getState();
	}, [networkChainId])

	return (
		<Box>
			<Typography>
				TVL: {tvl}
			</Typography>
			<Typography>
				Members: {members}
			</Typography>
			<Typography>
				Lines of Credit: {createdLines}
			</Typography>
			<Typography>
				Governance Proposals: {proposals}
			</Typography>
			<Typography>
				Repayments: {repayments}
			</Typography>
		</Box>

	)
}