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

export default function Welcome() {
	return (
		<Box>
			<Typography variant="h4" sx={styles.headerText}>
				Welcome to Thurman!
			</Typography>
			<Typography variant="body2" sx={styles.bodyText}>
				 we help small business communities democratically lend to their members.
			</Typography>
			<Typography variant="body2" sx={styles.bodyText}>
				 Members pool together funds and approved business owners can borrow funds at an interest rate determined by the community. 
			</Typography>
			<Typography variant="h6" sx={styles.bodyText}>
				 Communities build a criteria for approving borrowers.
			</Typography>
			<Typography variant="body2" sx={styles.bodyText}>
				 For our inaugural community, the criteria for borrowing funds is earning a majority vote through a blockchain-based governance process.
			</Typography>
			<Typography variant="body1" sx={styles.bodyText}>
				 We use blockchain technology to make the community-led process for approving borrowers more democratic and transparent.
			</Typography>
		</Box>
	);
}