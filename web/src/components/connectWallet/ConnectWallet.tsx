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
import axios from "axios";
import {
	ConnectionType,
	getConnection,
	tryDeactivateConnector
} from "./connections";
import WalletOptions from "./WalletOptions";
import useWallet from "../../hooks/useWallet";
import { apiUrl, networkMap } from "../../constants/constants";


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
		backgroundColor: "black",
		fontWeight: "800",
		"&:hover": {
			backgroundColor: "#525252",
		},
	},
	divider: {
		margin: "0.5em 0em 0.5em 0em"
	},
	explorerButton: {
		color: "black"
	},
	popperPaper: {
	  padding: "0.75em 0.5em 1.5em 0.5em",
	},
	typography: {
	  margin: "0em 0em 0.4em 0em",
	},
}

type DisconnectWalletMPEvent = {
	account: string;
	chainId: string;
}

type WalletDropdownProps = {
	id: string | undefined;
	open: boolean;
	anchorEl: HTMLElement | null;
	account: string | undefined;
	chainId: number | undefined;
	connectionType: ConnectionType | null;
	disconnect: (event: React.MouseEvent<HTMLElement>, c: ConnectionType) => Promise<void>
}

function WalletDropdown({ id, open, anchorEl, account, chainId, connectionType, disconnect }: WalletDropdownProps) {
	return (
		<Popper 
			id={id}
			open={open}
			anchorEl={anchorEl}
		>
			<Paper variant="outlined" square={true} sx={styles.popperPaper}>
				<Stack spacing={1}>
				  {chainId && (
			      <Box>
				      <Typography variant="body2" sx={{...styles.typography, color: "gray"}}>
				        Network
				      </Typography>
				      <Typography variant="body1" sx={{...styles.typography, fontWeight: "bolder"}}>
				        { networkMap[chainId].name }
				      </Typography>
				      <Divider sx={styles.divider}/>
			      </Box>
				  )}
					{connectionType && (						
						<>
						<Box display="flex" justifyContent="center">
							<Button
								variant="contained"
								size="small"
								onClick={(event) => disconnect(event, connectionType)}
								sx={styles.disconnectButton}
							>
								Disconnect
							</Button>
						</Box>
						<Divider sx={styles.divider}/>
						</>
					)}
					{(account && chainId) && (
				    <Button 
				    	href={`${networkMap[chainId]?.etherscanUrl}/address/${account}`}
				    	target="_blank"
				    	size="small"
				    	startIcon={<OpenInNew />}
				    	sx={styles.explorerButton}
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
	const { connector, chainId, account, isActive } = useWeb3React();
	const { update } = useWallet();
	const [connectionType, setConnectionType] = useState<ConnectionType | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	useEffect(() => {
		if (connector && isActive) {
			setConnectionType(getConnection(connector).type);
		}
	}, [connector, isActive]);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
	  setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleDeactivation = async (event: React.MouseEvent<HTMLElement>, connectionType: ConnectionType) => {
		const deactivation = await tryDeactivateConnector(getConnection(connectionType).connector);
		if (deactivation === undefined) {
			return;
		}
		setAnchorEl(anchorEl ? null : event.currentTarget);
		const { data } = await axios.post<DisconnectWalletMPEvent>(
			`${apiUrl}/api/mixpanel-analytics/disconnect-wallet`,
			{ account: account, chainId: chainId }
		)
		console.log(data);
		update();
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