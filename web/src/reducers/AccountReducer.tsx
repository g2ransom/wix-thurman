import { 
	AccountState,
	LineOfCredit
 } from "../context/AccountContext";

// type ProviderUnavailable = {
// 	type: "providerUnavailable";
// };

type AccountNotConnected = {
	type: "accountNotConnected";
	payload: {
		chainId: number;
	}
};

type AccountConnected = {
	type: "accountConnected";
	payload: {
		account: string;
		ethBalance: string;
		usdcBalance: string;
		sUsdcBalance: string;
		gUsdcBalance: string;
		dUsdcBalance: string;
		approvedUsdcBalance: string;
		lineOfCredit: LineOfCredit;
		rate: string;
		chainId: number;
	}
};

// type AccountConnecting = {
// 	type: "accountConnecting";
// 	payload: {
// 		chainId: number;
// 	}
// };

type PermissionRejected = {
	type: "providerPermissionRejected";
};

// type AccountChanged = {
// 	type: "accountChanged";
// 	payload: {
// 		account: string;
// 		ethBalance: string;
// 		usdcBalance: string;
// 		sUsdcBalance: string;
// 		gUsdcBalance: string;
// 		dUsdcBalance: string;
// 		approvedUsdcBalance: string;
// 		lineOfCredit: LineOfCredit;
// 		rate: string;
// 	}
// };

// type ChainChanged = {
// 	type: "chainChanged";
// 	payload: {
// 		account: string;
// 		ethBalance: string;
// 		usdcBalance: string;
// 		sUsdcBalance: string;
// 		gUsdcBalance: string;
// 		dUsdcBalance: string;
// 		approvedUsdcBalance: string;
// 		lineOfCredit: LineOfCredit;
// 		rate: string;
// 		chainId: number;
// 	}
// };

export type ACTION_TYPE =
	// | ProviderUnavailable
	| AccountNotConnected
	| AccountConnected
	// | AccountConnecting
	// | PermissionRejected
	// | AccountChanged
	// | ChainChanged;

export function AccountReducer(state: AccountState, action: ACTION_TYPE): AccountState {
	switch (action.type) {
		// case "providerUnavailable": {
		// 	return {
		// 		account: undefined,
		// 		ethBalance: undefined,
		// 		usdcBalance: undefined,
		// 		sUsdcBalance: undefined,
		// 		gUsdcBalance: undefined,
		// 		dUsdcBalance: undefined,
		// 		approvedUsdcBalance: undefined,
		// 		lineOfCredit: undefined,
		// 		rate: undefined,
		// 		chainId: undefined,
		// 		status: "unavailable",
		// 	};
		// }
		case "accountNotConnected": {
			return {
				account: undefined,
				ethBalance: undefined,
				usdcBalance: undefined,
				sUsdcBalance: undefined,
				gUsdcBalance: undefined,
				dUsdcBalance: undefined,
				approvedUsdcBalance: undefined,
				lineOfCredit: undefined,
				rate: undefined,
				chainId: action.payload.chainId,
				status: "notConnected",
			};
		} 
		case "accountConnected": {
			return {
				account: action.payload.account,
				ethBalance: action.payload.ethBalance,
				usdcBalance: action.payload.usdcBalance,
				sUsdcBalance: action.payload.sUsdcBalance,
				gUsdcBalance: action.payload.gUsdcBalance,
				dUsdcBalance: action.payload.dUsdcBalance,
				approvedUsdcBalance: action.payload.approvedUsdcBalance,
				lineOfCredit: action.payload.lineOfCredit,
				rate: action.payload.rate,
				chainId: action.payload.chainId,
				status: "connected"
			};
		}
		// case "accountConnecting": {
		// 	if (state.status === "initializing" || state.status === "unavailable") {
		// 		console.warn(
	  //       `Invalid state transition from "${state.status}" to "connecting". Please, file an issue.`
		// 		);
		// 		return state;
		// 	}
		// 	return {
		// 		account: undefined,
		// 		ethBalance: undefined,
		// 		usdcBalance: undefined,
		// 		sUsdcBalance: undefined,
		// 		gUsdcBalance: undefined,
		// 		dUsdcBalance: undefined,
		// 		approvedUsdcBalance: undefined,
		// 		lineOfCredit: undefined,
		// 		rate: undefined,
		// 		chainId: action.payload.chainId,
		// 		status: "connecting",
		// 	};
		// }
		// case "providerPermissionRejected": {
		// 	if (state.status === "initializing" || state.status === "unavailable") {
		// 		console.warn(
	  //       `Invalid state transition from "${state.status}" to "connecting". Please, file an issue.`
		// 		);
		// 		return state;
		// 	}
		// 	return {
		// 		...state,
		// 		account: undefined,
		// 		ethBalance: undefined,
		// 		usdcBalance: undefined,
		// 		sUsdcBalance: undefined,
		// 		gUsdcBalance: undefined,
		// 		dUsdcBalance: undefined,
		// 		approvedUsdcBalance: undefined,
		// 		lineOfCredit: undefined,
		// 		rate: undefined,
		// 		status: "notConnected",
		// 	};
		// }
		// case "accountChanged": {
		// 	if (state.status !== "connected") {
		// 		console.warn(
		// 			`Invalid accounts change in "${state.status}". Please, file an issue`
		// 		);
		// 		return state;
		// 	}
		// 	if (action.payload.account === undefined) {
		// 		return {
		// 			...state,
		// 			account: undefined,
		// 			ethBalance: undefined,
		// 			usdcBalance: undefined,
		// 			sUsdcBalance: undefined,
		// 			gUsdcBalance: undefined,
		// 			dUsdcBalance: undefined,
		// 			approvedUsdcBalance: undefined,
		// 			lineOfCredit: undefined,
		// 			rate: undefined,
		// 			status: "notConnected",
		// 		}
		// 	}
		// 	return {
		// 		...state,
		// 		account: action.payload.account,
		// 		ethBalance: action.payload.ethBalance,
		// 		usdcBalance: action.payload.usdcBalance,
		// 		sUsdcBalance: action.payload.sUsdcBalance,
		// 		gUsdcBalance: action.payload.gUsdcBalance,
		// 		dUsdcBalance: action.payload.dUsdcBalance,
		// 		approvedUsdcBalance: action.payload.approvedUsdcBalance,
		// 		lineOfCredit: action.payload.lineOfCredit,
		// 		rate: action.payload.rate,
		// 		status: "connected",
		// 	};
		// }
		// case "chainChanged": {
		// 	if (state.status === "initializing" || state.status === "unavailable") {
		// 		console.warn(
		// 		  `Invalid chain ID change in "${state.status}". Please, file an issue.`
		// 		);
		// 		return state;
		// 	}
		// 	return {
		// 		...state,
		// 		account: action.payload.account,
		// 		ethBalance: action.payload.ethBalance,
		// 		usdcBalance: action.payload.usdcBalance,
		// 		sUsdcBalance: action.payload.sUsdcBalance,
		// 		gUsdcBalance: action.payload.gUsdcBalance,
		// 		dUsdcBalance: action.payload.dUsdcBalance,
		// 		approvedUsdcBalance: action.payload.approvedUsdcBalance,
		// 		lineOfCredit: action.payload.lineOfCredit,
		// 		rate: action.payload.rate,
		// 		chainId: action.payload.chainId,
		// 		status: "connected",
		// 	};
		// }
		default:
			throw new Error();
	}
}