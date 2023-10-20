import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { getCommunityState } from "../utils/ethersUtils";

export default function CommunityDashboard() {
	const [tvl, setTvl] = useState<string>("0.00");
	let { chainId } = useWeb3React();
	let networkChainId = !chainId ? 1 : chainId;

	useEffect(() => {
		const getState = async () => {
			const { ethereum } = window;
			const provider = new ethers.BrowserProvider(ethereum as any);
			let { tvl } = await getCommunityState(networkChainId, provider);
			setTvl(tvl)
		}
		getState();
	}, [networkChainId])

	return (
		<Typography>
			TVL: {tvl}
		</Typography>
	)
}