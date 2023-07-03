import React from "react";
import {
	AppBar,
	Avatar,
	Box,
	Toolbar,
	Typography,
} from "@mui/material";
import useWallet from "../hooks/useWallet";
import GitHubIcon from '@mui/icons-material/GitHub';
import ConnectWalletButton from "./ConnectWalletButton";
import { govChainUrlMap } from "../constants/constants";
import thurmanLogo from "../images/thurman-logo.png";

const styles = {
	appBar: {
		background: "white",
		marginBottom: "1.25em"
	},
	font: {
		color: "black",
	},
	githubIcon: {
		color: "black",
		"&:hover": {
			cursor: "pointer",
		},
		width: "1.25em",
		height: "1.25em",
	},
	thurmanIcon: {
		width: "2.25em",
    height: "2.25em",
	},
	typography: {
		color: "black",
		fontWeight: "bold",
		marginRight: "1.25em",
		"&:hover": {
			cursor: "pointer",
		}
	}
}

const handleGithubClick = () => {
	window.open("https://github.com/thurmanlabs/thurman-v1", "_blank");
}

const handleGovernanceClick = (chainId: string) => {
	window.open(govChainUrlMap[chainId].url, "_blank");
}

export default function Header() {
	let { chainId } = useWallet();
	const networkChainId = !chainId ? "0x1" : chainId;

	return (
		<AppBar position="static" elevation={0} sx={styles.appBar}>
			<Toolbar variant="dense">
				<Box display="flex" flexGrow={1}>
					<Avatar src={thurmanLogo} sx={styles.thurmanIcon} />
				</Box>
				<Typography 
					onClick={() => handleGovernanceClick(networkChainId)} 
					variant="body2"
					sx={styles.typography}
				>
					Governance
				</Typography>
				<GitHubIcon onClick={handleGithubClick} sx={styles.githubIcon} />
				<ConnectWalletButton  />
			</Toolbar>
		</AppBar>
	);
}