import React from "react";
import {
	Box,
	Button,
	Container,
	Grid,
} from "@mui/material";
import BorrowDashboardContent from "../components/BorrowDashboardContent";
import DashboardSection from "../components/DashboardSection";
import SimpleDashboardContent, { ContentProps } from "../components/SimpleDashboardContent";
import ProposalSection from "../components/ProposalSection";
import BorrowersSection from "../components/BorrowersSection";
import BorrowModalButton from "../components/BorrowModalButton";
import GrantSupplyModalButton from "../components/GrantSupplyModalButton";
import RepayModalButton from "../components/RepayModalButton";
import SupplyModalButton from "../components/SupplyModalButton";
import WithdrawModalButton from "../components/WithdrawModalButton";
import useWallet from "../hooks/useWallet";
import usdcIcon from "../images/usd-coin-usdc-logo.png"

const styles = {
  container: {
  	backgroundColor: "#F5F5F5",
  	height: "100%",
  },
  button: {
  	backgroundColor: "black",
  	"&:hover": {
  		backgroundColor: "#525252",
  	},
  	fontWeight: "600"
  },
}

type DahboardContentProps = {
	title: string;
	assetName: string;
	icon: string;
	balance: string | undefined;
	button: React.ReactElement<any, any>;
}

export default function Home() {
	const { account, usdcBalance, gUsdcBalance, sUsdcBalance, dUsdcBalance, lineOfCredit } = useWallet();
	const borrowMax = !lineOfCredit?.borrowMax ? "0.0" : lineOfCredit?.borrowMax

	const dashboardProps: DahboardContentProps[] = [
		{
			title: "Assets",
			assetName: "USDC",
			icon: usdcIcon,
			balance: usdcBalance,
			button: <SupplyModalButton />
		},
		{
			title: "Your Borrows",
			assetName: "dUSDC",
			icon: usdcIcon,
			balance: dUsdcBalance,
			button: <RepayModalButton />
		},
		{
			title: "Your Supplies",
			assetName: "sUSDC",
			icon: usdcIcon,
			balance: sUsdcBalance,
			button: <WithdrawModalButton />
		},
		{
			title: "Your Grants",
			assetName: "gUSDC",
			icon: usdcIcon,
			balance: gUsdcBalance,
			button: <GrantSupplyModalButton />
		}
	];

	return (
		<Container maxWidth={false} sx={styles.container}>
		<Box>
			<Grid container spacing={2}>
				<>
				{dashboardProps.map((section) => {
					return (
						<DashboardSection title={section.title}>
							<SimpleDashboardContent
								asset={section.assetName}
								avatarIcon={section.icon}
								balance={section.balance}
								button={section.button}
							/>
						</DashboardSection>
					);
				})}
				</>
				<DashboardSection title="Assets to Borrow">
					<BorrowDashboardContent />
				</DashboardSection>
				<ProposalSection />
				<BorrowersSection />				
			</Grid>
		</Box>
		</Container>
	);
}