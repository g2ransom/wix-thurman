import React, { 
	useEffect, 
	useReducer,
	useCallback,
	useMemo 
} from "react";
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

type ProviderParams = {
	account: string | undefined;
	chainId: number;
	provider: any;
	dispatch: (action: ACTION_TYPE) => void;

}

const synchronize = async ({ account, chainId, provider, dispatch }: ProviderParams) => {
	if (!account) {
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
		} = await getAccountState(account, chainId, provider);

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

export default function AccountProvider(props: any) {
	const [state, dispatch] = useReducer(AccountReducer, initialState);
	let { account, chainId, provider, isActivating, isActive } = useWeb3React();
	chainId = !chainId ? 1 : chainId;
	let providerParams: ProviderParams = { account, chainId, provider, dispatch };

	// providerParams = useMemo(
	// 	() => {
	// 		chainId = !chainId ? 1 : chainId;
	// 		return { account, chainId, provider, dispatch };
	// 		},
	// 	[isActivating, isActive]
	// );

	const { status } = state;

	useEffect(() => {
		if (isActivating || isActive) {
			synchronize(providerParams);
		}	
	}, [providerParams, isActivating, isActive]);

	const isAvailable = status !== "unavailable" && status !== "initializing";

	const update = useCallback(() => {
		if (!isAvailable) {
		  console.warn(
		    "`enable` method has been called while MetaMask is not available or synchronising. Nothing will be done in this case."
		  );
		}
		synchronize(providerParams);
	}, [isAvailable, providerParams]);

	const value: IAccountContext = useMemo(
		() => ({
			...state,
			update,
		}),
		[update, state]
	);
	return <AccountContext.Provider value={value} {...props} />
}