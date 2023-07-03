import React from "react";
import {
	Avatar,
	Box,
	Typography,
	Stack
} from "@mui/material";
import useWallet from "../hooks/useWallet";

export type ContentProps = {
	balanceType: string;
	avatarIcon: string;
	balance: string | undefined;
	button: React.ReactElement<any, any>;
}

const styles = {
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

export default function SimpleDashboardContent({
	balanceType,
	avatarIcon,
	balance,
	button
}: ContentProps) {
	const { account } = useWallet();

	return (
		<Box display="flex" justifyContent="space-between">
		  <>
		  <Stack direction="row" spacing={1} alignItems="center" sx={styles.stack}>
		    <Avatar src={avatarIcon} sx={{...styles.avatarIcon, ...(!account && 
		    	{filter: "grayscale(100%)", 
		    	WebkitFilter: "grayscale(100%)"
		    })}} />
		    {balance ? 
		    	(<Typography variant="body1" sx={styles.sectionTypography}>
		      	{balanceType} Balance: {parseFloat(balance).toFixed(3)}
		    	</Typography>) : (
		    	<Typography variant="body1" sx={styles.sectionTypography}>
		    		{balanceType} Balance: {parseFloat("0").toFixed(3)}
		    	</Typography>
		    )}
		  </Stack>
		  {button}
		  </>
	  </Box>
	);
}