import React from "react";
import {
	Avatar,
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import thurmanLogo from "../images/thurman-logo.png";

const styles = {
	paper: {
		margin: "1em 1em 1em 1em",
		padding: "1em 1em 1em 1em",
		borderColor: "#B0B0B0",
	},
	button: {
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#525252",
		},
		fontWeight: "600"
	},
	thurmanIcon: {
		width: "1.75em",
  	height: "1.75em",
	},
	headerTypography: {
		fontWeight: "900",
		marginLeft: "0.5em",
	},
};

export default function GovernanceHeader() {
	return (
		<Grid item xs={12}>
			<Paper 
				elevation={0} 
				variant="outlined"
				sx={styles.paper}
			>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Stack direction="row" justifyContent="center" alignItems="center">
							<Box display="flex" flexGrow={1}>
								<Avatar src={thurmanLogo} sx={styles.thurmanIcon} />
								<Typography variant="h5" sx={styles.headerTypography}>
									Governance Overview
								</Typography>
							</Box>
							<Button variant="contained" sx={styles.button}>
								Delegate vote
							</Button>
						</Stack>
					</Grid>
					<Grid item xs={8}>
						<Typography variant="body1" align="left">
							Thurman Governance Proposals are used to vote on funding diverse-led small businesses. 
							Before you can vote, you need to delegate your vote to yourself.
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}