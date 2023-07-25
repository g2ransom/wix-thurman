import React, {
	useState,
	useEffect
} from "react";
import { 
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	Popper,
	Stack,
	Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  OpenInNew
} from "@mui/icons-material";
import { useWeb3React } from "@web3-react/core";
import { 
	ConnectionType,
	getConnection,
	tryDeactivateConnector
} from "./connections";
import WalletOptions from "./WalletOptions";
import useWallet from "../../hooks/useWallet";
import { networkMap } from "../../constants/constants";


import ConnectWalletModal from "./ConnectWalletModal";

const styles = {
	avatar: {
		background: "linear-gradient(to right bottom, #430089, #82ffa1)",
		width: "1.25em",
		height: "1.25em",
	},
	connectedButton: {
		marginLeft: "1.5em",
	  color: "#484848",
		border:"1px solid black",
	},
	disconnectButton: {
		backgroundColor: "#808080",
		fontWeight: "800",
		"&:hover": {
			backgroundColor: "#525252",
		},
	},
	divider: {
		margin: "0.5em 0em 0.5em 0em"
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
	account: string | undefined;
	chainId: number | undefined;
	connectionType: ConnectionType | null;
	disconnect: (c: ConnectionType) => Promise<void>
}

function WalletDropdown({ id, open, anchorEl, account, chainId, connectionType, disconnect }: WalletDropdownProps) {
	return (
		<Popper 
			id={id}
			open={open}
			anchorEl={anchorEl}
		>
			<Paper variant="outlined" sx={styles.popperPaper}>
				<Stack spacing={1}>
				  {chainId && (
			      <Box>
				      <Typography variant="body1" sx={{...styles.typography, fontWeight: "bold"}}>
				        Network
				      </Typography>
				      <Typography variant="body2" sx={styles.typography}>
				        { networkMap[chainId].name }
				      </Typography>
			      </Box>
				  )}
					{connectionType && (						
						<Box>
							<Button
								variant="contained"
								size="small"
								onClick={() => disconnect(connectionType)}
								sx={styles.disconnectButton}
							>
								Disconnect
							</Button>
							<Divider sx={styles.divider}/>
						</Box>				
					)}
					{(account && chainId) && (
				    <Button 
				    	href={`${networkMap[chainId]?.etherscanUrl}/address/${account}`}
				    	size="small"
				    	startIcon={<OpenInNew />}
				    >
				    	View on Explorer
				    </Button>
					)}
				</Stack>
			</Paper>
		</Popper>
	);
}

export default function ConnectWallet() {
	const { chainId, account, isActive } = useWeb3React();
	const { update } = useWallet();
	const [connectionType, setConnectionType] = useState<ConnectionType | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	// useEffect(() => {
	// 	if (!connectionType) {
	// 		return;
	// 	}
	// 	let connector = getConnection(connectionType).connector;
	// 	const connectEagerly = async () => {
	// 		try {
	// 			if (connector?.connectEagerly) {
	// 				await connector.connectEagerly();
	// 			} else {
	// 				await connector.activate();
	// 			}
	// 		} catch (err) {
	// 			console.debug(`web3-react eager connection error: ${err}`);
	// 		}
	// 	};
	// 	connectEagerly();
	// }, [connectionType])

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
	  setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleDeactivation = async (connectionType: ConnectionType) => {
		const deactivation = await tryDeactivateConnector(getConnection(connectionType).connector);
		if (deactivation === undefined) {
			return;
		}
		setConnectionType(deactivation);
		update();

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
				startIcon={<Avatar sx={styles.avatar} />}
				endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
				sx={styles.connectedButton}
			>
				{account.substring(0,4)}...{account.substring(account.length - 4, account.length)}
			</Button>
			<WalletDropdown
				id={id}
				open={open}
				anchorEl={anchorEl}
				account={account}
				chainId={chainId}
				connectionType={connectionType}
				disconnect={handleDeactivation}
			/>
			</>
			) : (
			<ConnectWalletModal>
				<Grid item xs={12}>
				<Box display="flex" justifyContent="center" alignItems="center">
					<WalletOptions
						activeConnectionType={connectionType}
						isConnectionActive={isActive}
						onActivate={setConnectionType}
						onDeactivate={setConnectionType}
					/>
				</Box>
				</Grid>
			</ConnectWalletModal>
		)}
		</>

	);
}