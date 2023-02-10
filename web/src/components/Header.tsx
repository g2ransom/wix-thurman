import React from "react";
import useWallet from "../hooks/useWallet";

export default function Header() {
	const { account, connect } = useWallet();

	return (
		<div>
			{account ? 
			  <button>
			    {account.substring(0,4)}...{account.substring(account.length - 4, account.length)}
			  </button> :
			  <button
			    onClick={connect}
			  >
			    Connect MetaMask
			  </button>
			}
		</div>
	);
}