import React, { 
	useEffect, 
	useReducer,
	useCallback,
	useMemo 
} from "react";
import { ethers } from "ethers";
import type { Provider } from "@web3-react/types";
import { useWeb3React } from "@web3-react/core";
import {
	IAccountContext,
	AccountContext,
	initialState
} from "../context/AccountContext";
import { 
	ACTION_TYPE, 
	AccountReducer 
} from "../reducers/AccountReducer";

import { getAccountState } from "../utils/ethersUtils";


type ErrorWithCode = {
	code: number;
	[key: string]: any;
};

const ERROR_CODE_REQUEST_PENDING = -32002;

type ProviderParams = {
	account: string | undefined;
	chainId: number;
	provider: any;
	dispatch: (action: ACTION_TYPE) => void;

}

const synchronize = async ({ account, chainId, provider, dispatch }: ProviderParams) => {
	// const { ethereum } = window;
	// const isMetaMaskAvailable = Boolean(ethereum) && ethereum?.isMetaMask;
	// if (!isMetaMaskAvailable) {
	// 	dispatch({type: "providerUnavailable"});
	// 	alert("You need to install MetaMask to connect a wallet");
	// 	window.open("https://metamask.io/", "_blank");
	// 	return;
	// }

	// const provider = new ethers.BrowserProvider(ethereum as any);
	// const chainId: string = await provider.send("eth_chainId", []);

	// const accounts: string[] = await provider.send("eth_accounts", []);
	// const { account, chainId, provider } = useWeb3React();

	if (!account) {
		dispatch({
			type: "accountNotConnected",
			payload: {
				chainId
			}
		});
		console.log("Not connected");
	} else {
		const { 
			ethBalance, 
			usdcBalance,
			approvedUsdcBalance,
			sUsdcBalance, 
			gUsdcBalance, 
			dUsdcBalance, 
			lineOfCredit,
			rate
		} = await getAccountState(account, chainId, provider);
		console.log("Connected: ", usdcBalance);

		dispatch({
			type: "accountConnected",
			payload: {
				account: account,
				ethBalance: ethBalance,
				usdcBalance: usdcBalance,
				sUsdcBalance: sUsdcBalance,
				gUsdcBalance: gUsdcBalance,
				dUsdcBalance: dUsdcBalance,
				approvedUsdcBalance: approvedUsdcBalance,
				lineOfCredit: lineOfCredit,
				rate: rate,
				chainId: chainId
			}
		})
	}
};

// const requestAccounts = async ({ account, chainId, provider, dispatch }: ProviderParams) => {
// 	// const { ethereum } = window;
// 	// const provider = new ethers.BrowserProvider(ethereum as any);
// 	// const chainId: string = await provider.send("eth_chainId", []);
// 	dispatch({
// 		type: "accountConnecting",
// 		payload: { 
// 			chainId
// 		}
// 	});

// 	await provider.send("eth_requestAccounts", [])
// 		.then(async (accounts) => {
// 			const { 
// 				ethBalance, 
// 				usdcBalance,
// 				approvedUsdcBalance,
// 				sUsdcBalance, 
// 				gUsdcBalance, 
// 				dUsdcBalance, 
// 				lineOfCredit,
// 				rate,
// 			} = await getAccountState(accounts[0], chainId, provider);

// 			dispatch({
// 				type: "accountConnected",
// 				payload: {
// 					account: accounts[0],
// 					ethBalance: ethBalance,
// 					usdcBalance: usdcBalance, 
// 					sUsdcBalance: sUsdcBalance,
// 					gUsdcBalance: gUsdcBalance,
// 					dUsdcBalance: dUsdcBalance,
// 					approvedUsdcBalance: approvedUsdcBalance,
// 					lineOfCredit: lineOfCredit,
// 					rate: rate,
// 					chainId: chainId
// 				}
// 			});
			
// 		})
// 		.catch((err: unknown) => {
// 			if ("code" in (err as { [key: string]: any })) {
// 			  if ((err as ErrorWithCode).code === ERROR_CODE_REQUEST_PENDING)
// 			    return;
// 			}
// 			dispatch({ type: "providerPermissionRejected" });
// 		});
// };

export default function AccountProvider(props: any) {
	// const { ethereum } = window;
	const [state, dispatch] = useReducer(AccountReducer, initialState);
	let { account, chainId, provider } = useWeb3React();
	console.log(account);
	chainId = !chainId ? 1 : chainId;
	let providerParams: ProviderParams = { account, chainId, provider, dispatch };

	const { status } = state;

	// const isInitializing = status === "initializing";
	useEffect(() => {
		synchronize(providerParams);
	}, [providerParams]);

	// ethereum?.on("accountsChanged", (_accounts) => window.location.reload());
	// ethereum?.on("chainChanged", (_accounts) => window.location.reload());

	const isAvailable = status !== "unavailable" && status !== "initializing";

	// const connect = useCallback(() => {
	//   if (!isAvailable) {
	//     console.warn(
	//       "`enable` method has been called while MetaMask is not available or synchronising. Nothing will be done in this case."
	//     );
	//   }
	//   requestAccounts(providerParams);
	// }, [dispatch, isAvailable]);

	const update = useCallback(() => {
		if (!isAvailable) {
		  console.warn(
		    "`enable` method has been called while MetaMask is not available or synchronising. Nothing will be done in this case."
		  );
		}
		synchronize(providerParams);
	}, [dispatch, isAvailable]);

	const value: IAccountContext = useMemo(
		() => ({
			...state,
			// connect,
			update,
		}),
		[update, state]
	);
	return <AccountContext.Provider value={value} {...props} />
}