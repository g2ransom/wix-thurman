import React from "react";
import {
	Box,
	Container,
	Grid,
} from "@mui/material";
import BorrowDashboardContent from "../components/BorrowDashboardContent";
import DashboardSection from "../components/DashboardSection";
import SimpleDashboardContent from "../components/SimpleDashboardContent";
import BorrowersSection from "../components/BorrowersSection";
import GrantSupplyModalButton from "../components/GrantSupplyModalButton";
import RepayModalButton from "../components/RepayModalButton";
import SupplyModalButton from "../components/SupplyModalButton";
import WithdrawModalButton from "../components/WithdrawModalButton";
import useWallet from "../hooks/useWallet";
import usdcIcon from "../images/usd-coin-usdc-logo.png"

const styles = {
  // box: {
  // 	backgroundColor: "#E8E8E8",
  // 	minHeight: "100vh",
  // 	paddingBottom: "5em",
  // },
  container: {
  	backgroundColor: "#E8E8E8",
  	minHeight: "100vh",
  	paddingBottom: "5em",
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
	balanceType: string;
	icon: string;
	balance: string | undefined;
	button: React.ReactElement<any, any>;
}

export default function Home() {
	const { usdcBalance, gUsdcBalance, sUsdcBalance, dUsdcBalance } = useWallet();

	const dashboardProps: DahboardContentProps[] = [
		{
			title: "Assets",
			balanceType: "USDC",
			icon: usdcIcon,
			balance: usdcBalance,
			button: <SupplyModalButton />
		},
		{
			title: "Your Borrows",
			balanceType: "Debt",
			icon: usdcIcon,
			balance: dUsdcBalance,
			button: <RepayModalButton />
		},
		{
			title: "Your Supplies",
			balanceType: "Supply",
			icon: usdcIcon,
			balance: sUsdcBalance,
			button: <WithdrawModalButton />
		},
		{
			title: "Your Grants",
			balanceType: "Grant",
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
					{dashboardProps.map((section, i) => {
						return (
							<DashboardSection title={section.title} key={i}>
								<SimpleDashboardContent
									balanceType={section.balanceType}
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
					<BorrowersSection />				
				</Grid>
			</Box>
		</Container>
	);
}