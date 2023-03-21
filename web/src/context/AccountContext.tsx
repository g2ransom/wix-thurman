import { createContext } from "react";

type AccountInitializing = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	sUsdcBalance: undefined;
	gUsdcBalance: undefined;
	approvedUsdcBalance: undefined;
	approvedSusdcBalance: undefined;
	approvedGusdcBalance: undefined;
	chainId: undefined;
	status: "initializing";
}

type ProviderUnavailable = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	sUsdcBalance: undefined;
	gUsdcBalance: undefined;
	approvedUsdcBalance: undefined;
	approvedSusdcBalance: undefined;
	approvedGusdcBalance: undefined;
	chainId: undefined;
	status: "unavailable";
};

type AccountNotConnected = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	sUsdcBalance: undefined;
	gUsdcBalance: undefined;
	approvedUsdcBalance: undefined;
	approvedSusdcBalance: undefined;
	approvedGusdcBalance: undefined;
	chainId: string;
	status: "notConnected";
};

type AccountConnected = {
	account: string;
	ethBalance: string;
	usdcBalance: string;
	sUsdcBalance: string;
	gUsdcBalance: string;
	approvedUsdcBalance: string;
	approvedSusdcBalance: string;
	approvedGusdcBalance: string;
	chainId: string;
	status: "connected";
};

type AccountConnecting = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	sUsdcBalance: undefined;
	gUsdcBalance: undefined;
	approvedUsdcBalance: undefined;
	approvedSusdcBalance: undefined;
	approvedGusdcBalance: undefined;
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
	sUsdcBalance: undefined,
	gUsdcBalance: undefined,
	approvedUsdcBalance: undefined,
	approvedSusdcBalance: undefined,
	approvedGusdcBalance: undefined,
	chainId: undefined,
	status: "initializing",
}

export type IAccountContext = AccountState & {
	connect: () => void;
	update: () => void;
};

export const AccountContext = createContext<IAccountContext | undefined>(undefined)