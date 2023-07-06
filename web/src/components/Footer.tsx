import React from "react";
import {
	Box,
	Typography
} from "@mui/material";

const styles = {
	box: {
		backgroundColor: "white",
		position: "fixed",
		bottom: 0,
		width: "100%",
		height: "3em",
	},
	typography: {
		margin: "1em 0em 1em 0em",
		fontWeight: "800",
	},
};

export default function Footer() {
	return (
		<Box 
			sx={styles.box}
		>
			<Typography variant="body1" align="center" sx={styles.typography}>
				© 2023 Thurman Labs
			</Typography>
		</Box>
	);
}