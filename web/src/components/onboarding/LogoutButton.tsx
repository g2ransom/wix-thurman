import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import useWallet from "../../hooks/useWallet";

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

export default function LogoutButton() {
	const { update } = useWallet();

	const handleLogout = async () => {
		await axios.post("/api/auth/logout");
		console.log("user just logged out.");
		update();
	};

	return (
		<Button
			variant="contained"
			sx={styles.button}
			onClick={handleLogout}
		>
			Logout
		</Button>
	);
} 