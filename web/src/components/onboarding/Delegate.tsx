import React from "react";
import {
	Box,
	Typography
} from "@mui/material";
import DelegateButton from "../DelegateButton";

export default function Delegate() {
	return (
		<Box>
			<Typography variant="h4" sx={{fontWeight: "bolder"}}>
				Delegate your voting power
			</Typography>
			<Typography variant="body2">
				This is a final step. Before you can vote to approve potential borrowers, you have to delegate your voting power. You only have to submit this transaction once.
			</Typography>
			<DelegateButton />
		</Box>
	)
}