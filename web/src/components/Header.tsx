import React from "react";
import {
	AppBar,
	Avatar,
	Box,
	Toolbar,
} from "@mui/material";
import ConnectWalletButton from "./ConnectWalletButton";
import thurmanLogo from "../images/thurman-logo.png";

const styles = {
	appBar: {
		background: "white",
		marginBottom: "1.25em"
	},
	font: {
		color: "black",
	},
	thurmanIcon: {
		width: "2.25em",
    height: "2.25em",
	}
}

export default function Header() {
	return (
		<AppBar position="static" elevation={0} sx={styles.appBar}>
			<Toolbar variant="dense">
				<Box display="flex" flexGrow={1}>
					<Avatar src={thurmanLogo} sx={styles.thurmanIcon} />
				</Box>
				<ConnectWalletButton />
			</Toolbar>
		</AppBar>
	);
}