import React, { useContext } from "react";
import { AccountContext } from "../context/AccountContext";

export default function useWallet() {
	const context = useContext(AccountContext);

	if (!context) {
	  throw new Error("`useWallet` should be used within a `Provider`");
	}
	return context;
}