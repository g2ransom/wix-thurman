import React from "react";
import {
	Box,
	Chip,
	Grid,
	Paper,
	Typography
} from "@mui/material";

type ComingSoonSectionProps = {
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
		backgroundColor: "#C5C5C5", 
		color: "#808080",
	},
	sectionTypography: {
  	fontWeight: "600",
  },
  chip: {
  	borderWidth: "medium",
  	borderColor: "#808080",
  	fontWeight: "600",
  	color: "#808080",
  }
};

export default function ComingSoonSection({ title, children }: ComingSoonSectionProps) {
	return (
		<Grid item xs={12} sm={6}>
			<Paper sx={styles.paper}>
				<Box display="flex" justifyContent="space-between">
					<Typography 
						variant="h6" 
						align="left"
						sx={styles.sectionTypography}
					>
						{title}
					</Typography>
					<Chip label="Coming Soon" variant="outlined" sx={styles.chip} />	
				</Box>
				<Box>
					{children}
				</Box>
			</Paper>
		</Grid>
	);
}