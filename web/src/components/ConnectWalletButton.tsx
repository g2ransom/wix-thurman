import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import useWallet from "../hooks/useWallet";
import { 
	chainMap, 
	govChainUrlMap 
} from "../constants/constants";
import metamaskIcon from "../images/metamask-icon.png";
import ethIcon from "../images/ethereum_icon.png";

const styles = {
  connectButton: {
    marginLeft: "1.5em",
    fontWeight: "600",
  },
  connectedButton: {
  	marginLeft: "1.5em",
    color: "#484848",
  	border:"1px solid black",
  },
  divider: {
  	margin: "0.5em 0em 0.5em 0em"
  },
  popperPaper: {
    padding: "0.75em 1.5em 1.5em 1.5em",
  },
  stack: {
    margin: "0.75em 0 0.75em 0",
  },
  typography: {
    margin: "0em 0em 0.75em 0em",
  },
  metamask: {
    width: "1.15em",
    height: "1.15em",
  },
  ethIcon: {
    width: "0.75em",
    height: "0.75em",
  },
  link: {
    color: "black",
  },
};

export default function ConnectWalletButton() {
	const { account, ethBalance, connect, chainId, status } = useWallet();

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const networkChainId = !chainId ? "0x1" : chainId;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

	return (
		<Box>
			{status === "connected" ? (
				<Box>
					<Button
						variant="outlined"
						disableRipple={true}
						sx={styles.connectedButton}
						onClick={handleClick}
						startIcon={<Avatar src={metamaskIcon} sx={styles.metamask} />}
						endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					>
						{account.substring(0,4)}...{account.substring(account.length - 4, account.length)}
					</Button>
					<Popper 
						id={id}
						open={open}
						anchorEl={anchorEl}
					>
						<Paper variant="outlined" sx={styles.popperPaper}>
							  {networkChainId && (
							    <Box>
							      <Typography variant="body1" sx={{...styles.typography, fontWeight: "bold"}}>
							        Network
							      </Typography>
							      <Typography variant="body2" sx={styles.typography}>
							        {chainMap[networkChainId]?.name}
							      </Typography>
							      <Divider sx={styles.divider} />
							    </Box>
							  )
							}
							{ethBalance && (
								<Box>
								  <Stack direction="row" spacing={1} alignItems="center" sx={styles.stack}>
								    <Avatar src={ethIcon} sx={styles.ethIcon} />
								    <Typography variant="body2">
								      ETH Balance: {parseFloat(ethBalance).toFixed(3)}
								    </Typography>
								  </Stack>
								  <Divider sx={styles.divider}/>
								</Box>
							)}
							{account && (
							  <Box display="flex" flexDirection="row">
							    <Typography variant="body2" sx={{...styles.typography, fontWeight: "bold"}}>
							    <Link
							      href={`${chainMap[networkChainId]?.etherscanUrl}/address/${account}`}
							      target="_blank"
							      sx={styles.link}
							    >
							      Etherscan
							    </Link>
							    </Typography>
							  </Box>
							)}
							{networkChainId && (
							  <Box display="flex" flexDirection="row">
							    <Typography variant="body2" sx={{...styles.typography, fontWeight: "bold"}}>
							    <Link
							      href={govChainUrlMap[networkChainId].url}
							      target="_blank"
							      sx={styles.link}
							    >
							      Governance
							    </Link>
							    </Typography>
							  </Box>
							)}
						</Paper>
					</Popper>
				</Box>
			) : (
			<Button
				variant="contained"
				startIcon={<Avatar src={metamaskIcon} sx={styles.metamask} />}
				sx={styles.connectButton}
				onClick={connect}
			>
				Connect Wallet
			</Button>
			)}
		</Box>
	);

}