import React from "react";
import {
	Box,
	Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CloseButtonProps = {
	handleClose: () => void;
}

const styles = {
	closeIcon: {
		cursor: "pointer",
	},
}

export default function CloseButton({ handleClose }: CloseButtonProps) {
	return (
		<Grid item xs={12}>
			<Box display="flex" justifyContent="flex-end">
				<CloseIcon onClick={handleClose} sx={styles.closeIcon} />
			</Box>
		</Grid>
	);
}