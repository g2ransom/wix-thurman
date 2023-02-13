import React from "react";
import {
	Avatar,
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import SupplyModalButton from "../components/SupplyModalButton";
import useWallet from "../hooks/useWallet";
import usdcIcon from "../images/usdc.png"

const styles = {
	paper: {
		margin: "1em 1em 1em 1em",
		padding: "1em 1em 1em 1em",
	},
	usdcIcon: {
    width: "1.25em",
    height: "1.25em",
  },
  supplyButton: {
  	backgroundColor: "black",
  	"&:hover": {
  		backgroundColor: "#525252",
  	},
  },
  sectionTypography: {
  	fontWeight: "600",
  },
  stack: {
    margin: "0.75em 0 0.75em 0",
  },
}

type DashboardSectionProps = {
	title: string;
	asset: string;
	avatarIcon: string;
	balance: string | undefined;
	button: React.ReactElement<any, any>;
}


function DashboardSection({
	title,
	asset,
	avatarIcon,
	balance,
	button
}: DashboardSectionProps) {
	return (
		<Grid item xs={12} sm={6}>
			<Paper elevation={0} variant="outlined" sx={styles.paper}>
				<Box>
					<Typography 
						variant="h6" 
						align="left"
						sx={styles.sectionTypography}
					>
						{title}
					</Typography>
					<Box display="flex" justifyContent="space-between">
					  <>
					  <Stack direction="row" spacing={1} alignItems="center" sx={styles.stack}>
					    <Avatar src={avatarIcon} sx={styles.usdcIcon} />
					    {balance && <Typography variant="body1">
					      {asset} Balance: {parseFloat(balance).toFixed(3)}
					    </Typography>}
					  </Stack>
					  {button}
					  </>
				  </Box>
				</Box>
			</Paper>
		</Grid>
	);
}

export default function Home() {
	const { usdcBalance, sUsdcBalance } = useWallet();

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Paper elevation={0} variant="outlined" sx={styles.paper}>
						<Box>
							<Typography 
								variant="h6" 
								align="left"
								sx={styles.sectionTypography}
							>
								Assets
							</Typography>
							<Box display="flex" justifyContent="space-between">
							  <Stack direction="row" spacing={1} alignItems="center" sx={styles.stack}>
							    <Avatar src={usdcIcon} sx={styles.usdcIcon} />
							    {usdcBalance && <Typography variant="body1">
							      USDC Balance: {parseFloat(usdcBalance).toFixed(3)}
							    </Typography>}
							  </Stack>
							  <SupplyModalButton />
						  </Box>
						</Box>
					</Paper>
				</Grid>
				<DashboardSection
					title="Your Supplies"
					asset="sUSDC"
					avatarIcon={usdcIcon}
					balance={sUsdcBalance}
					button={<Button variant="contained" sx={styles.supplyButton}>Withdraw </Button>}
				/>
			</Grid>
		</Box>
	);
}