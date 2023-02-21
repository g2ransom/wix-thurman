import React from "react";
import {
	Box,
	Typography
} from "@mui/material";

const styles = {
	typography: {
		margin: "1em 0em 1em 0em",
		fontWeight: "800",
	},
};

export default function Footer() {
	return (
		<Box display="flex" justifyContent="center">
			<Typography variant="body1" sx={styles.typography}>
				© 2023 Thurman Labs
			</Typography>
		</Box>
	);
}