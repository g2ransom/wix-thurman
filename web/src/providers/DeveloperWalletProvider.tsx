import React, { 
	useEffect, 
	useReducer,
	useRef,
	useCallback,
	useMemo 
} from "react";
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

export default function DeveloperWalletProvider(props: any) {
	const [state, dispatch] = useReducer(AccountReducer, initialState);

	const synchronize = async (dispatch: (action: ACTION_TYPE) => void) => {
		let chainId;

		try {
			let res = await axios.get(
				"/api/user", 
				{ withCredentials: true }
			);

			const {
				address,
				walletId,
				custodyType,
				userId,
				email,
				ethBalance,
				usdcBalance,
				sUsdcBalance,
				gUsdcBalance,
				dUsdcBalance,
				approvedUsdcBalance,
				lineOfCredit,
				delegate,
				rate,
				chainId
			} = res.data;

			dispatch({
				type: "accountConnected",
				payload: {
					account: address,
					walletId: walletId,
					custodyType: custodyType,
					userId: userId,
					email: email,
					ethBalance: ethBalance,
					usdcBalance: usdcBalance,
					sUsdcBalance: sUsdcBalance,
					gUsdcBalance: gUsdcBalance,
					dUsdcBalance: dUsdcBalance,
					approvedUsdcBalance: approvedUsdcBalance,
					lineOfCredit: lineOfCredit,
					delegate: delegate,
					rate: rate,
					chainId: parseInt(chainId)
				}
			})	

			console.log("Just Dispatched!")
			console.log(state);
		} catch (err) {
			console.log(err);
			if (!chainId) {
				chainId = 11155111;
			}
			dispatch({
				type: "accountNotConnected",
				payload: {
					chainId
				}
			});
		}
	}
	const update = async () => {
		await synchronize(dispatch);
	};

	useEffect(() => {
		const syncAccount = async () => {
			await synchronize(dispatch);			
		}
		syncAccount();
	}, [])

	const value: IAccountContext = useMemo(
		() => ({
			...state,
			update,
		}),
		[update, state]
	);

	return <AccountContext.Provider value={value} {...props} />
}