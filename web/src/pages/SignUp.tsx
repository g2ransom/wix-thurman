import React from "react";
import {
	Box,
	Container,
	Divider,
	Grid,
	Paper
} from "@mui/material";
import ConnectWallet from "../components/connectWallet/ConnectWallet";
import DevControlledSignupForm from "../components/onboarding/DevControlledSignupForm";


const styles = {
	container: {
		backgroundColor: "#E8E8E8",
		minHeight: "100vh",
		paddingBottom: "5em",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
		marginLeft: "1.5em",
		width: "15em",
	},
	box: {
		marginTop: "1.5em",
		width: "40%"
	},
	divider: {
		width: "15em",
		fontWeight: "700",
		fontSize: "0.85em",
		color: "gray",
	},
	formPaper: {
    padding: "1em 1em 1.85em 1.85em",
	},
	emailField: {
		fontSize: "0.5em",
		color: "gray"
	},
}

export default function SignUp() {
	return (
		<Container maxWidth={false} sx={styles.container}>
			<Box display="flex" alignItems="center" justifyContent="center" sx={styles.box}>
				<Paper elevation={0} sx={styles.formPaper}>
					<Grid container spacing={1}>
						<DevControlledSignupForm />
						<Grid item xs={12}>
							<Box display="flex" alignItems="center" justifyContent="center">
								<Divider
									sx={styles.divider}
									variant="middle"
								> 
									or continue with 
								</Divider>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<ConnectWallet />
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Container>
	);
}