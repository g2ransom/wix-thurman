import React from "react";
import { 
	Box,
	Typography,
} from "@mui/material";
import SupplyModalButton from "../SupplyModalButton";

export default function Supply() {
	return (
		<Box>
			<Typography variant="h4" sx={{fontWeight: "bolder"}}>
				Supply USDC
			</Typography>
			<Typography variant="body2">
				This is a big step. Supplying USDC will require you to use your crypto wallet to supply funds to our lending pool. It's a two step process: approval and supply.
			</Typography>
			<SupplyModalButton />
		</Box>
	);
}