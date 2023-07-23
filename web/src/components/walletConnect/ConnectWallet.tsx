import React, {
	useState,
	useEffect
} from "react";
import { 
	Box,
	Button,
	Paper,
	Popper,
	Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useWeb3React } from "@web3-react/core";
import { 
	ConnectionType,
	getConnection,
	tryDeactivateConnector
} from "./connections";
import WalletOptions from "./WalletOptions";


import ConnectWalletModal from "./ConnectWalletModal";

const styles = {
	connectedButton: {
		marginLeft: "1.5em",
	  color: "#484848",
		border:"1px solid black",
	},
	popperPaper: {
	  padding: "0.75em 1.5em 1.5em 1.5em",
	},
	typography: {
	  margin: "0em 0em 0.75em 0em",
	},
}

type WalletDropdownProps = {
	id: string | undefined;
	open: boolean;
	anchorEl: HTMLElement | null;
	chainId: number | undefined;
	connectionType: ConnectionType | null;
	disconnect: (c: ConnectionType) => Promise<void>
}

function WalletDropdown({ id, open, anchorEl, chainId, connectionType, disconnect }: WalletDropdownProps) {
	return (
		<Popper 
			id={id}
			open={open}
			anchorEl={anchorEl}
		>
			<Paper variant="outlined" sx={styles.popperPaper}>
				  {chainId && (
				    <Box>
				      <Typography variant="body1" sx={{...styles.typography, fontWeight: "bold"}}>
				        Network
				      </Typography>
				      <Typography variant="body2" sx={styles.typography}>
				        { chainId }
				      </Typography>
				    </Box>
				  )
				}
				{connectionType && <Button
					variant="outlined"
					onClick={() => disconnect(connectionType)}
				>
					Disconnect
				</Button>
			}
			</Paper>
		</Popper>
	);
}

export default function ConnectWallet() {
	const { chainId, account, isActive } = useWeb3React();
	const [connectionType, setConnectionType] = useState<ConnectionType | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
	  setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleDeactivation = async (connectionType: ConnectionType) => {
		const deactivation = await tryDeactivateConnector(getConnection(connectionType).connector);
		if (deactivation === undefined) {
			return;
		}
		setConnectionType(deactivation);

		return;
	}

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;

	return (
		<>
		{account ? (
			<>
			<Button 
				variant="outlined"
				onClick={handleClick}
				disableRipple={true}
				endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
				sx={styles.connectedButton}
			>
				{account.substring(0,4)}...{account.substring(account.length - 4, account.length)}
			</Button>
			<WalletDropdown
				id={id}
				open={open}
				anchorEl={anchorEl}
				chainId={chainId}
				connectionType={connectionType}
				disconnect={handleDeactivation}
			/>
			</>
			) : (
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
		)}
		</>

	);
}