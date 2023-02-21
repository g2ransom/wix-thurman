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
		padding: "0.5em 1em 0.5em 0em"
	},
	headerTypography: {
		fontWeight: "600",
	},
}

function BorrowersGridHeader() {
	return (
		<Grid container spacing={1} sx={styles.gridHeader}>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Borrower
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Max Limit
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					APR
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Balance
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					Start Date
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography variant="body1" align="left" sx={styles.headerTypography}>
					End Date
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
	startDate: string;
	endDate: string;
};

function BorrowersGridItem({ 
	borrower, 
	maxLimit, 
	apr, 
	balance, 
	startDate, 
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
					{startDate}
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
				borrower="0xfe...ac9d"
				maxLimit="20000"
				apr="20.0%"
				balance="17650"
				startDate="01/03/23"
				endDate="04/03/23"
			/>
			<BorrowersGridItem
				borrower="0xd1...bf3f"
				maxLimit="15000"
				apr="24.0%"
				balance="11240"
				startDate="01/15/23"
				endDate="04/15/23"
			/>
			<BorrowersGridItem
				borrower="0xe5...c7cb"
				maxLimit="22500"
				apr="25.0%"
				balance="16240"
				startDate="01/25/23"
				endDate="04/25/23"
			/>
		</ComingSoonSection>
	);
}