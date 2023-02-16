import React from "react";
import {
	Grid,
	LinearProgress,
	Link,
	Typography
} from "@mui/material";
import { TransactionState } from "../reducers/TransactionReducer";
import { chainMap } from "../constants/constants";

type TransactionModalInfoProps = {
	state: TransactionState;
	networkChainId: string;
}

const styles = {
	typography: {
		fontSize: "0.75em",
		marginBottom: "0.25em",
		fontWeight: "600",
	},
}

export default function TransactionModalInfo({ 
	state, 
	networkChainId 
}: TransactionModalInfoProps
) {
	return (
		<>
		{state.status === "inProgress" && (
			<Grid item xs={12}>
				<Typography variant="body2" sx={styles.typography}>
					Transaction is in progress! Wait a sec. Don't close the form, yet!
				</Typography>
				<LinearProgress />
			</Grid>
			)
		}
		{(state.status === "success" || state.status === "finalSuccess") && (
			<Grid item xs={12}>
				<Typography variant="body2" sx={styles.typography}>
					Transaction was successful!
				</Typography>
				<Typography variant="body2" sx={styles.typography}>
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
		</>
	);
}