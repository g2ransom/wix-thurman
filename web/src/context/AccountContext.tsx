import { createContext } from "react";

export type LineOfCredit = {
	borrowMax: string;
	lastRepaymentTimestamp: number;
	creationTimestamp: number;
	expirationTimestamp: number;
	delinquent: boolean;
} | undefined;

export type CustodyType = "DEVELOPER" | "ENDUSER"

type AccountInitializing = {
	account: undefined;
	walletId: undefined;
	custodyType: undefined;
	userId: undefined;
	email: undefined;
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
	walletId: undefined;
	custodyType: undefined;
	userId?: undefined;
	email?: undefined;
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
	walletId: undefined;
	custodyType: undefined;
	userId?: undefined;
	email?: undefined;
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
	walletId: string | undefined;
	custodyType: CustodyType;
	userId: number | undefined;
	email: string | undefined;
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
	walletId: undefined;
	custodyType: undefined;
	userId: undefined;
	email: undefined;
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
	walletId: undefined,
	custodyType: undefined,
	userId: undefined,
	email: undefined,
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
	update: () => void;
};

export const AccountContext = createContext<IAccountContext | undefined>(undefined);