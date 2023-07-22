import React, {
	useState,
	useEffect
} from "react";
import { 
	Box,
	Button
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { 
	ConnectionType
} from "./connections";
import WalletOptions from "./WalletOptions";


import ConnectWalletModal from "./ConnectWalletModal";


export default function ConnectWallet() {
	const { chainId, account, isActive } = useWeb3React();
	const [connectionType, setConnectionType] = useState<ConnectionType | null>(null);

	return (
		<>
		<ConnectWalletModal>
			<Box>
				<WalletOptions
					activeConnectionType={connectionType}
					isConnectionActive={isActive}
					onActivate={setConnectionType}
					onDeactivate={setConnectionType}
				/>
			</Box>
		</ConnectWalletModal>
		</>

	);
}