import React from "react";
import { 
	Avatar,
	Box,
	Button,
	Chip,
	Grid,
	Paper,
	Stack,
	Typography 
} from "@mui/material";
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
	},
  sectionTypography: {
  	fontWeight: "600",
  },
  typography: {
  	fontWeight: "800"
  }
}

export default function CommunityDashboardSection() {

	return (
		<Grid item xs={12}>
			<Paper elevation={0} variant="outlined" sx={styles.paper}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={8}>
						<Typography variant="h4" align="left" sx={{fontWeight: "bolder"}}>
							Thurman's Inaugural Community
						</Typography>
						<Typography variant="h6" align="left">
							A cooperative lending pool that provides micro-loans to real-world small businesses.
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
			</Paper>
		</Grid>
	)
}