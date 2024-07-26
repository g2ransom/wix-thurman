import React, { useState, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import { 
	ethers,
	parseUnits,
	Contract,
} from "ethers";
import {
	Box,
	Grid,
	Typography
} from "@mui/material";
import { 
	useForm,
	SubmitHandler
} from "react-hook-form";
import axios from "axios";
import useWallet from "../hooks/useWallet";
import {
	initialTransactionState,
	TransactionReducer
} from "../reducers/TransactionReducer";
import ApprovalButton from "./ApprovalButton";
import ErrorMessage, { ErrorMessageProps } from "./ErrorMessage";
import NumberInputField from "./NumberInputField";
import PostApprovalButton from "./PostApprovalButton";
import TransactionModal from "./TransactionModal";
import TransactionModalInfo from "./TransactionModalInfo";
import { apiUrl, NetworkContractMap } from "../constants/constants";
import { 
	handleApproval, 
	ApprovalFuncParams,
	ErrorWithCode,
	ERROR_CODE_TX_REQUEST_REJECTED 
} from "../utils/ethersUtils";
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

type SupplyMPEvent = {
	account: string;
	chainId: string;
	supplyValue: string;
}

type IFormInput = {
	supplyValue: string;
};

const infoPopoverContent = "When you supply funds to Thurman, you receive an interest accruing token (sUSDC) that can be withdrawn in exchange for your supplied asset (USDC) at a later date.";

export default function SupplyModalButton() {
	let { chainId } = useWeb3React();
	let { account, approvedUsdcBalance, usdcBalance, update } = useWallet();
	const [state, dispatch] = useReducer(TransactionReducer, initialTransactionState);
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const networkChainId = !chainId ? 1 : chainId;
	approvedUsdcBalance = !approvedUsdcBalance ? "0.0" : approvedUsdcBalance;
	usdcBalance = !usdcBalance ? "0.0" : usdcBalance;

	const { 
		watch,
		resetField,
		formState: { isDirty, isValid, errors },
		control, 
		handleSubmit 
	} = useForm({
		mode: "onChange",
		defaultValues: {
			supplyValue: ""
		}
	});

	const formErrors: ErrorMessageProps[] = [
		{
			condition: errors.supplyValue && errors.supplyValue.type === "required",
			message: "You must enter a value",
		},
		{
			condition: errors.supplyValue && errors.supplyValue.type === "pattern",
			message: "Write a valid input like 1000.02 or 0.479"
		},
		{
			condition: errors.supplyValue && errors.supplyValue.type === "positive",
			message: "Your number must be greater than zero"
		},
		{
			condition: errors.supplyValue && errors.supplyValue.type === "notGreater",
			message: "Your number must be less than or equal to your balance"
		}
	]
	
	const watchSupplyValue = watch("supplyValue");

	const isApproved = (watchSupplyValue <= approvedUsdcBalance) || state.approvalSuccess === true;

	let params: ApprovalFuncParams = {
		dispatch: dispatch,
		update: update,
		value: watchSupplyValue,
		networkChainId: networkChainId
	};

	const handleClose = () => {
		if (state.status === "finalSuccess") {
			dispatch({type: "uninitiated"});
			resetField("supplyValue");
		}
		setOpen(false);
	}

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
			const tx = await polemarch.supply(
				NetworkContractMap[networkChainId]["USDC"].address,
				parseUnits(data.supplyValue, NetworkContractMap[networkChainId]["USDC"].decimals),
			)
			dispatch({
				type: "inProgress",
				payload: {
					transactionType: "supply",
				}
			});
			await tx.wait();
			await axios.post<SupplyMPEvent>(
				`${apiUrl}/api/mixpanel-analytics/supply`,
				{ account: account, chainId: chainId, supplyValue: data.supplyValue }
			)
			dispatch({
				type: "finalSuccess",
				payload: {
					transactionType: "supply",
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
					transactionType: "supply",
					error: "The transaction failed 🤦🏿‍♂️",
				}
			});
		}
	};
           
	return (
		<TransactionModal
			modalButtonName="Supply"
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			modalHeaderText="Supply USDC"
			infoPopoverContent={infoPopoverContent}
		>
			<Grid item xs={12}>
				<Typography variant="body2" sx={styles.approvedBalanceTypography}>
					Approved Balance: {approvedUsdcBalance}
				</Typography>									
			</Grid>
			<NumberInputField
				control={control}
				name="supplyValue"
				avatarSrc={usdcIcon}
				value={usdcBalance}
				assetName="USDC"
			/>
			<Grid item xs={12}>
				<Box>
					{(approvedUsdcBalance 
						&& watchSupplyValue > approvedUsdcBalance 
						&& errors.supplyValue?.type !== "pattern"
						&& parseFloat(watchSupplyValue) > 0
						&& parseFloat(watchSupplyValue) <= parseFloat(usdcBalance)
						) && (									
						<ApprovalButton
							isDirty={isDirty}
							isValid={isValid}
							state={state}
							params={params}
							handleApproval={handleApproval}
							asset="USDC"
						/>									
					)}
					<PostApprovalButton
						isDirty={isDirty}
						isValid={isValid}
						isApproved={isApproved}
						stateCondition={(state.transactionType === "supply" && state.status === "inProgress")}
						notPositive={parseFloat(watchSupplyValue) <= 0}
						buttonText="Supply USDC"
						onClick={handleSubmit(onSubmit)}
					/>
				</Box>
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
	);
}