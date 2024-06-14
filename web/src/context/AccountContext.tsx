import { createContext } from "react";

export type LineOfCredit = {
	borrowMax: string;
	lastRepaymentTimestamp: number;
	creationTimestamp: number;
	expirationTimestamp: number;
	delinquent: boolean;
} | undefined;

type AccountInitializing = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	sUsdcBalance: undefined;
	gUsdcBalance: undefined;
	dUsdcBalance: undefined;
	approvedUsdcBalance: undefined;
	lineOfCredit: undefined;
	delegate: undefined;
	rate: undefined;
	chainId: undefined;
	status: "initializing";
}

type ProviderUnavailable = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	sUsdcBalance: undefined;
	gUsdcBalance: undefined;
	dUsdcBalance: undefined;
	approvedUsdcBalance: undefined;
	lineOfCredit: undefined;
	delegate: undefined;
	rate: undefined;
	chainId: undefined;
	status: "unavailable";
};

type AccountNotConnected = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	sUsdcBalance: undefined;
	gUsdcBalance: undefined;
	dUsdcBalance: undefined;
	approvedUsdcBalance: undefined;
	lineOfCredit: undefined;
	delegate: undefined;
	rate: undefined;
	chainId: number;
	status: "notConnected";
};

type AccountConnected = {
	account: string;
	ethBalance: string;
	usdcBalance: string;
	sUsdcBalance: string;
	gUsdcBalance: string;
	dUsdcBalance: string;
	approvedUsdcBalance: string;
	lineOfCredit: LineOfCredit;
	delegate: string;
	rate: string;
	chainId: number;
	status: "connected";
};

type AccountConnecting = {
	account: undefined;
	ethBalance: undefined;
	usdcBalance: undefined;
	sUsdcBalance: undefined;
	gUsdcBalance: undefined;
	dUsdcBalance: undefined;
	approvedUsdcBalance: undefined;
	lineOfCredit: undefined;
	delegate: undefined;
	rate: undefined;
	chainId: number;
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
	dUsdcBalance: undefined,
	approvedUsdcBalance: undefined,
	lineOfCredit: undefined,
	delegate: undefined,
	rate: undefined,
	chainId: undefined,
	status: "initializing",
}

export type IAccountContext = AccountState & {
	// connect: () => void;
	update: () => void;
};

export const AccountContext = createContext<IAccountContext | undefined>(undefined)