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

type GrantSupplyMPEvent = {
	account: string;
	chainId: string;
	grantSupplyValue: string;
}

type IFormInput = {
	grantSupplyValue: string;
};

const infoPopoverContent = "When you supply grant funds to Thurman, you receive gUSDC that can be used to access rewards later.";

export default function GrantSupplyModalButton() {
	let { account, chainId } = useWeb3React();
	let { usdcBalance, approvedUsdcBalance, update } = useWallet();
	const [state, dispatch] = useReducer(TransactionReducer, initialTransactionState);
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const networkChainId = !chainId ? 1 : chainId;
	approvedUsdcBalance = !approvedUsdcBalance ? "0.0" : approvedUsdcBalance;
	usdcBalance = !usdcBalance ? "0.0" : usdcBalance;
	// const borrowMax = !lineOfCredit?.borrowMax ? "0.0" : lineOfCredit?.borrowMax
	// const hasLineOfCredit: boolean = parseFloat(borrowMax) > 0 ? true : false; 

	const { 
		watch,
		resetField,
		formState: { isDirty, isValid, errors },
		control, 
		handleSubmit 
	} = useForm({
		mode: "onChange",
		defaultValues: {
			grantSupplyValue: ""
		}
	});

	const formErrors: ErrorMessageProps[] = [
		{
			condition: errors.grantSupplyValue && errors.grantSupplyValue.type === "required",
			message: "You must enter a value",
		},
		{
			condition: errors.grantSupplyValue && errors.grantSupplyValue.type === "pattern",
			message: "Write a valid input like 1000.02 or 0.479"
		},
		{
			condition: errors.grantSupplyValue && errors.grantSupplyValue.type === "positive",
			message: "Your number must be greater than zero"
		},
		{
			condition: errors.grantSupplyValue && errors.grantSupplyValue.type === "notGreater",
			message: "Your number must be less than or equal to your balance"
		}
	]

	const watchGrantSupplyValue = watch("grantSupplyValue");

	const isApproved = (watchGrantSupplyValue <= approvedUsdcBalance) || state.approvalSuccess === true;

	let params: ApprovalFuncParams = {
		dispatch: dispatch,
		update: update,
		value: watchGrantSupplyValue,
		networkChainId: networkChainId
	};

	const handleClose = () => {
		if (state.status === "finalSuccess") {
			dispatch({type: "uninitiated"});
			resetField("grantSupplyValue");
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
			const tx = await polemarch.grantSupply(
				NetworkContractMap[networkChainId]["USDC"].address,
				parseUnits(data.grantSupplyValue, NetworkContractMap[networkChainId]["USDC"].decimals),
			)
			dispatch({
				type: "inProgress",
				payload: {
					transactionType: "supply",
				}
			});
			await tx.wait();
			await axios.post<GrantSupplyMPEvent>(
				`${apiUrl}/api/mixpanel-analytics/grant-supply`,
				{ account: account, chainId: chainId, supplyValue: data.grantSupplyValue }
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
			modalHeaderText="Grant Supply USDC"
			infoPopoverContent={infoPopoverContent}
		>
			<Grid item xs={12}>
				<Typography variant="body2" sx={styles.approvedBalanceTypography}>
					Approved Balance: {approvedUsdcBalance}
				</Typography>									
			</Grid>
			<NumberInputField
				control={control}
				name="grantSupplyValue"
				avatarSrc={usdcIcon}
				value={usdcBalance}
				assetName="USDC"
			/>
			<Grid item xs={12}>
				<Box>
					{(approvedUsdcBalance 
						&& watchGrantSupplyValue > approvedUsdcBalance 
						&& errors.grantSupplyValue?.type !== "pattern"
						&& parseFloat(watchGrantSupplyValue) > 0
						&& parseFloat(watchGrantSupplyValue) <= parseFloat(usdcBalance)
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
						notPositive={parseFloat(watchGrantSupplyValue) <= 0}
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