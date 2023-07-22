import React from "react";
import { Button } from "@mui/material";
import {
	ConnectionType,
	getIsMetaMaskInstalled
} from "./connections";
import Option from "./Option";

type WalletOptionsProps = {
	activeConnectionType: ConnectionType | null;
	isConnectionActive: boolean;
	onActivate: (connectionType: ConnectionType) => void;
	onDeactivate: (connectionType: null) => void;
};

export default function WalletOptions({
	activeConnectionType,
	isConnectionActive,
	onActivate,
	onDeactivate
}: WalletOptionsProps) {
	const hasMetaMask = getIsMetaMaskInstalled();
	const isNoOptionActive = !isConnectionActive || (isConnectionActive && activeConnectionType === null);

	return (
		<>
		{hasMetaMask ? (
			<Option
				name="MetaMask"
				isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.INJECTED}
				isConnected={activeConnectionType === ConnectionType.INJECTED}
				connectionType={ConnectionType.INJECTED}
				onActivate={onActivate}
				onDeactivate={onDeactivate}
			/>
		) : (
			<Button 
				href="https://metamask.io/" 
				target="_blank" 
				variant="outlined"
			>
				Install MetaMask
			</Button>
		)}
		<Option
			name="Coinbase Wallet"
			isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.COINBASE_WALLET}
			isConnected={activeConnectionType === ConnectionType.COINBASE_WALLET}
			connectionType={ConnectionType.COINBASE_WALLET}
			onActivate={onActivate}
			onDeactivate={onDeactivate}
		/>
		<Option
			name="WalletConnect"
			isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.WALLET_CONNECT}
			isConnected={activeConnectionType === ConnectionType.WALLET_CONNECT}
			connectionType={ConnectionType.WALLET_CONNECT}
			onActivate={onActivate}
			onDeactivate={onDeactivate}
		/>
		</>
	);
	
}