import React, { 
	useEffect, 
	useReducer,
	useCallback,
	useMemo 
} from "react";
import { 
	ethers,
	formatEther,
	formatUnits,
	BigNumberish,
	Contract
} from "ethers";
import {
	IAccountContext,
	AccountContext,
	initialState,
	LineOfCredit
} from "../context/AccountContext";
import { 
	ACTION_TYPE, 
	AccountReducer 
} from "../reducers/AccountReducer";
import { 
	USDC_DECIMALS, 
	NetworkContractMap 
} from "../constants/constants";

import { getAccountState } from "../utils/ethersUtils";


type ErrorWithCode = {
	code: number;
	[key: string]: any;
};

const ERROR_CODE_REQUEST_PENDING = -32002;

const synchronize = async (dispatch: (action: ACTION_TYPE) => void) => {
	const { ethereum } = window;
	const isMetaMaskAvailable = Boolean(ethereum) && ethereum?.isMetaMask;
	if (!isMetaMaskAvailable) {
		dispatch({type: "providerUnavailable"});
		alert("You need to install MetaMask to connect a wallet");
		window.open("https://metamask.io/", "_blank");
		return;
	}

	const provider = new ethers.BrowserProvider(ethereum as any);
	const chainId: string = await provider.send("eth_chainId", []);

	const accounts: string[] = await provider.send("eth_accounts", []);

	if (accounts.length === 0) {
		dispatch({
			type: "accountNotConnected",
			payload: {
				chainId
			}
		});
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
		} = await getAccountState(accounts[0], chainId, provider);

		dispatch({
			type: "accountConnected",
			payload: {
				account: accounts[0],
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

const requestAccounts = async (dispatch: (action: ACTION_TYPE) => void) => {
	const { ethereum } = window;
	const provider = new ethers.BrowserProvider(ethereum as any);
	const chainId: string = await provider.send("eth_chainId", []);
	dispatch({
		type: "accountConnecting",
		payload: { 
			chainId
		}
	});

	await provider.send("eth_requestAccounts", [])
		.then(async (accounts) => {
			const { 
				ethBalance, 
				usdcBalance,
				approvedUsdcBalance,
				sUsdcBalance, 
				gUsdcBalance, 
				dUsdcBalance, 
				lineOfCredit,
				rate,
			} = await getAccountState(accounts[0], chainId, provider);

			dispatch({
				type: "accountConnected",
				payload: {
					account: accounts[0],
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
			});
		})
		.catch((err: unknown) => {
			if ("code" in (err as { [key: string]: any })) {
			  if ((err as ErrorWithCode).code === ERROR_CODE_REQUEST_PENDING)
			    return;
			}
			dispatch({ type: "providerPermissionRejected" });
		});
};

export default function AccountProvider(props: any) {
	const { ethereum } = window;
	const [state, dispatch] = useReducer(AccountReducer, initialState);

	const { status } = state;

	const isInitializing = status === "initializing";
	useEffect(() => {
		if (isInitializing) {
			synchronize(dispatch);
		}
	}, [dispatch, isInitializing]);

	ethereum?.on("accountsChanged", (_accounts) => window.location.reload());
	ethereum?.on("chainChanged", (_accounts) => window.location.reload());

	const isAvailable = status !== "unavailable" && status !== "initializing";

	const connect = useCallback(() => {
	  if (!isAvailable) {
	    console.warn(
	      "`enable` method has been called while MetaMask is not available or synchronising. Nothing will be done in this case."
	    );
	  }
	  requestAccounts(dispatch);
	}, [dispatch, isAvailable]);

	const update = useCallback(() => {
		if (!isAvailable) {
		  console.warn(
		    "`enable` method has been called while MetaMask is not available or synchronising. Nothing will be done in this case."
		  );
		}
		synchronize(dispatch);
	}, [dispatch, isAvailable]);

	const value: IAccountContext = useMemo(
		() => ({
			...state,
			connect,
			update,
		}),
		[connect, update, state]
	);
	return <AccountContext.Provider value={value} {...props} />
}