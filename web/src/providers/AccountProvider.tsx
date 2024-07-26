import React, { 
	useEffect, 
	useReducer,
	useRef,
	useCallback,
	useMemo 
} from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
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
import { apiUrl } from "../constants/constants";

type SynchronizeWalletMPEvent = {
	account: string;
	chainId: string;
}

type ProviderParams = {
	account: string | undefined;
	chainId: number
	provider: any;
	dispatch: (action: ACTION_TYPE) => void;
};

const synchronize = async ({ account, chainId, provider, dispatch }: ProviderParams) => {
	try {
		if (!account) {
			if (!chainId) {
				chainId = 1;
			}
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
				delegate,
				rate
			} = await getAccountState(account, chainId, provider);

			dispatch({
				type: "accountConnected",
				payload: {
					account: account,
					walletId: undefined,
					custodyType: "ENDUSER",
					userId: undefined,
					email: undefined,
					ethBalance: ethBalance,
					usdcBalance: usdcBalance,
					sUsdcBalance: sUsdcBalance,
					gUsdcBalance: gUsdcBalance,
					dUsdcBalance: dUsdcBalance,
					approvedUsdcBalance: approvedUsdcBalance,
					lineOfCredit: lineOfCredit,
					delegate: delegate,
					rate: rate,
					chainId: chainId
				}
			})
		}
	} catch (err) {
		console.log(err);
		if (!chainId) {
			chainId = 1;
		}
		dispatch({
			type: "accountNotConnected",
			payload: {
				chainId
			}
		});
	}
};

export default function AccountProvider(props: any) {
	const [state, dispatch] = useReducer(AccountReducer, initialState);
	let { account, chainId, provider, isActivating, isActive } = useWeb3React();
	let chainIdRef = useRef(!chainId ? 1 : chainId);

	let providerParams = useMemo(
		() => {
			if (chainId && (chainIdRef.current !== chainId)) {
				chainIdRef.current = chainId;
			}
			let params: ProviderParams = { account, chainId: chainIdRef.current, provider, dispatch };
			return params;
			},
		[account, provider, dispatch, chainId]
	);

	const { status } = state;

	useEffect(() => {
		const syncAccount = async () => {
			if (isActive && (chainId === chainIdRef.current)) {
				await synchronize(providerParams);
			}
		}
		syncAccount();		
	}, [providerParams, isActivating, isActive, chainId]);

	const isAvailable = status !== "unavailable" && status !== "initializing";

	const update = useCallback( async () => {
		if (!isAvailable) {
		  console.warn(
		    "`enable` method has been called while MetaMask is not available or synchronising. Nothing will be done in this case."
		  );
		}
		synchronize(providerParams);
		const { data } = await axios.post<SynchronizeWalletMPEvent>(
			`${apiUrl}/api/mixpanel-analytics/synchronize-wallet`,
			{ account: account, chainId: chainId }
		)
		console.log(data);
	}, [isAvailable, providerParams, account, chainId]);

	const value: IAccountContext = useMemo(
		() => ({
			...state,
			update,
		}),
		[update, state]
	);
	return <AccountContext.Provider value={value} {...props} />
}