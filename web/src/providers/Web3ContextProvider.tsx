import React, { 
  ReactNode, 
  useEffect 
} from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { ConnectionType, getConnection, PRIORITIZED_CONNECTORS } from "../components/walletConnect/connections";

// const connect = async (connector: Connector) => {
//   try {
//     if (connector.connectEagerly) {
//       await connector.connectEagerly();
//     } else {
//       await connector.activate();
//     }
//   } catch (err) {
//     console.debug(`web3-react eager connection error: ${err}`);
//   }
// }

// const connectEagerly = async () => {
//   // await connect(getConnection(ConnectionType.NETWORK).connector);
//   // await connect(getConnection(ConnectionType.GNOSIS_SAFE).connector);
//   // await connect(getConnection(ConnectionType.INJECTED).connector);
// }

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  // useEffect(() => {
  //   connectEagerly()
  // }, []);

  return (
    <Web3ReactProvider
      connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [connector.connector, connector.hooks])}
    >
      {children}
    </Web3ReactProvider>
  );
}