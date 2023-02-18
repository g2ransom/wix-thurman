import React from "react";
import {
	Avatar,
	Box,
	Grid,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { 
	Control,
	Controller 
} from "react-hook-form";

export type NumberInputFieldProps = {
	control: Control<any>;
	name: string;
	avatarSrc: string;
	value: string | undefined;
	assetName: string;
}

type EndAdornmentProps = {
	value: string | undefined;
	avatarSrc: string;
	assetName: string;
}

const styles = {
	assetTypography: {
		fontSize: "1.25em",
		marginLeft: "0.15em",
		fontWeight: "600",
		color: "black",
	},
	avatar: {
		width: "1.3em",
		height: "1.3em",
		marginTop: ".1em",
	},
	typography: {
		fontSize: "0.725em",
		marginBottom: "0.15em",
		fontWeight: "600",
		color: "#808080",
	},

}

function EndAdornment({ avatarSrc, value, assetName }: EndAdornmentProps) {
	let val = value ? parseFloat(value).toFixed(2): "0.00";
	return (
		<Stack direction="column">
				<Box display="flex" justifyContent="flex-end">
					<Stack direction="row">
						<Avatar src={avatarSrc} sx={styles.avatar} />
						<Typography variant="body1" sx={styles.assetTypography}>
							{assetName}
						</Typography>
					</Stack>
				</Box>
			<Typography variant="body2" sx={styles.typography}>
				Your Balance is {val}
			</Typography>
		</Stack>
	);
}

export default function NumberInputField({
	control,
	name,
	avatarSrc,
	value,
	assetName
} : NumberInputFieldProps
) {
	let val = !value ? "0.00" : value;
	return (
		<Grid item xs={12}>
			<Controller
				name={name}
				control={control}
				rules={{
					required: true,
					pattern: /^\d{0,24}?(\.\d{0,24})?$/,
					validate: {
						positive: v => parseFloat(v) > 0,
						notGreater: v => parseFloat(v) <= parseFloat(val)
					}
				}}
				render={({ field }) => (																						
					<TextField
						id="outlined-basic"
						label="Amount"
						variant="outlined"
						size="medium"
						InputProps={
							{endAdornment: 
								<InputAdornment position="end">
									{<EndAdornment avatarSrc={avatarSrc} value={value} assetName={assetName} />}
								</InputAdornment>
							}
						}
						fullWidth
							{...field}
					/>
				)}
			/>
		</Grid>
	);
}