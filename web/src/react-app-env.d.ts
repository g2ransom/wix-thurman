/// <reference types="react-scripts" />

import { MetaMaskInpageProvider } from "@metamask/providers";
import { ExternalProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}
