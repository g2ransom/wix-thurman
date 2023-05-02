import React from "react";
import { Link } from "react-router-dom";
import {
	Box,
	Chip,
	Divider,
	Grid,
	LinearProgress,
	Paper,
	Stack,
	Typography
} from "@mui/material";

const styles = {
	paper: {
		margin: "1em 1em 1em 1em",
		padding: "1em 1em 1em 1em",
		borderColor: "#B0B0B0",
	},
	divider: {
		margin: "0.5em 0em 0em 0em"
	},
	proposalsHeader: {
		fontWeight: "900",
	},
	proposalSubHeader: {
		fontWeight: "900",
		color: "#808080",
	},
	itemTypography: {
		fontWeight: "600",
		fontSize: "0.75em"
	},
	chip: {
		borderRadius: "0",
		marginRight: "0.75em",
		"& .MuiChip-label": {
			fontWeight: "900",
			fontSize: "0.85em",
			color: "#525252",
		},
	},
	linearProgress: {
		borderRadius: "1em",
	},
}

type ProposalTableProps = {
	children?: 
		| React.ReactChild 
		| React.ReactChild[];
};

function ProposalTable({ children }: ProposalTableProps) {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h6" align="left" sx={styles.proposalsHeader}>
					Proposals
				</Typography>
				<Divider sx={styles.divider} />
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" align="left"sx={styles.proposalSubHeader}>
							Proposal
						</Typography>
					</Grid>
					<Grid 
						component={Box} 
						item 
						xs={2} 
						display={{xs: "none", sm: "block"}}
					>
						<Typography variant="body2" align="left"sx={styles.proposalSubHeader}>
							Votes for
						</Typography>
					</Grid>
					<Grid 
						component={Box} 
						item 
						xs={2} 
						display={{xs: "none", sm: "block"}}
					>
						<Typography variant="body2" align="left" sx={styles.proposalSubHeader}>
							Votes against
						</Typography>
					</Grid>
					<Grid 
						component={Box} 
						item 
						xs={2} 
						display={{xs: "none", sm: "block"}}
					>
						<Typography variant="body2" align="left" sx={styles.proposalSubHeader}>
							Total votes
						</Typography>
					</Grid>
				</Grid>
				<Divider sx={styles.divider}/>
			</Grid>
			{children}
		</Grid>
	);
}

type ProposalItemProps = {
	title: string;
	status: string;
	date: string;
	votesFor: string;
	votesAgainst: string;
	totalVotes: string;
};

function ProposalItem({ title, status, date, votesFor, votesAgainst, totalVotes }: ProposalItemProps) {

	return (
		<Grid item xs={12}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Stack spacing={1}>
						<Typography 
							variant="body2"
							align="left" 
							component={Link}
							to="/governance/proposal"
							key="proposal"
							sx={{
								...styles.itemTypography,
								color: "black", 
								"&:hover": 
									{
										textDecoration: "underline", 
										cursor: "pointer"
									}
								}
							}
						>
							{title}
						</Typography>
						<Box display="flex" flexGrow={1} justifyContent="flex-start">
							<Chip label={status} size="small" sx={styles.chip} />
							<Typography 
								variant="body2" 
								align="left" 
								sx={{ ...styles.itemTypography, color: "#808080"}}
							>
								Proposed on: {date}
							</Typography>
						</Box>
					</Stack>
				</Grid>
				<Grid 
					component={Box} 
					item 
					xs={2} 
					display={{xs: "none", sm: "block"}}
				>
					<Stack spacing={0.25} display="flex" justifyContent="center">
						<Typography variant="body2" align="left" sx={styles.itemTypography}>
							{votesFor}
						</Typography>
						<LinearProgress 
							value={(parseFloat(votesFor) / parseFloat(totalVotes)) * 100}
							variant="determinate"
							color="inherit"
							sx={styles.linearProgress}
							/>
					</Stack>
				</Grid>
				<Grid 
					component={Box} 
					item 
					xs={2} 
					display={{xs: "none", sm: "block"}}
				>
					<Stack spacing={0.25} display="flex" justifyContent="center">
						<Typography variant="body2" align="left" sx={styles.itemTypography}>
							{votesAgainst}
						</Typography>
						<LinearProgress 
							value={(parseFloat(votesAgainst) / parseFloat(totalVotes)) * 100}
							variant="determinate"
							color="inherit"
							sx={styles.linearProgress}
							/>
					</Stack>
				</Grid>
				<Grid 
					component={Box} 
					item 
					xs={2} 
					display={{xs: "none", sm: "block"}}
				>
					<Typography variant="body2" align="left" sx={styles.itemTypography}>
							{totalVotes}
						</Typography>
				</Grid>
				<Divider sx={styles.divider} />
			</Grid>
			<Divider sx={styles.divider} />
		</Grid>
	)
}

export default function GovernanceProposals() {
	return (
		<Grid item xs={12}>
			<Paper 
				elevation={0} 
				variant="outlined"
				sx={styles.paper}
			>
				<ProposalTable>
					<ProposalItem
						title="[THURM 003] Third Business Line of Credit"
						status="Pending Execution"
						date="June 07, 2023"
						votesFor="100"
						votesAgainst="0"
						totalVotes="100"
					/>
					<ProposalItem
						title="[THURM 002] Second Business Line of Credit"
						status="Pending Execution"
						date="April 24, 2023"
						votesFor="0"
						votesAgainst="100"
						totalVotes="100"
					/>
					<ProposalItem
						title="[THURM 001] Third Business Line of Credit"
						status="Executed"
						date="April 23, 2023"
						votesFor="400"
						votesAgainst="100"
						totalVotes="500"
					/>
				</ProposalTable>
			</Paper>
		</Grid>
	);
}