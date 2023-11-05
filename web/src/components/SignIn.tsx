import React, { useState } from "react";
import {
	Box,
	Button
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import axios from "axios";
import { apiUrl } from "../constants/constants";


const styles = {
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
		marginLeft: "0.25em",
	},
}

type SiweMessageParams = {
	domain: string;
	address: string;
	statement: string;
	origin: string;
	version: string;
	chainId: number;
	nonce: string;
}

type Verify = {
	message: string;
	signature: string;
	nonce: string;
};

const createSiweMessage = async ({ 
	domain, 
	address, 
	statement,
	origin,
	version,
	chainId,
	nonce
}: SiweMessageParams): Promise<string> => {
	// ADD API NONCE GENERATION
	const message = new SiweMessage({
		domain,
		address,
		statement,
		uri: origin,
		version: version,
		chainId: chainId,
		nonce: nonce
	});
	return message.prepareMessage();
}

export default function SignIn() {
	let { account, chainId } = useWeb3React();
	// const [signed, setSigned] = useState<boolean>(false);
	let networkChainId = !chainId ? 1 : chainId;

	const handleSignature = async () => {
		const { ethereum } = window;
		const provider = new ethers.BrowserProvider(ethereum as any);
		const signer = await provider.getSigner();
		const statement = "Sign in with Ethereum to use the app.";

		const domain = window.location.host;
		const origin = window.location.origin;
		const version = "1";
		// const nonce = "32891757";
		const { data } = await axios.get(
			`${apiUrl}/api/auth/nonce`,
		)

		try {
				if (account) {
					const params: SiweMessageParams = {
			    	domain, 
			    	address: account,
			    	statement,
			    	origin,
			    	version,
			    	chainId: networkChainId,
			    	nonce: data.nonce
			    };

			    const message = await createSiweMessage(params);
			    const signature = await signer.signMessage(message);

			    const response = await axios.post<Verify>(
			    	`${apiUrl}/api/auth/verify`,
			    	{ message: message, signature: signature, nonce: data.nonce }
			    )

			    console.log(response.data);
				}
		  } catch (e) {
		    console.error(e);
		  }
	};

	return (
		<Box>
			{account && 
				<Button
					variant="contained"
					onClick={handleSignature}
					sx={styles.button}
				>
					Sign in
				</Button>
			}
		</Box>
	)
}