import React from "react";
import {
	AppBar,
	Avatar,
	Box,
	Link,
	Toolbar
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "./connectWallet/ConnectWallet";
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

export default function Header() {
	const { chainId } = useWeb3React();
	const govUrl = chainId ? govChainUrlMap[chainId].url : govChainUrlMap[1].url;
	return (
		<AppBar position="static" elevation={0} sx={styles.appBar}>
			<Toolbar variant="dense">
				<Box display="flex" flexGrow={1}>
					<Link href="/">
						<Avatar src={thurmanLogo} sx={styles.thurmanIcon} />
					</Link>
				</Box>
				<Box display="flex" justifyContent="center">
					<Link
						variant="body2"
						underline="none"
						target="_blank"
						rel="noopener"
						href={govUrl}
						sx={{...styles.typography, marginLeft: "1em", fontWeight: "bolder"}}
					>
						Governance
					</Link>
				</Box>		  
				<ConnectWallet />
			</Toolbar>
		</AppBar>
	);
}