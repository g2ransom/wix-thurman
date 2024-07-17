import React from "react";
import {
	Grid,
	TextField
} from "@mui/material";
import { 
	Control,
	Controller,
	RegisterOptions
} from "react-hook-form";

export type TextInputFieldProps = {
	control: Control<any>;
	name: string;
	rules: RegisterOptions;
	label: string;
}

export default function TextInputField({ control, name, rules, label }: TextInputFieldProps) {
	return (
		<Grid item xs={12}>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field }) => (																						
					<TextField
						id="outlined-basic"
						label={label}
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