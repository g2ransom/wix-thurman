import React from "react";
import {
	Box,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { 
	Control,
	Controller 
} from "react-hook-form";

export type EmailInputFieldProps = {
	control: Control<any>;
	name: string;
}

export default function EmailInputField({ control, name }: EmailInputFieldProps) {
	return (
		<Grid item xs={12}>
			<Controller
				name={name}
				control={control}
				rules={{
					required: true,
					pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
				}}
				render={({ field }) => (																						
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						size="small"
						inputProps={{style: { color: "darkGray" }}}
						InputLabelProps={{style: { color: "darkGray" }}}
							{...field}
					/>
				)}
			/>
		</Grid>
	)
}