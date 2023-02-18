import React from "react";
import {
	Box,
	Container,
	Grid,
} from "@mui/material";
import DashboardSection from "../components/DashboardSection";
import SupplyModalButton from "../components/SupplyModalButton";
import WithdrawModalButton from "../components/WithdrawModalButton";
import useWallet from "../hooks/useWallet";
import usdcIcon from "../images/usdc.png"

const styles = {
  container: {
  	backgroundColor: "#F5F5F5",
  	height: "100vh",
  },
  button: {
  	backgroundColor: "black",
  	"&:hover": {
  		backgroundColor: "#525252",
  	},
  	fontWeight: "600"
  },
}

export default function Home() {
	const { usdcBalance, sUsdcBalance } = useWallet();

	return (
		<Container maxWidth={false} sx={styles.container}>
		<Box>
			<Grid container spacing={2}>
				<DashboardSection
					title="Assets"
					asset="USDC"
					avatarIcon={usdcIcon}
					balance={usdcBalance}
					button={<SupplyModalButton />}
				/>
				<DashboardSection
					title="Your Supplies"
					asset="sUSDC"
					avatarIcon={usdcIcon}
					balance={sUsdcBalance}
					button={<WithdrawModalButton />}
				/>
			</Grid>
		</Box>
		</Container>
	);
}