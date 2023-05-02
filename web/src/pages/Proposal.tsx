import React from "react";
import {
	Box,
	Container,
	Chip,
	Divider,
	Grid,
	Paper,
	Typography
} from "@mui/material";

const styles = {
	container: {
  	backgroundColor: "#F5F5F5",
  	height: "100%",
  },
  divider: {
		margin: "0.5em 0em 0.5em 0em"
	},
  paper: {
		margin: "1em 1em 1em 1em",
		padding: "1em 1em 1em 1em",
		borderColor: "#B0B0B0",
		width: "1000px"
	},
	chip: {
		borderRadius: "0",
		marginBottom: "0.75em",
		"& .MuiChip-label": {
			fontWeight: "900",
			fontSize: "1.125em",
			color: "#525252",
		},
	},
	headerTypography: {
		fontWeight: "900",
	},
	headerText: {
		fontWeight: "600",
		fontSize: "0.75em",
		color: "#525252",
	},
	descriptionText: {
		fontWeight: "600",
		fontSize: "0.85em",
		color: "#525252",
	}
}

type ProposalHeaderProps = {
	title: string;
	status: string;
	proposer: string;
	id: string;
	date: string;
}

function ProposalHeader ( {title, status, proposer, id, date }: ProposalHeaderProps) {
	return (
		<Grid item xs={12}>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Paper 
					elevation={0} 
					variant="outlined"
					sx={styles.paper}
				>
					<Box display="flex" justifyContent="flex-start">
						<Chip label={status} size="medium" sx={styles.chip} />
					</Box>
					<Typography variant="h5" align="left" sx={styles.headerTypography}>
					{title}
					</Typography>
					<Divider sx={styles.divider} />
					<Typography align="left" sx={styles.headerText}>
						Proposal {id} created by {proposer} on {date}
					</Typography>
				</Paper>
			</Box>
		</Grid>
	);
}

function ProposalDescription () {
	return (
		<Grid item xs={12}>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Paper 
					elevation={0} 
					variant="outlined"
					sx={styles.paper}
				>
					<Typography variant="h5" align="left" sx={styles.headerTypography}>
						Description
					</Typography>
					<Divider sx={styles.divider} />
					<Typography align="left" sx={styles.descriptionText}>
						This is a placeholderThurman Governance Proposals are used to vote on funding diverse-led 
						small businesses. Before you can vote, you need to delegate your vote to yourself.
					</Typography>
				</Paper>
			</Box>
		</Grid>
	);
}

export default function Proposal() {
	return (
		<Container maxWidth={false} sx={styles.container}>
			<Grid container spacing={2} display="flex" alignItems="center">
				<ProposalHeader
					title="[THURM 001] Third Business Line of Credit" 
					status="Executed"
					proposer="g2ransom.eth"
					id="1"
					date="April 23, 2023"
				/>
				<ProposalDescription />
			</Grid>
		</Container>
	);
}