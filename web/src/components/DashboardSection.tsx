import React from "react";
import {
	Avatar,
	Box,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";

type DashboardSectionProps = {
	account: string | undefined;
	title: string;
	asset: string;
	avatarIcon: string;
	balance: string | undefined;
	button: React.ReactElement<any, any>;
}

const styles = {
	paper: {
		margin: "1em 1em 1em 1em",
		padding: "1em 1em 1em 1em",
		borderColor: "#B0B0B0",
	},
	avatarIcon: {
    width: "1.25em",
    height: "1.25em",
  },
  sectionTypography: {
  	fontWeight: "600",
  },
  stack: {
    margin: "0.75em 0 0.75em 0",
  },
}

export default function DashboardSection({
	account,
	title,
	asset,
	avatarIcon,
	balance,
	button
}: DashboardSectionProps) {
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
					<Box display="flex" justifyContent="space-between">
					  <>
					  <Stack direction="row" spacing={1} alignItems="center" sx={styles.stack}>
					    <Avatar src={avatarIcon} sx={{...styles.avatarIcon, ...(!account && 
					    	{filter: "grayscale(100%)", 
					    	WebkitFilter: "grayscale(100%)"
					    })}} />
					    {balance ? 
					    	(<Typography variant="body1" sx={styles.sectionTypography}>
					      	{asset} Balance: {parseFloat(balance).toFixed(3)}
					    	</Typography>) : (
					    	<Typography variant="body1" sx={styles.sectionTypography}>
					    		{asset} Balance: {parseFloat("0").toFixed(3)}
					    	</Typography>
					    )}
					  </Stack>
					  {button}
					  </>
				  </Box>
				</Box>
			</Paper>
		</Grid>
	);
}