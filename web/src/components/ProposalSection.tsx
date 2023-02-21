import React from "react";
import {
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import ComingSoonSection from "./ComingSoonSection";

const styles = {
	gridHeader: {
		margin: "0.5em 0.5em 0.5em 0em",
		padding: "0.5em 1em 0.5em 0em"
	},
	headerTypography: {
		fontWeight: "600",
	},
}

function ProposalGridHeader() {
	return (
		<Grid container spacing={1} sx={styles.gridHeader}>
			<Grid item xs={1}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					ID
				</Typography>
			</Grid>
			<Grid item xs={7}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Description
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Votes For
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Votes Against
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider sx={{borderWidth: "thin"}} />
			</Grid>
		</Grid>
	);
}

type ProposalGridItemProps = {
	id: string;
	description: string;
	votesFor: string;
	votesAgainst: string;
};

function ProposalGridItem({ id, description, votesFor, votesAgainst }: ProposalGridItemProps) {
	return (
		<Grid container spacing={1} sx={styles.gridHeader}>
			<Grid item xs={1}>
				<Typography variant="body2" align="left" sx={styles.headerTypography}>
					{id}
				</Typography>
			</Grid>
			<Grid item xs={7}>
				<Typography 
					variant="body2" 
					align="left" 
					sx={{...styles.headerTypography, "&:hover": {textDecoration: "underline", cursor: "pointer"}}}
				>
					{description}
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body2" align="left" sx={styles.headerTypography}>
					{votesFor}
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body2" align="left" sx={styles.headerTypography}>
					{votesAgainst}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider sx={{borderWidth: "thin"}} />
			</Grid>
		</Grid>
	);

}

export default function ProposalSection() {
	return (
		<ComingSoonSection title="Governance Proposals">
			<ProposalGridHeader />
			<ProposalGridItem
				id="24"
				description="Provide line of credit to Business A @ 20% APR with 12-week term"
				votesFor="1250"
				votesAgainst="150"
			/>
			<ProposalGridItem
				id="25"
				description="Provide line of credit to Business B @ 24% APR with 12-week term"
				votesFor="1300"
				votesAgainst="1100"
			/>
		</ComingSoonSection>
	);
}