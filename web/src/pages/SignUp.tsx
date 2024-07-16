import React from "react";
import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Paper,
	TextField
} from "@mui/material";
import { 
	useForm,
	SubmitHandler
} from "react-hook-form";
import ConnectWallet from "../components/connectWallet/ConnectWallet";
import ErrorMessage, { ErrorMessageProps } from "../components/ErrorMessage";
import EmailInputField from "../components/EmailInputField";
import TextInputField from "../components/TextInputField";
import EmailSignUpButton from "../components/onboarding/EmailSignUpButton";

const styles = {
	container: {
		backgroundColor: "#E8E8E8",
		minHeight: "100vh",
		paddingBottom: "5em",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
		marginLeft: "1.5em",
		width: "15em",
	},
	box: {
		marginTop: "1.5em",
		width: "40%"
	},
	divider: {
		width: "15em",
		fontWeight: "700",
		fontSize: "0.85em",
		color: "gray",
	},
	formPaper: {
    padding: "1em 1em 1.85em 1.85em",
	},
	emailField: {
		fontSize: "0.5em",
		color: "gray"
	},
}

type IFormInput = {
	emailValue: string;
};

export default function SignUp() {
	
	const { 
		watch,
		resetField,
		formState: { isDirty, isValid, errors },
		control, 
		handleSubmit 
	} = useForm({
		mode: "onChange",
		defaultValues: {
			emailValue: ""
		}
	});

	const formErrors: ErrorMessageProps[] = [
		{
			condition: errors.emailValue && errors.emailValue.type === "required",
			message: "You must enter an email",
		},
		{
			condition: errors.emailValue && errors.emailValue.type === "pattern",
			message: "You must enter a valid email like john@thurman.io"
		},
	]

	// const watchEmailValue = watch("emailValue");

	return (
		<Container maxWidth={false} sx={styles.container}>
			<Box display="flex" alignItems="center" justifyContent="center" sx={styles.box}>
				<Paper elevation={0} sx={styles.formPaper}>
					<Grid container spacing={1}>
						<TextInputField
							control={control}
							name="emailValue"
							rules={{
								required: true,
								pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							}}
							label="Email"
						/>
						<Grid item xs={12}>
							{formErrors.map((formError, i) => (
								<ErrorMessage
									key={i}
									condition={formError.condition}
									message={formError.message}
								/>
							))}
						</Grid>
						<EmailSignUpButton />
						<Grid item xs={12}>
							<Box display="flex" alignItems="center" justifyContent="center">
								<Divider
									sx={styles.divider}
									variant="middle"
								> 
									or continue with 
								</Divider>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<ConnectWallet />
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								sx={styles.button}
							>
								Google
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Container>
	);
}