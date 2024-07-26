import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Button,
	Grid
} from "@mui/material";
import { 
	useForm,
	SubmitHandler
} from "react-hook-form";
import useWallet from "../../hooks/useWallet";
import TextInputField from "../TextInputField";
import PasswordStatus from "../PasswordValidationStatus";
import ErrorMessage, { ErrorMessageProps } from "../ErrorMessage";
import DevControlledWalletButton from "./DevControlledWalletButton";

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
	emailValue: string;
	passwordValue: string;
};

type DevControlledAuthProps = {
	routeUrl: string;
	submitButtonName: string;
};

export default function DevControlledAuthForm({ routeUrl, submitButtonName }: DevControlledAuthProps) {
	const [continueSignUp, setContinueSignUp] = useState<boolean>(false);
	const { update } = useWallet()
	const navigate = useNavigate();
	const [userId, setUserId] = useState<Number>(0);
	const handleClick = () => setContinueSignUp(true);

	const { 
		watch,
		formState: { isValid, errors },
		control, 
		handleSubmit 
	} = useForm({
		mode: "onChange",
		defaultValues: {
			emailValue: "",
			passwordValue: ""
		}
	});

	const emailFormErrors: ErrorMessageProps[] = [	
		{
			condition: errors.emailValue && errors.emailValue.type === "required",
			message: "You must enter an email",
		},
		{
			condition: errors.emailValue && errors.emailValue.type === "pattern",
			message: "You must enter a valid email like john@thurman.io"
		},
	]

	const passwordFormErrors: ErrorMessageProps[] = [
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
	];

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			let res = await axios.post(
				routeUrl,
				{ email: data.emailValue, password: data.passwordValue },
				{ withCredentials: true }
			);
			console.log(res.data);
			update();
			navigate("/");

		} catch (e) {
			console.error(e);
		}
	}

	const handleTokenBalances = async () => {
		try {
			let res = await axios.get("/api/user", { withCredentials: true });
			console.log(res.data);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<>
		<TextInputField
			control={control}
			name="emailValue"
			rules={{
				required: true,
				pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			}}
			label="Email"
			type="email"
		/>
		<Grid item xs={12}>
			{emailFormErrors.map((formError, i) => (
				<ErrorMessage
					key={i}
					condition={formError.condition}
					message={formError.message}
				/>
			))}
		</Grid>
		{!continueSignUp ? (
			<>
			<Grid item xs={12}>
				<Button
					variant="contained"
					sx={styles.button}
					disabled={!isValid}
					onClick={handleClick}
				>
					Continue with email
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Button
					variant="contained"
					onClick={handleTokenBalances}
					sx={styles.button}
				>
					Token Balances
				</Button>
			</Grid>
			</>
			) : (
				<>
				<Grid item xs={12}>
					<TextInputField
						control={control}
						name="passwordValue"
						rules={{
							required: true,
							pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
						}}
						label="Password"
						type="password"
					/>
				</Grid>
				<Grid item xs={12}>
					{passwordFormErrors.map((formError, i) => (
						<ErrorMessage
							key={i}
							condition={formError.condition}
							message={formError.message}
						/>
					))}
					<PasswordStatus
					 password={watch("passwordValue")}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						disabled={!isValid}
						onClick={handleSubmit(onSubmit)}
						sx={styles.button}
					>
						{submitButtonName}
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						onClick={handleTokenBalances}
						sx={styles.button}
					>
						Token Balances
					</Button>
				</Grid>
				</>
			)
		}
		</>
	);
}
