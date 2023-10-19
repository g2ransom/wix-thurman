import React from "react";
import {
	Avatar,
	Grid,
	Paper,
	Stack,
	Typography
} from "@mui/material";

export type AssetBalance = {
	name: string;
	icon: string;
	balance: string;
};

export type AssetBalancesProps = {
	assetBalances: AssetBalance[];
};

const styles = {
	grid: {
		width: "85%",
		margin: "0.5em 0em 0.5em 0em",
	},
	avatar: {
		width: "1em",
		height: "1em",
	},
	typography: {
		fontWeight: "bold",
		color: "#3B3B3B"
	},
	paper: {
		backgroundColor: "#F1F1F1",
		padding: "0.25em 0.25em 0.3em 0.25em",
		margin: "0em 0.1em 0.1em 0em",
	}
}

export default function AssetBalances({ assetBalances }: AssetBalancesProps) {
	return (
		<Grid container spacing={0} sx={styles.grid}>		
			<Grid item xs={6}>
				<Paper elevation={0} sx={styles.paper}>			
					<Typography 
						variant="body2" 
						align="left"
						sx={styles.typography}
					>
						Assets
					</Typography>
				</Paper>
			</Grid>
			<Grid item xs={6}>
				<Paper elevation={0} sx={styles.paper}>				
					<Typography 
						variant="body2" 
						align="left"
						sx={styles.typography}
					>
						Balances
					</Typography>
				</Paper>
			</Grid>
			{assetBalances.map((assetBalance, i) => {
				return (
					<>
					<Grid item xs={6}>
						<Paper elevation={0} sx={styles.paper}>
							<Stack direction="row" spacing={1}>
								<Avatar 
									alt={assetBalance.name} 
									src={assetBalance.icon} 
									sx={styles.avatar}
								/>
								<Typography 
									variant="body2"
									sx={styles.typography}
								>
									{assetBalance.name}
								</Typography>
							</Stack>
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper elevation={0} sx={styles.paper}>
							<Typography 
								variant="body2"
								align="left"
								sx={styles.typography}
							>
								{assetBalance.balance}
							</Typography>
						</Paper>
					</Grid>
					</>
				)
			})
			}
		</Grid>
	);
}