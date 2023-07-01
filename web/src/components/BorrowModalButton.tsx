import React, { useState, useReducer } from "react";
import { 
	ethers,
	parseUnits,
	Contract,
} from "ethers";
import {
	Box,
	Button,
	Grid,
	Typography
} from "@mui/material";
import { 
	useForm,
	SubmitHandler
} from "react-hook-form";
import { TransactionReducer, initialTransactionState } from "../reducers/TransactionReducer";
import TransactionModal from "./TransactionModal";
import TransactionModalInfo from "./TransactionModalInfo";
import useWallet from "../hooks/useWallet";
import ErrorMessage, { ErrorMessageProps } from "./ErrorMessage";
import NumberInputField from "./NumberInputField";
import { NetworkContractMap } from "../constants/constants";
import usdcIcon from "../images/usd-coin-usdc-logo.png";

const styles = {
	button: {
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#525252",
		},
		fontWeight: "600"
	},
	modal: {
		display: "flex",
		alignItems: "center", 
		justifyContent: "center",
	},
	paper: {
    position: "absolute",
    maxWidth: 450,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    padding: "1em 1em 1em 1em",
	},
  modalHeaderTypography: {
  	fontWeight: "800",
  },
	typography: {
		marginBottom: "0.15em",
	},
	approvedBalanceTypography: {
		fontSize: "0.75em",
		fontWeight: "600",
		color: "#484848",
	},
};

type IFormInput = {
	borrowValue: string;
};

type ErrorWithCode = {
	code: number;
	[key: string]: any;
};

const ERROR_CODE_TX_REQUEST_REJECTED = 4001;
const infoPopoverContent = "When you supply funds to Thurman, you receive an interest accruing token (dUSDC) must be repayed using (USDC) at by your debt's maturity date.";

export default function BorrowModalButton() {
	let { account, approvedUsdcBalance, usdcBalance, dUsdcBalance, chainId, lineOfCredit, update } = useWallet();
	const [state, dispatch] = useReducer(TransactionReducer, initialTransactionState);
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const networkChainId = !chainId ? "0x1" : chainId;
	approvedUsdcBalance = !approvedUsdcBalance ? "0.0" : approvedUsdcBalance;
	usdcBalance = !usdcBalance ? "0.0" : usdcBalance;
	dUsdcBalance = !dUsdcBalance ? "0.0" : dUsdcBalance;
	const borrowMax = !lineOfCredit?.borrowMax ? "0.0" : lineOfCredit?.borrowMax
	const hasLineOfCredit: boolean = parseFloat(borrowMax) > 0 ? true : false;

	const { 
		watch,
		resetField,
		formState: { isDirty, isValid, errors },
		control, 
		handleSubmit 
	} = useForm({
		mode: "onChange",
		defaultValues: {
			borrowValue: ""
		}
	});

	const formErrors: ErrorMessageProps[] = [
		{
			condition: errors.borrowValue && errors.borrowValue.type === "required",
			message: "You must enter a value",
		},
		{
			condition: errors.borrowValue && errors.borrowValue.type === "pattern",
			message: "Write a valid input like 1000.02 or 0.479"
		},
		{
			condition: errors.borrowValue && errors.borrowValue.type === "positive",
			message: "Your number must be greater than zero"
		},
		{
			condition: errors.borrowValue && errors.borrowValue.type === "notGreater",
			message: "Your number must put your total balance below your borrowMax"
		}
	]

	const watchBorrowValue = watch("borrowValue");

	const handleClose = () => {
		if (state.status === "finalSuccess") {
			dispatch({type: "uninitiated"});
			resetField("borrowValue");
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
			const tx = await polemarch.borrow(
				NetworkContractMap[networkChainId]["USDC"].address,
				parseUnits(data.borrowValue, NetworkContractMap[networkChainId]["sUSDC"].decimals),
			)
			dispatch({
				type: "inProgress",
				payload: {
					transactionType: "borrow",
				}
			});
			await tx.wait();
			dispatch({
				type: "finalSuccess",
				payload: {
					transactionType: "borrow",
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
					transactionType: "borrow",
					error: "The transaction failed 🤦🏿‍♂️",
				}
			});
		}
	};


	return (
		<TransactionModal
			modalButtonName="Borrow"
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			modalHeaderText="Borrow USDC"
			infoPopoverContent={infoPopoverContent}
		>
			<Grid item xs={12}>
				<Typography variant="body2" sx={styles.approvedBalanceTypography}>
					Approved Balance: {approvedUsdcBalance}
				</Typography>									
			</Grid>
			<NumberInputField
				control={control}
				name="borrowValue"
				avatarSrc={usdcIcon}
				value={(parseFloat(borrowMax) - parseFloat(dUsdcBalance)).toString()}
				assetName="USDC"
			/>
			<Grid item xs={12}>
				<Button
					variant="contained"
					onClick={handleSubmit(onSubmit)}
					disabled={
						!isDirty 
						|| !isValid 
						|| (state.transactionType === "borrow" && state.status === "inProgress")
						|| parseFloat(watchBorrowValue) <= 0
					}
					sx={styles.button}
					fullWidth
				>
					Borrow USDC
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