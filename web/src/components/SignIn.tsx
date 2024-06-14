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

const VERSION = "1";

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
	const [signed, setSigned] = useState<boolean>(false);
	let networkChainId = !chainId ? 1 : chainId;
	console.log("signed: ", signed);

	const handleSignature = async () => {
		const { ethereum } = window;
		const provider = new ethers.BrowserProvider(ethereum as any);
		const signer = await provider.getSigner();
		const statement = "Sign in with Ethereum to use the app.";

		const domain = window.location.host;
		const origin = window.location.origin;

		try {
				if (account) {
					const { data } = await axios.get(
						`${apiUrl}/api/auth/nonce`,
					)

					const params: SiweMessageParams = {
			    	domain, 
			    	address: account,
			    	statement,
			    	origin,
			    	version: VERSION,
			    	chainId: networkChainId,
			    	nonce: data.nonce
			    };

			    const message = await createSiweMessage(params);
			    const signature = await signer.signMessage(message);

			    const response = await axios.post<Verify>(
			    	`${apiUrl}/api/auth/verify`,
			    	{ message: message, signature: signature, nonce: data.nonce }
			    )
			    let success = response.data;
			    if (success) {
			    	setSigned(true);
			    } else {
			    	setSigned(false);
			    }
			    // setSigned(success);
				}
		  } catch (e) {
		    console.error(e);
		    setSigned(false);
		  }
	};

	return (
		<Box>
			{account && 
				<Button
					variant="contained"
					onClick={handleSignature}
					sx={styles.button}
					disabled={signed}
				>
					{signed ? "Signed in" : "Sign in"}
				</Button>
			}
		</Box>
	)
}