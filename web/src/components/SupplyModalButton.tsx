import React, { useState } from "react";
import { 
	ethers,
	parseEther,
	parseUnits,
	formatUnits,
	Contract,
} from "ethers";
import {
	Avatar,
	Box,
	Button,
	Grid,
	LinearProgress,
	Link,
	Modal,
	Paper,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import { 
	useForm,
	useFormState,
	Controller, 
	SubmitHandler
} from "react-hook-form";
import useWallet from "../hooks/useWallet";
import { 
	USDC_DECIMALS, 
	NetworkContractMap 
} from "../constants/constants";

const styles = {
	supplyButton: {
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#525252",
		},
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
	typography: {
		marginBottom: "0.15em",
	},
	usdc: {
		width: "0.75em",
    height: "0.75em",
	}
}

type IFormInput = {
	supplyValue: string;
};

// if value is above approved balance, then the approve button comes and supply button is disabled
// make buttons disabled when errors exist in the form
export default function SupplyModalButton() {
	let { approvedUsdcBalance, chainId, update } = useWallet();
	const [open, setOpen] = useState<boolean>(false);
	const [approvalTxSuccess, setApprovalTxSuccess] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const networkChainId = !chainId ? "0x1" : chainId;
	approvedUsdcBalance = !approvedUsdcBalance ? "0.0" : approvedUsdcBalance;

	const { 
		getFieldState,
		getValues,
		watch,
		formState: { isDirty, dirtyFields, isValid, errors },
		control, 
		handleSubmit 
	} = useForm({
		mode: "onChange",
		defaultValues: {
			supplyValue: ""
		}
	});
	
	const watchSupplyValue = watch("supplyValue");

	const isApproved = (watchSupplyValue <= approvedUsdcBalance) || approvalTxSuccess === true;

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
			await tx.wait();
			console.log("tx success");
			update();
			handleClose();
		} catch (e) {
			console.error(e);
		}
	}

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
			await tx.wait();
			console.log("tx success");
			update();
		} catch (e) {
			console.error(e);
		}
	}

	// const handleSupply = async (value) => {
	// 	const { ethereum } = window;
	// 	const provider = new ethers.BrowserProvider(ethereum);
	// 	const signer = await provider.signer();

	// 	const polemarch: Contract = new ethers.Contract(
	// 		NetworkContractMap[chainId]["Polemarch"].address,
	// 		NetworkContractMap[chainId]["Polemarch"].abi,
	// 		signer,
	// 	);

	// 	try {
	// 		const tx = await polemarch.supply(
	// 			NetworkContractMap[chainId]["USDC"].address,
	// 			value,
	// 		)
	// 		await tx.wait();
	// 		console.log("tx success");
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// }

	return (
		<div>
			<Button
				variant="contained"
				sx={styles.supplyButton}
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
									<Typography variant="body1">
										Supply USDC
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<>
									<Typography variant="body2">
										Approved Balance: {approvedUsdcBalance}
									</Typography>
									{errors.supplyValue && errors.supplyValue.type === "required" && (
									  <div>You must enter a value</div>
									)}
									{errors.supplyValue && errors.supplyValue.type === "pattern" && (
									  <div>Invalid type, my boy</div>
									)}
									</>
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
		 										{...field}
											/>
										)}
									/>
								</Grid>
								{(approvedUsdcBalance && watchSupplyValue > approvedUsdcBalance) && (
									<Button
										variant="contained"
										disabled={!isDirty || !isValid || approvalTxSuccess}
										onClick={() => handleApproval(watchSupplyValue)}
										sx={styles.supplyButton}
									>
										Approve
									</Button>	
								)}
								<Grid item xs={12}>
									<Button
										variant="contained"
										onClick={handleSubmit(onSubmit)}
										disabled={!isDirty || !isValid || !isApproved}
										sx={styles.supplyButton}
									>
										Submit
									</Button>
								</Grid>
							</Grid>
					</Paper>
				</Box>
			</Modal>
		</div>
	);
}