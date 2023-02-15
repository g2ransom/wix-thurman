import React, { useState, useReducer } from "react";
import { 
	ethers,
	parseUnits,
	Contract,
} from "ethers";
import {
	Avatar,
	Box,
	Button,
	Grid,
	InputAdornment,
	LinearProgress,
	Link,
	Modal,
	Paper,
	TextField,
	Typography
} from "@mui/material";
import { 
	useForm,
	Controller, 
	SubmitHandler
} from "react-hook-form";
import useWallet from "../hooks/useWallet";
import {
	initialTransactionState,
	TransactionReducer
} from "../reducers/TransactionReducer";
import CloseButton from "./CloseButton";
import ErrorMessage, { ErrorMessageProps } from "./ErrorMessage";
import ApprovalButton from "./ApprovalButton";
import usdcIcon from "../images/usdc.png"
import { 
	chainMap,
	NetworkContractMap 
} from "../constants/constants";

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
	errorTypography: {
		fontSize: "0.75em",
		fontWeight: "600",
		color: "#A30000",
	},
	usdc: {
		width: "0.75em",
    height: "0.75em",
	},
	usdcTextField: {
		width: "1.25em",
		height: "1.25em",
	},
};

type IFormInput = {
	supplyValue: string;
};

type ErrorWithCode = {
	code: number;
	[key: string]: any;
};

const ERROR_CODE_TX_REQUEST_REJECTED = 4001;


export default function SupplyModalButton() {
	let { approvedUsdcBalance, chainId, update } = useWallet();
	const [state, dispatch] = useReducer(TransactionReducer, initialTransactionState);
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const networkChainId = !chainId ? "0x1" : chainId;
	approvedUsdcBalance = !approvedUsdcBalance ? "0.0" : approvedUsdcBalance;

	const { 
		watch,
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
			message: "Write a valid input like 1.02 or 0.479"
		},
		{
			condition: errors.supplyValue && errors.supplyValue.type === "positive",
			message: "Your number must be greater than zero"
		}
	]
	
	const watchSupplyValue = watch("supplyValue");

	const isApproved = (watchSupplyValue <= approvedUsdcBalance) || state.approvalSuccess === true;

	const handleClose = () => {
		if (state.status === "finalSuccess") {
			dispatch({type: "uninitiated"});
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
			  			error: "user rejected transaction",
			  		}
			  	});
			    return;
			  }
			}
			dispatch({
				type: "failed",
				payload: {
					transactionType: "supply",
					error: "The transaction failed :(",
				}
			});
		}
	};

	const handleApproval = async (value: string) => {
		const { ethereum } = window;
		const provider = new ethers.BrowserProvider(ethereum as any);
		const signer = await provider.getSigner();

		const usdc: Contract = new ethers.Contract(
			NetworkContractMap[networkChainId]["USDC"].address,
			NetworkContractMap[networkChainId]["USDC"].abi,
			signer,
		);

		try {
			const tx = await usdc.approve(
				NetworkContractMap[networkChainId]["Polemarch"].address,
				parseUnits(value, NetworkContractMap[networkChainId]["USDC"].decimals),
			);
			dispatch({
				type: "inProgress",
				payload: {
					transactionType: "approval",
				}
			});
			await tx.wait();
			dispatch({
				type: "approvalSuccess",
				payload: {
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
			  			error: "user rejected transaction",
			  		}
			  	});
			    return;
			  }
			}
			dispatch({
				type: "failed",
				payload: {
					transactionType: "approval",
					error: "The transaction failed :(",
				}
			});		
		}
	}

	return (
		<div>
			<Button
				variant="contained"
				sx={styles.button}
				onClick={handleOpen}
			>
				Supply
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				sx={styles.modal}
			>
				<Box>
					<Paper elevation={1} sx={styles.paper}>
							<Grid container spacing={1}>
								<CloseButton handleClose={handleClose} />
								<Grid item xs={12}>
									<Typography variant="body1" sx={styles.modalHeaderTypography}>
										Supply USDC
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body2" sx={styles.approvedBalanceTypography}>
										Approved Balance: {approvedUsdcBalance}
									</Typography>									
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="supplyValue"
										control={control}
										rules={{
											required: true,
											pattern: /^\d{0,24}?(\.\d{0,24})?$/,
											validate: {
												positive: v => parseFloat(v) > 0,
											}
										}}
										render={({ field }) => (																						
											<TextField
												id="outlined-basic"
												label="Amount"
												variant="outlined"
												size="small"
												InputProps={
													{endAdornment: 
														<InputAdornment position="end">
															{<Avatar src={usdcIcon} sx={styles.usdcTextField} />}
														</InputAdornment>
													}
												}
												fullWidth
		 										{...field}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Box>
										{(approvedUsdcBalance 
											&& watchSupplyValue > approvedUsdcBalance 
											&& errors.supplyValue?.type !== "pattern"
											&& parseFloat(watchSupplyValue) > 0
											) && (									
											<ApprovalButton
												isDirty={isDirty}
												isValid={isValid}
												state={state}
												value={watchSupplyValue}
												handleApproval={handleApproval}
												asset="USDC"
											/>									
										)}
										<Button
											variant="contained"
											onClick={handleSubmit(onSubmit)}
											disabled={
												!isDirty 
												|| !isValid 
												|| !isApproved
												|| (state.transactionType === "supply" && state.status === "inProgress")
												|| parseFloat(watchSupplyValue) <= 0
											}
											sx={styles.button}
											fullWidth
										>
											Supply USDC
										</Button>
									</Box>
								</Grid>
								<>
									{formErrors.map((formError) => (
										<ErrorMessage
											condition={formError.condition}
											message={formError.message}
										/>
									))}
								</>
								{state.status === "inProgress" && (
									<Grid item xs={12}>
										<Typography variant="body2" sx={styles.typography}>
											Transaction is in progress! Wait a sec. Don't close the form, yet!
										</Typography>
										<LinearProgress />
									</Grid>
									)
								}
								{state.status === "success" && (
									<Grid item xs={12}>
										<Typography variant="body2" sx={styles.typography}>
											Transaction was successful! Go ahead and press close.
										</Typography>
										<Typography variant="body2" sx={{...styles.typography, fontWeight: "bold"}}>
											<Link
											  href={`${chainMap[networkChainId].etherscanUrl}/tx/${state.txHash}`}
											  target="_blank"
											>
											  Check out your transaction on Etherscan
											</Link>
										</Typography>
									</Grid>
									)
								}
								{state.status === "failed" && (
									<Grid item xs={12}>
										<Typography variant="body2" sx={styles.typography}>
											{state.error}
										</Typography>
									</Grid>
									)
								}
							</Grid>
					</Paper>
				</Box>
			</Modal>
		</div>
	);
}