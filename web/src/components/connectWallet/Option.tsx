import React from "react";
import {
	Avatar,
	Box,
	Button
} from "@mui/material";
import { 
	ConnectionType,
	getConnection,
	tryActivateConnector,
	tryDeactivateConnector
} from "./connections";
import useWallet from "../../hooks/useWallet";

type OptionProps = {
	name: string;
	avatarSrc: string;
	isEnabled: boolean;
	isConnected: boolean;
	connectionType: ConnectionType;
	onActivate: (connectionType: ConnectionType) => void;
	onDeactivate: (connectionType: null) => void;
}

const styles = {
	button: {
		backgroundColor: "#E9EAEC",
		"&:hover": {
			border:"1px solid #3B3B3B",
			backgroundColor: "#E9EAEC",
		},
		color: "#3B3B3B",
		fontWeight: "600",
		width: "20em",
	},
	icon: {
	  width: "1em",
	  height: "1em",
	}
}

export default function Option({
	name,
	avatarSrc,
	isEnabled,
	isConnected,
	connectionType,
	onActivate,
	onDeactivate
}: OptionProps) {
	const { update } = useWallet();

	const handleDeactivation = async () => {
		const deactivation = await tryDeactivateConnector(getConnection(connectionType).connector);
		if (deactivation === undefined) {
			return
		}
		onDeactivate(deactivation);
		update();
		return
	}

	const handleActivation = async () => {
		const activation = await tryActivateConnector(getConnection(connectionType).connector);
		if (!activation) {
			return;
		}
		onActivate(activation);
		update();
		return;
	}

	return (
		<Box>
			{isConnected ? 
			<Button
				variant="contained"
				endIcon={<Avatar src={avatarSrc} sx={styles.icon} />}
				onClick={handleDeactivation}
				sx={styles.button}
			>
				Disconnect {name}
			</Button> :
			<Button
				variant="contained"
				endIcon={<Avatar src={avatarSrc} sx={styles.icon} />}
				onClick={handleActivation}
				sx={styles.button}
			>
				Connect {name}
			</Button>}
		</Box>
	);
}