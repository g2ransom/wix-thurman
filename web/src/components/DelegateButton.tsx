import React, { useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import { 
	ethers,
	Contract,
} from "ethers";
import {
	Button,
	Box,
} from "@mui/material";
import { TransactionReducer, initialTransactionState } from "../reducers/TransactionReducer";
import TransactionModalInfo from "./TransactionModalInfo";
import useWallet from "../hooks/useWallet";
import { NetworkContractMap } from "../constants/constants";
import { 
	ErrorWithCode, 
	ERROR_CODE_TX_REQUEST_REJECTED
} from "../utils/ethersUtils";

const styles = {
	button: {
			backgroundColor: "#36454F",
			"&:hover": {
				backgroundColor: "#495D6A",
			},
			fontWeight: "800",
			marginLeft: "1.5em",
		},
};

export default function DelegateButton() {
	let { account, chainId } = useWeb3React();
	let { update } = useWallet();
	const [state, dispatch] = useReducer(TransactionReducer, initialTransactionState);
	const networkChainId = !chainId ? 1 : chainId; 

	const onSubmit = async () => {
		const { ethereum } = window;
		const provider = new ethers.BrowserProvider(ethereum as any);
		const signer = await provider.getSigner();

		const thurmanToken: Contract = new ethers.Contract(
			NetworkContractMap[networkChainId]["ThurmanToken"].address,
			NetworkContractMap[networkChainId]["ThurmanToken"].abi,
			signer,
		);

		try {
			const tx = await thurmanToken.delegate(account)
			dispatch({
				type: "inProgress",
				payload: {
					transactionType: "withdraw",
				}
			});
			await tx.wait();
			// await axios.post<WithdrawMPEvent>(
			// 	`${apiUrl}/api/mixpanel-analytics/withdraw`,
			// 	{ account: account, chainId: chainId, withdrawValue: data.withdrawValue }
			// )
			dispatch({
				type: "finalSuccess",
				payload: {
					transactionType: "delegate",
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
		<Box>
			<Button variant="contained"
				onClick={onSubmit} 
				sx={styles.button} 
				disabled={!account}
			>
				Delegate
			</Button>
			<TransactionModalInfo 
				state={state} 
				networkChainId={networkChainId} 
			/>
		</Box>
	);
}