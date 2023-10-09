import USDC from "./USDC.json";
import Polemarch from "./Polemarch.json";
import SToken from "./SToken.json";
import GToken from "./GToken.json";
import DToken from "./DToken.json"

export const apiUrl = "https://api.thurman.io";

interface IChainMap {
  [key: string]: {
    name: string;
    etherscanUrl: string;
  };
} 

interface INetworkMap {
  [key: number]: {
    name: string;
    etherscanUrl: string;
  }
};

export const chainMap: IChainMap = {
  "0x1": {
    name: "Ethereum Mainnet",
    etherscanUrl: "https://etherscan.io"
  },
  "0x5": {
    name: "Goerli Testnet",
    etherscanUrl: "https://goerli.etherscan.io"
  }
}

export const networkMap: INetworkMap = {
  1: {
    name: "Ethereum Mainnet",
    etherscanUrl: "https://etherscan.io"
  },
  5: {
    name: "Goerli Testnet",
    etherscanUrl: "https://goerli.etherscan.io"
  }
}

interface IGovChainUrlMap {
  [key: number]: {
    url: string;
  }
}

export const govChainUrlMap: IGovChainUrlMap = {
  1: {
    url: "https://www.tally.xyz/gov/thurman"
  },
  5: {
    url: "https://www.tally.xyz/gov/goerli-thurmandao"
  }
};

export const USDC_ADDRESS_GOERLI = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";
export const USDC_ADDRESS_MAINNET = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const POLEMARCH_ADDRESS_GOERLI = "0x1De9cAFFc75013501c794cfd8fb82aD6FfE2517f";
export const POLEMARCH_ADDRESS_MAINNET = "0x092Cb11b1d114Ed97f57f7A003dc68a13e58FE9f"
export const SUSDC_ADDRESS_GOERLI = "0x2F20A09579c734Cb03624AB8eA1E909163f361F7";
export const SUSDC_ADDRESS_MAINNET = "0x661e2eA95Aa93cd8398C19E8519b2811888Df75d";
export const GUSDC_ADDRESS_GOERLI = "0x23C6f81b54143660e73f3eE5A39d7E7A06E45d15";
export const GUSDC_ADDRESS_MAINNET = "0xc6aA41FC6e27fF39CC3F12dE4844a585d8b10cF0";
export const DUSDC_ADDRESS_GOERLI = "0x48EE7Ca951D1B13d0F4077790C8350F004b35d46";
export const DUSDC_ADDRESS_MAINNET = "0x0360fDD5550C2831097B674eC15B003D4621ed11";

export const USDC_DECIMALS = 6;
export const DECIMALS = 18;
export const WAD = 18;
export const RAY = 27;

interface INetworkContractMap {
  [key: number]: {
    [contract: string]: {
      address: string;
      abi: any;
      decimals: number;
    }
  }
};

export const NetworkContractMap: INetworkContractMap = {
  1: {
    "USDC": {
      address: USDC_ADDRESS_MAINNET,
      abi: USDC.abi,
      decimals: USDC_DECIMALS,
    },
    "Polemarch": {
      address: POLEMARCH_ADDRESS_MAINNET,
      abi: Polemarch.abi,
      decimals: DECIMALS,
    },
    "sUSDC": {
      address: SUSDC_ADDRESS_MAINNET,
      abi: SToken.abi,
      decimals: USDC_DECIMALS,
    },
    "gUSDC": {
      address: GUSDC_ADDRESS_MAINNET,
      abi: GToken.abi,
      decimals: USDC_DECIMALS,
    },
    "dUSDC": {
      address: DUSDC_ADDRESS_MAINNET,
      abi: DToken.abi,
      decimals: USDC_DECIMALS,
    }
  },
  5: {
    "USDC": {
      address: USDC_ADDRESS_GOERLI,
      abi: USDC.abi,
      decimals: USDC_DECIMALS,
    },
    "Polemarch": {
      address: POLEMARCH_ADDRESS_GOERLI,
      abi: Polemarch.abi,
      decimals: DECIMALS,
    },
    "sUSDC": {
      address: SUSDC_ADDRESS_GOERLI,
      abi: SToken.abi,
      decimals: USDC_DECIMALS
    },
    "gUSDC": {
      address: GUSDC_ADDRESS_GOERLI,
      abi: GToken.abi,
      decimals: USDC_DECIMALS
    },
    "dUSDC": {
      address: DUSDC_ADDRESS_GOERLI,
      abi: DToken.abi,
      decimals: USDC_DECIMALS,
    }
  }
}