import React from "react";
import { useWeb3React } from "@web3-react/core";
import { 
	Box,
	Chip,
	Stack
} from "@mui/material";
import SimpleDashboardContent, { ContentProps } from "./SimpleDashboardContent";
import BorrowModalButton from "./BorrowModalButton";
import useWallet from "../hooks/useWallet";
import usdcIcon from "../images/usd-coin-usdc-logo.png";

const styles = {
	box: {
		marginTop: "0.5em",
	},
	stack: {
		flexWrap: "wrap", 
		gap : 1.25
	}
};

const formatDate = (date: Date): string => {
	let date_str: string = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
	return date_str;
}

export default function BorrowDashboardContent() {
	let { account } = useWeb3React();
	let { dUsdcBalance, lineOfCredit, rate } = useWallet();
	const borrowMax = !lineOfCredit?.borrowMax ? "0.0" : lineOfCredit?.borrowMax;
	dUsdcBalance = !dUsdcBalance ? "0.0" : dUsdcBalance;
	rate = !rate ? "0.0" : rate;
	const remainingBalance = parseFloat(borrowMax) - parseFloat(dUsdcBalance);
	const balance =  remainingBalance > 0 ? remainingBalance : "0.0";
	const creationTimestamp = !lineOfCredit?.creationTimestamp
		? 0 : lineOfCredit?.creationTimestamp * 1000;
	const expirationTimestamp = !lineOfCredit?.expirationTimestamp 
		? 0 : lineOfCredit?.expirationTimestamp * 1000;
	const maturityDate = new Date(expirationTimestamp);
	const creationDate = new Date(creationTimestamp);
	const borrowMaxTemplate = `Borrow Max: ${borrowMax}`;
	const creationTemplate = `Creation Date: ${formatDate(creationDate)}`;
	const maturityTemplate = `Maturity Date: ${formatDate(maturityDate)}`;
	const rateTemplate = `APR: ${rate}`;
	
	const contentProps: ContentProps = {
		balanceType: "Remaining",
		avatarIcon: usdcIcon,
		balance: balance.toString(),
		button: <BorrowModalButton />
	}

	const stringTemplates: string[] = [
		borrowMaxTemplate,
		creationTemplate,
		maturityTemplate,
		rateTemplate
	]

	return (
		<>
		{(parseFloat(borrowMax) > 0 && account) ?
			<Box display="flex" justifyContent="start" sx={styles.box}>
				<Stack 
					direction="row" 
					spacing={1}
					sx={styles.stack}
				>
					<>
					{stringTemplates.map((template, i) => {
						return (
							<Chip 
								key={i} 
								label={template} 
								variant="outlined" 
							/>
						)
					})}
					</>
				</Stack>
			</Box>
				: <Box display="flex" justifyContent="start" sx={styles.box}>
						<Chip label="Reach out to us to apply to become a borrower" />
					</Box>
		}
		<SimpleDashboardContent
			balanceType={contentProps.balanceType}
			avatarIcon={contentProps.avatarIcon}
			balance={contentProps.balance}
			button={contentProps.button}
		/>
		</>
	);
}