import React from "react";
import { Link } from "react-router-dom";
import {
	AppBar,
	Avatar,
	Box,
	Button,
	IconButton,
	Toolbar,
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
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
	githubIcon: {
		color: "black",
		"&:hover": {
			cursor: "pointer",
		},
		width: "1.25em",
		height: "1.25em",
		marginRight: "1.5em",
	},
	thurmanIcon: {
		width: "2.25em",
    height: "2.25em",
	}
}

const onClick = () => {
	window.open("https://github.com/thurmanlabs/thurman-v1", "_blank")
}

export default function Header() {
	return (
		<AppBar position="static" elevation={0} sx={styles.appBar}>
			<Toolbar variant="dense">
				<Box display="flex" flexGrow={1}>
					<IconButton 
						component={Link} 
						to="/" 
						key="home"
					>
						<Avatar src={thurmanLogo} sx={styles.thurmanIcon} />
					</IconButton>
				</Box>
				<GitHubIcon onClick={onClick} sx={styles.githubIcon} />
				<Button 
					component={Link} 
					to="/governance" 
					key="governance"
				>
					Governance
				</Button>
				<ConnectWalletButton  />
			</Toolbar>
		</AppBar>
	);
}