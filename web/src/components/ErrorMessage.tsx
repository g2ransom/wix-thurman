import React from "react";
import { 
	Grid,
	Typography
} from "@mui/material";

export type ErrorMessageProps = {
	condition: boolean | undefined;
	message: string;
};

const styles = {
	errorTypography: {
		fontSize: "0.75em",
		fontWeight: "600",
		color: "#A30000",
	},
}

export default function ErrorMessage({ condition, message }: ErrorMessageProps) {
	return (
		<>
			{condition && (
			  <Grid item xs={12}>
		  		<Typography sx={styles.errorTypography}>
		  			{message}
		  		</Typography>
			  </Grid>	
			)}
		</>
	);
}