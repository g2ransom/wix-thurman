import React, { useEffect, useState } from "react";
import { 
	Avatar,
	Box,
	Button,
	Chip,
	Grid,
	Hidden,
	Paper,
	Stack,
	Typography 
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { getCommunityState, CommunityState } from "../utils/ethersUtils";
import usdcIcon from "../images/usd-coin-usdc-logo.png";
import ethIcon from "../images/ethereum_icon.png";

const styles = {
	avatar: {
		width: ".5em",
		height: ".5em",
	},
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
	},
	chip: {
		margin: "1.25em 0.75em 0em 0em"
	},
	grid: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: "1.5em 0em 0em 0em"
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
				<Grid container spacing={2}>
					<Grid item xs={12} sm={8}>
						<Typography variant="h4" align="left" sx={{fontWeight: "bolder"}}>
							Thurman's Inaugural Community
						</Typography>
						<Typography variant="h6" align="left">
							Designed to give greater access to capital to millennial black entrepreneurs.
						</Typography>
						<Typography variant="body1" align="left" sx={{fontWeight: "bolder"}}>
							Borrowers are approved through a majority vote using a blockchain-based governance process.
						</Typography>
						<Stack direction="row">
							<Chip 
								avatar={<Avatar alt="eth" src={ethIcon} sx={styles.avatar} />}
								label="Ethereum" 
								sx={styles.chip} 
							/>
							<Chip 
								avatar={<Avatar alt="usdc" src={usdcIcon} sx={styles.avatar} />}
								label="USDC" 
								sx={styles.chip} 
							/>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Box display="flex" justifyContent="end" alignItems="start">
							<Button variant="contained" href="/onboarding" sx={styles.button}>
								Get Onboarded
							</Button>
						</Box>
					</Grid>
				</Grid>
				<Hidden smDown>
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
				</Hidden>
			</Paper>
		</Grid>
	)
}