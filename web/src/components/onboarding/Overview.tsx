import React from "react";
import { 
	Box,
	Typography 
} from "@mui/material";

const styles = {
	headerText: {
		fontWeight: "bolder",
		marginBottom: "0.25em"
	},
	bodyText: {
		fontWeight: "bold",
		marginBottom: "0.25em",
	},
};

export default function Overview() {
	return (
		<Box>
			<Typography variant="h4" sx={styles.headerText}>
				Onboarding Overview
			</Typography>
			<Typography variant="body2" sx={styles.bodyText}>
				 As a community member, your voting power on governance proposals is equal to the percentage of the total funds that you supplied to the pool.
			</Typography>
			<Typography variant="body2" sx={styles.bodyText}>
				 During the onboarding process, we’ll help you do a few things: create a crypto wallet, purchase cryptocurrency to supply to our lending pool, supply funds to our community’s lending pool, and set you up to vote on governance proposals.
			</Typography>
			<Typography variant="h6" sx={styles.bodyText}>
				 Whenever you’re ready, click Next to start the process!
			</Typography>
		</Box>
	);
}