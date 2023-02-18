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
} from "../context/AccountContext";
import { 
	ACTION_TYPE, 
	AccountReducer 
} from "../reducers/AccountReducer";
import { 
	USDC_DECIMALS, 
	NetworkContractMap 
} from "../constants/constants";


type ErrorWithCode = {
	code: number;
	[key: string]: any;
};

const ERROR_CODE_REQUEST_PENDING = -32002;

const synchronize = async (dispatch: (action: ACTION_TYPE) => void) => {
	const { ethereum } = window;
	let approvedUsdcBalance: string = "0.00";
	let sUsdcBalance: string = "0.00";
	let approvedSusdcBalance: string = "0.00";
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
		// may have to use shorthand if else when there's no balance
		const ethBalance = await provider.getBalance(accounts[0]);
		const usdc: Contract = new ethers.Contract(
			NetworkContractMap[chainId]["USDC"].address,
			NetworkContractMap[chainId]["USDC"].abi,
			provider,
		);
		const usdcBalance = await usdc.balanceOf(accounts[0])
			.then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));

		if (NetworkContractMap[chainId]["Polemarch"].address) {
			approvedUsdcBalance = await usdc.allowance(
				accounts[0],
				NetworkContractMap[chainId]["Polemarch"].address
			).then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));
		}
		

		if (NetworkContractMap[chainId]["sUSDC"].address && NetworkContractMap[chainId]["sUSDC"].abi) {
			const sUsdc = new ethers.Contract(
				NetworkContractMap[chainId]["sUSDC"].address,
				NetworkContractMap[chainId]["sUSDC"].abi,
				provider
			);
			sUsdcBalance = await sUsdc.balanceOf(accounts[0])
				.then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));
			
			if (NetworkContractMap[chainId]["Polemarch"].address) {
				approvedSusdcBalance = await sUsdc.allowance(
					accounts[0],
					NetworkContractMap[chainId]["Polemarch"].address
				).then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));
			}
		}
		

		dispatch({
			type: "accountConnected",
			payload: {
				account: accounts[0],
				ethBalance: ethBalance === undefined ? "0.00" : formatEther(ethBalance),
				usdcBalance: usdcBalance,
				sUsdcBalance: sUsdcBalance === undefined ? "0.00" : sUsdcBalance, // placeholder
				approvedUsdcBalance: approvedUsdcBalance === undefined ? "0.00" : approvedUsdcBalance,
				approvedSusdcBalance: approvedSusdcBalance === undefined ? "0.00" : approvedSusdcBalance,
				chainId: chainId
			}
		})
	}
};

const requestAccounts = async (dispatch: (action: ACTION_TYPE) => void) => {
	const { ethereum } = window;
	let approvedUsdcBalance: string;
	let sUsdcBalance: string;
	let approvedSusdcBalance: string = "0.00";
	const provider = new ethers.BrowserProvider(ethereum as any);
	const chainId: string = await provider.send("eth_chainId", []);
	dispatch({
		type: "accountConnecting",
		payload: { 
			chainId
		}
	});

	await provider.send("eth_requestAccounts", [])
		.then( async (accounts) => {
			const chainId = await provider.send("eth_chainId", []);
			const ethBalance = await provider.getBalance(accounts[0]);
			const usdc: Contract = new ethers.Contract(
				NetworkContractMap[chainId]["USDC"].address,
				NetworkContractMap[chainId]["USDC"].abi,
				provider,
			);
			const usdcBalance = await usdc.balanceOf(accounts[0])
				.then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));

			if (NetworkContractMap[chainId]["Polemarch"].address) {
				approvedUsdcBalance = await usdc.allowance(
					accounts[0],
					NetworkContractMap[chainId]["Polemarch"].address
				).then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));
			}
		

		if (NetworkContractMap[chainId]["sUSDC"].address && NetworkContractMap[chainId]["sUSDC"].abi) {
			const sUsdc = new ethers.Contract(
				NetworkContractMap[chainId]["sUSDC"].address,
				NetworkContractMap[chainId]["sUSDC"].abi,
				provider
			);
			sUsdcBalance = await sUsdc.balanceOf(accounts[0])
				.then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));

			if (NetworkContractMap[chainId]["Polemarch"].address) {
				approvedSusdcBalance = await sUsdc.allowance(
					accounts[0],
					NetworkContractMap[chainId]["Polemarch"].address
				).then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));
			}
		}
			
			dispatch({
				type: "accountConnected",
				payload: {
					account: accounts[0],
					ethBalance: ethBalance === undefined ? "0.00" : formatEther(ethBalance),
					usdcBalance: usdcBalance, 
					sUsdcBalance: sUsdcBalance === undefined ? "0.00" : sUsdcBalance, // placeholder
					approvedUsdcBalance: approvedUsdcBalance === undefined ? "0.00" : approvedUsdcBalance,
					approvedSusdcBalance: approvedSusdcBalance === undefined ? "0.00" : approvedSusdcBalance,
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