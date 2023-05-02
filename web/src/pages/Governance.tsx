import React from "react";
import {
	Container,
	Grid
} from "@mui/material";
import GovernanceHeader from "../components/GovernanceHeader";
import GovernanceProposals from "../components/GovernanceProposals";

const styles = {
	container: {
  	backgroundColor: "#F5F5F5",
  	height: "100%",
  }
}

export default function Governance() {
	return (
		<>
		<Container maxWidth={false} sx={styles.container}>
			<Grid container spacing={2}>
				<GovernanceHeader />
				<GovernanceProposals />
			</Grid>
		</Container>
		</>
	);
}