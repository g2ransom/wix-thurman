import { createContext } from "react";

type AccountInitializing = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	approvedUsdcBalance: undefined;
	chainId: undefined;
	status: "initializing";
}

type ProviderUnavailable = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	approvedUsdcBalance: undefined;
	chainId: undefined;
	status: "unavailable";
};

type AccountNotConnected = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	approvedUsdcBalance: undefined;
	chainId: string;
	status: "notConnected";
};

type AccountConnected = {
	account: string;
	ethBalance: string;
	usdcBalance: string;
	approvedUsdcBalance: string;
	chainId: string;
	status: "connected";
};

type AccountConnecting = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	approvedUsdcBalance: undefined;
	chainId: string;
	status: "connecting";
};

export type AccountState = 
	| AccountInitializing
	| ProviderUnavailable
	| AccountNotConnected
	| AccountConnected
	| AccountConnecting;

export const initialState: AccountState = {
	account: undefined,
	ethBalance: undefined,
	usdcBalance: undefined,
	approvedUsdcBalance: undefined,
	chainId: undefined,
	status: "initializing",
}

// export type IAccountContext = AccountState & {
// 	onUpdateAccount: (account: string) => void;
// 	onUpdateEthBalance: (balance: string) => void;
// 	onUpdateUsdcBalance: (balance: string) => void;
// 	onUpdateApprovedUsdcBalance: (balance: string) => void;
// 	onUpdateChainId: (balance: string) => void;
// };

export type IAccountContext = AccountState & {
	connect: () => void;
};

// export const AccountContext = createContext<IAccountContext>({
// 	account: undefined,
// 	ethBalance: undefined,
// 	usdcbalance: undefined,
// 	approvedUsdcBalance: undefined,
// 	chainId: undefined,
// 	onUpdateAccount: () => {},
// 	onUpdateEthBalance: () => {},
// 	onUpdateUsdcBalance: () => {},
// 	onUpdateApprovedUsdcBalance: () => {},
// 	onUpdateChainId: () => {},
//  });

export const AccountContext = createContext<IAccountContext | undefined>(undefined)