import React, { useState } from "react";
import {
	Button,
	Grid
} from "@mui/material";
import { 
	useForm,
	SubmitHandler
} from "react-hook-form";
import TextInputField from "../TextInputField";
import ErrorMessage, { ErrorMessageProps } from "../ErrorMessage";

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

type IFormInput = {
	passwordValue: string;
};

const specialChar = /(?=.*\W)/;

export default function EmailSignUpButton() {
	const [continueSignUp, setContinueSignUp] = useState<boolean>(false);
	const handleClick = () => setContinueSignUp(true);

	const { 
		watch,
		resetField,
		formState: { isDirty, isValid, errors },
		control, 
		handleSubmit 
	} = useForm({
		mode: "onChange",
		defaultValues: {
			passwordValue: ""
		}
	});

	const formErrors: ErrorMessageProps[] = [
		{
			condition: errors.passwordValue && errors.passwordValue.type === "required",
			message: "You must enter a password",
		},
		{
			condition: errors.passwordValue && errors.passwordValue.type === "pattern",
			message: "You must enter a valid password"
		},
		{
			condition: errors.passwordValue && errors.passwordValue.type === "hasSpecial",
			message: "You must include a special character"
		},
	]

	return (
		<Grid item xs={12}>
			{continueSignUp ? (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<TextInputField
							control={control}
							name="passwordValue"
							rules={{
								required: true,
								pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
								validate: {
									hasSpecial: v => specialChar.test(v)
								}
							}}
							label="Password"
						/>
					</Grid>
					<Grid item xs={12}>
						{formErrors.map((formError, i) => (
							<ErrorMessage
								key={i}
								condition={formError.condition}
								message={formError.message}
							/>
						))}
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							sx={styles.button}
							onClick={handleClick}
						>
							Create an account
						</Button>
					</Grid>
				</Grid>
			) : (
				<Button
					variant="contained"
					sx={styles.button}
					onClick={handleClick}
				>
					Continue with email
				</Button>
			)
		}
		</Grid>
	)
}