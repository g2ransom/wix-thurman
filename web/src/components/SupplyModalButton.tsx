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
import CloseIcon from "@mui/icons-material/Close";
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
import InfoPopover from "./InfoPopover";
import usdcIcon from "../images/usdc.png"
import { 
	chainMap,
	USDC_DECIMALS, 
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
	closeIcon: {
		cursor: "pointer",
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
const approvalContent = "To continue, you need to grant Thurman smart contracts permission to move your funds from your wallet."

// if value is above approved balance, then the approve button comes and supply button is disabled
// make buttons disabled when errors exist in the form
export default function SupplyModalButton() {
	let { approvedUsdcBalance, chainId, update } = useWallet();
	const [state, dispatch] = useReducer(TransactionReducer, initialTransactionState);
	const [open, setOpen] = useState<boolean>(false);
	// const [approvalTxSuccess, setApprovalTxSuccess] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
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
	
	const watchSupplyValue = watch("supplyValue");

	const isApproved = (watchSupplyValue <= approvedUsdcBalance) || state.approvalSuccess === true;

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
				parseUnits(value, USDC_DECIMALS),
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
								<Grid item xs={12}>
									<Box display="flex" justifyContent="flex-end">
										<CloseIcon onClick={handleClose} sx={styles.closeIcon} />
									</Box>
								</Grid>
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
											pattern: /^\d{0,24}?(\.\d{0,24})?$/
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
								{(approvedUsdcBalance 
									&& watchSupplyValue > approvedUsdcBalance 
									&& errors.supplyValue?.type !== "pattern"
									) && (
									<Grid item xs={12}>
										<Button
											variant="contained"
											disabled={
												!isDirty 
												|| !isValid 
												|| (state.transactionType === "approval" && state.status === "inProgress")
											}
											onClick={() => handleApproval(watchSupplyValue)}
											endIcon={<InfoPopover content={approvalContent} />}
											sx={styles.button}
											fullWidth
										>
											Approve USDC to continue
										</Button>	
									</Grid>
								)}
								<Grid item xs={12}>
									<Button
										variant="contained"
										onClick={handleSubmit(onSubmit)}
										disabled={
											!isDirty 
											|| !isValid 
											|| !isApproved
											|| (state.transactionType === "supply" && state.status === "inProgress")
										}
										sx={styles.button}
										fullWidth
									>
										Supply USDC
									</Button>
								</Grid>
								{errors.supplyValue && errors.supplyValue.type === "required" && (
								  <Grid item xs={12}>
							  		<Typography sx={styles.errorTypography}>
							  			You must enter a value
							  		</Typography>
								  </Grid>	
								)}
								{errors.supplyValue && errors.supplyValue.type === "pattern" && (
								  <Grid item xs={12}>
							  		<Typography sx={styles.errorTypography}>
							  			Write a valid input like 1.02 or 0.479
							  		</Typography>
								  </Grid>
								)}
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