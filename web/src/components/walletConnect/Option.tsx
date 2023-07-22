import React from "react";
import {
	Box,
	Button
} from "@mui/material";
import { 
	ConnectionType,
	getConnection,
	tryActivateConnector,
	tryDeactivateConnector
} from "./connections";

type OptionProps = {
	name: string;
	isEnabled: boolean;
	isConnected: boolean;
	connectionType: ConnectionType;
	onActivate: (connectionType: ConnectionType) => void;
	onDeactivate: (connectionType: null) => void;
}

export default function Option({
	name,
	isEnabled,
	isConnected,
	connectionType,
	onActivate,
	onDeactivate
}: OptionProps) {
	
	const handleDeactivation = async () => {
		const deactivation = await tryDeactivateConnector(getConnection(connectionType).connector);
		if (deactivation === undefined) {
			return
		}
		onDeactivate(deactivation);

		return
	}

	const handleActivation = async () => {
		const activation = await tryActivateConnector(getConnection(connectionType).connector);
		if (!activation) {
			return;
		}
		onActivate(activation);
		return;
	}

	return (
		<Box>
			{isConnected ? 
			<Button
				variant="outlined"
				onClick={handleDeactivation}
			>
				Disconnect {name}
			</Button> :
			<Button
				variant="outlined"
				onClick={handleActivation}
			>
				Connect {name}
			</Button>}
		</Box>
	);
}