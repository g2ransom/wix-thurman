import React, { useState, useReducer } from "react";
import { 
	ethers,
	parseUnits,
	Contract,
} from "ethers";
import {
	Button,
	Grid,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { TransactionReducer, initialTransactionState } from "../reducers/TransactionReducer";
import TransactionModal from "./TransactionModal";
import ErrorMessage, { ErrorMessageProps } from "./ErrorMessage";
import NumberInputField from "./NumberInputField";
import TransactionModalInfo from "./TransactionModalInfo";
import useWallet from "../hooks/useWallet";
import { NetworkContractMap } from "../constants/constants";
import usdcIcon from "../images/usd-coin-usdc-logo.png";

type IFormInput = {
	withdrawValue: string;
};

type ErrorWithCode = {
	code: number;
	[key: string]: any;
};

const styles = {
	button: {
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#525252",
		},
		fontWeight: "600"
	},
};

const ERROR_CODE_TX_REQUEST_REJECTED = 4001;

const infoPopoverContent = "When you withdraw funds, you burn a specific amount of interest accruing token (sUSDC) and receive an equivalent amount of the underlying asset (USDC) in return.";

export default function WithdrawModalButton() {
	let { account, sUsdcBalance, chainId, update } = useWallet();
	const [state, dispatch] = useReducer(TransactionReducer, initialTransactionState);
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const networkChainId = !chainId ? "0x1" : chainId;

	const { 
		watch,
		resetField,
		formState: { isDirty, isValid, errors },
		control, 
		handleSubmit 
	} = useForm({
		mode: "onChange",
		defaultValues: {
			withdrawValue: ""
		}
	});

	const formErrors: ErrorMessageProps[] = [
		{
			condition: errors.withdrawValue && errors.withdrawValue.type === "required",
			message: "You must enter a value",
		},
		{
			condition: errors.withdrawValue && errors.withdrawValue.type === "pattern",
			message: "Write a valid input like 1.02 or 0.479"
		},
		{
			condition: errors.withdrawValue && errors.withdrawValue.type === "positive",
			message: "Your number must be greater than zero"
		},
		{
			condition: errors.withdrawValue && errors.withdrawValue.type === "notGreater",
			message: "Your number must be less than or equal to your balance"
		}
	]
	
	const watchWithdrawValue = watch("withdrawValue");

	const handleClose = () => {
		if (state.status === "finalSuccess") {
			dispatch({type: "uninitiated"});
			resetField("withdrawValue");
		}
		setOpen(false);
	};

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const { ethereum } = window;
		const provider = new ethers.BrowserProvider(ethereum as any);
		const signer = await provider.getSigner();

		const polemarch: Contract = new ethers.Contract(
			NetworkContractMap[networkChainId]["Polemarch"].address,
			NetworkContractMap[networkChainId]["Polemarch"].abi,
			signer,
		);

		try {
			const tx = await polemarch.withdraw(
				NetworkContractMap[networkChainId]["USDC"].address,
				parseUnits(data.withdrawValue, NetworkContractMap[networkChainId]["sUSDC"].decimals),
			)
			dispatch({
				type: "inProgress",
				payload: {
					transactionType: "withdraw",
				}
			});
			await tx.wait();
			dispatch({
				type: "finalSuccess",
				payload: {
					transactionType: "withdraw",
					txHash: tx.hash,
				}
			});
			update();
		} catch (e) {
			console.error(e);
			if ("code" in (e as { [key: string]: any })) {
			  if ((e as ErrorWithCode).code === ERROR_CODE_TX_REQUEST_REJECTED) {
			  	dispatch({ 
			  		type: "permissionRejected",
			  		payload: {
			  			error: "You rejected the transaction 🤷🏿‍♂️",
			  		}
			  	});
			    return;
			  }
			}
			dispatch({
				type: "failed",
				payload: {
					transactionType: "withdraw",
					error: "The transaction failed 🤦🏿‍♂️",
				}
			});
		}
	};

	return (
		<TransactionModal
			account={account}
			chainId={networkChainId}
			modalButtonName="Withdraw"
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			modalHeaderText="Withdraw USDC"
			infoPopoverContent={infoPopoverContent}
		>
			<NumberInputField
				control={control}
				name="withdrawValue"
				avatarSrc={usdcIcon}
				value={sUsdcBalance}
				assetName="sUSDC"
			/>
			<Grid item xs={12}>
				<Button
					variant="contained"
					onClick={handleSubmit(onSubmit)}
					disabled={
						!isDirty 
						|| !isValid 
						|| (state.transactionType === "withdraw" && state.status === "inProgress")
						|| parseFloat(watchWithdrawValue) <= 0
					}
					sx={styles.button}
					fullWidth
				>
					Withdraw USDC
				</Button>
			</Grid>
			<>
				{formErrors.map((formError, i) => (
					<ErrorMessage
						key={i}
						condition={formError.condition}
						message={formError.message}
					/>
				))}
			</>
			<TransactionModalInfo 
				state={state} 
				networkChainId={networkChainId} 
			/>
		</TransactionModal>
	)
}