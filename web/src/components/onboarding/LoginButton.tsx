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

export default function LoginButton() {
	return (
		<Button
			variant="contained"
			href="/login"
			sx={styles.button}
		>
			Login
		</Button>
	);
} 