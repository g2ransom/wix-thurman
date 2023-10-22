import React, { useEffect, useState } from "react";
import { 
	Grid,
	Paper,
	Typography 
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { getCommunityState, CommunityState } from "../utils/ethersUtils";

const styles = {
	grid: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	paper: {
		margin: "1em 1em 1em 1em",
		padding: "1em 1em 1em 1em",
		borderColor: "#B0B0B0",
	},
  sectionTypography: {
  	fontWeight: "600",
  },
  typography: {
  	fontWeight: "800"
  }
}

type CommunityDashboardStatProps = {
	stat: string | number;
	label: string;
};

function CommunityDashboardStat({ stat, label}: CommunityDashboardStatProps) {
	return (
		<Grid item xs={2}>
			<Typography variant="h5" sx={styles.typography}>
				{stat}
			</Typography>
			<Typography variant="body2">
				{label}
			</Typography>
		</Grid>
	);
}

export default function CommunityDashboardSection() {
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

	let dashboardStats: CommunityDashboardStatProps[] = [
		{
			stat: parseFloat(communityState.tvl).toFixed(2),
			label: "Total Funds Supplied"
		},
		{
			stat: communityState.supplyTxs,
			label: "Supply Transactions"
		},
		{
			stat: communityState.createdLines,
			label: "Total Borrowers"
		},
		{
			stat: communityState.repayments,
			label: "Debt Repayments"
		},
		{
			stat: communityState.proposals,
			label: "Governance Proposals"
		}
	];

	return (
		<Grid item xs={12}>
			<Paper elevation={0} variant="outlined" sx={styles.paper}>
				<Grid container spacing={2} sx={styles.grid}>
					{dashboardStats.map((stat, i) => {
						return (
							<CommunityDashboardStat
								key={i}
								stat={stat.stat}
								label={stat.label}
							/>
						);
					})}
				</Grid>
			</Paper>
		</Grid>
	)
}