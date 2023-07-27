import React from "react";
import {
	Box,
	Grid,
	Paper,
	Typography,
} from "@mui/material";
// import useWallet from "../hooks/useWallet";
import { useWeb3React } from "@web3-react/core";

type DashboardSectionProps = {
	title: string;
	children?: 
		| React.ReactChild 
		| React.ReactChild[];
}

const styles = {
	paper: {
		margin: "1em 1em 1em 1em",
		padding: "1em 1em 1em 1em",
		borderColor: "#B0B0B0",
	},
  sectionTypography: {
  	fontWeight: "600",
  },
}

export default function DashboardSection({
	title,
	children
}: DashboardSectionProps) {
	const { account } = useWeb3React();

	return (
		<Grid item xs={12} sm={6}>
			<Paper elevation={0} variant="outlined" sx={{...styles.paper, ...(!account && {
				backgroundColor: "#C5C5C5", 
				color: "#808080", 
				border: "none"
			})}}>
				<Box>
					<Typography 
						variant="h6" 
						align="left"
						sx={styles.sectionTypography}
					>
						{title}
					</Typography>
					{children}
				</Box>
			</Paper>
		</Grid>
	);
}