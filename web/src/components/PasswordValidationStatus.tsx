import React from "react";
import {
	Grid,
	Stack,
	Typography
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type PasswordProps = {
	password: string;
}

type PasswordStatusItemProps = {
	item: boolean;
	message: string;
};

function PasswordStatusItem({ item, message }: PasswordStatusItemProps) {
	return (
		<>
		{item ? (
				<Grid item xs={12}>
					<Stack alignItems="center" justifyContent="center" direction="row" gap={1}>
						<CheckCircleIcon />
						<Typography variant="body1">{message}</Typography>
					</Stack>
				</Grid>
			) : (
				<Grid item xs={12}>
					<Stack alignItems="center" justifyContent="center" direction="row" gap={1}>
						<CancelIcon />
						<Typography variant="body1">{message}</Typography>
					</Stack>
				</Grid>
			)
		}
		</>
	)
}

export default function PasswordStatus({ password }: PasswordProps) {
	return (
		<>
		<PasswordStatusItem 
			item={password.length <= 16 && password.length >= 8}
			message="has length between 8 and 16 letters"
		/>
		<PasswordStatusItem
			item={/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)}
			message="needs at least one special character"
		/>
		<PasswordStatusItem
			item={/(?=.*[a-z])/.test(password)}
			message="needs at least one lowercase letter"
		/>
		<PasswordStatusItem
			item={/(?=.*[A-Z])/.test(password)}
			message="needs at least one uppercase letter"
		/>
		<PasswordStatusItem
			item={/^\S*$/.test(password)}
			message="no spaces"
		/>
		<PasswordStatusItem
			item={/(?=.*[0-9])/.test(password)}
			message="at least one digit"
		/>

		</>
		);
}