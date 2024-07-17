import React from "react";
import axios from "axios";
import {
	Button,
	Grid
} from "@mui/material";

type DCWalletProps = {
	name: string;
	id: string;
}

const styles = {
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
		marginLeft: "1.5em",
		width: "15em",
	},
}

export default function DevControlledWalletButton({ name, id }: DCWalletProps) {
	const handleSubmit = async () => {
		let res = await axios.post("/api/wallet/create",
			{name: name, id: id}
		);
		console.log(res.data);
	}

	return (
		<Grid item xs={12}>
			<Button
				variant="contained"
				onClick={handleSubmit}
				sx={styles.button}
			>
				Create a controlled wallet
			</Button>
		</Grid>
	);

}