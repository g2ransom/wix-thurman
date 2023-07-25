import { createContext } from "react";

export type LineOfCredit = {
	borrowMax: string;
	lastRepaymentTimestamp: number;
	creationTimestamp: number;
	expirationTimestamp: number;
	delinquent: boolean;
} | undefined;

