import React from "react";
import { Button } from "@mui/material";

const styles = {
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
		marginLeft: "1.5em",
	},
}

export default function SignUpButton() {
	return (
		<Button
			variant="contained"
			href="/signup"
			sx={styles.button}
		>
			Sign Up
		</Button>
	);
} 