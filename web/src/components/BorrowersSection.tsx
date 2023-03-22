import React from "react";
import {
	Divider,
	Grid,
	Typography
} from "@mui/material";
import ComingSoonSection from "./ComingSoonSection";

const styles = {
	gridHeader: {
		margin: "0.5em 0.5em 0.5em 0em",
		padding: "0.5em 1em 0.5em 0em",
		display: "flex",
		justifyContent: "space-between",
	},
	headerTypography: {
		fontWeight: "600",
		marginRight: "1em", 
	},
}

function BorrowersGridHeader() {
	return (
		<Grid container spacing={1} sx={styles.gridHeader}>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Acct
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Max
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					APR
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Bal
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					End
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider sx={{borderWidth: "thin"}} />
			</Grid>
		</Grid>
	);
}

type BorrowersGridItemProps = {
	borrower: string;
	maxLimit: string;
	apr: string;
	balance: string;
	endDate: string;
};

function BorrowersGridItem({ 
	borrower, 
	maxLimit, 
	apr, 
	balance, 
	endDate 
}: BorrowersGridItemProps
) {
	return (
		<Grid container spacing={1} sx={styles.gridHeader}>
			<Grid item xs={2}>
				<Typography 
					variant="body2" 
					align="left" 
					sx={{...styles.headerTypography, "&:hover": {textDecoration: "underline", cursor: "pointer"}}}
				>
					{borrower}
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body2" align="left" sx={styles.headerTypography}>
					{maxLimit}
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body2" align="left" sx={styles.headerTypography}>
					{apr}
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body2" align="left" sx={styles.headerTypography}>
					{balance}
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body2" align="left" sx={styles.headerTypography}>
					{endDate}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider sx={{borderWidth: "thin"}} />
			</Grid>
		</Grid>
	);
}

export default function BorrowersSection() {
	return (
		<ComingSoonSection title="Current Borrowers">
			<BorrowersGridHeader />
			<BorrowersGridItem
				borrower="0xfa..."
				maxLimit="20k"
				apr="20.0%"
				balance="17.6k"
				endDate="04/23"
			/>
			<BorrowersGridItem
				borrower="0xdf..."
				maxLimit="15k"
				apr="24.0%"
				balance="11.2k"
				endDate="04/23"
			/>
			<BorrowersGridItem
				borrower="0xe7..."
				maxLimit="22.5k"
				apr="25.0%"
				balance="16.2k"
				endDate="04/23"
			/>
		</ComingSoonSection>
	);
}