import { 
  ethers,
  formatEther,
  formatUnits,
  parseUnits,
  BigNumberish,
  Contract,
  Provider
} from "ethers";
import { LineOfCredit } from "../context/AccountContext";
import { ACTION_TYPE } from "../reducers/TransactionReducer";
import { 
  USDC_DECIMALS, 
  NetworkContractMap 
} from "../constants/constants";

export type ErrorWithCode = {
  code: number;
  [key: string]: any;
};

export interface AccountState {
  ethBalance: string;
  usdcBalance: string;
  sUsdcBalance: string;
  gUsdcBalance: string;
  dUsdcBalance: string;
  approvedUsdcBalance: string;
  lineOfCredit: LineOfCredit;
  rate: string;
}

export type ApprovalFuncParams = {
  dispatch: (action: ACTION_TYPE) => void;
  update: () => void;
  value: string;
  networkChainId: string;
}

export const ERROR_CODE_TX_REQUEST_REJECTED = 4001;

export const handleApproval = async (params: ApprovalFuncParams) => {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum as any);
    const signer = await provider.getSigner();
    const { dispatch, update, value, networkChainId } = params;

    const usdc: Contract = new ethers.Contract(
      NetworkContractMap[networkChainId]["USDC"].address,
      NetworkContractMap[networkChainId]["USDC"].abi,
      signer,
    );

    try {
      const tx = await usdc.approve(
        NetworkContractMap[networkChainId]["Polemarch"].address,
        parseUnits(value, NetworkContractMap[networkChainId]["USDC"].decimals),
      );
      dispatch({
        type: "inProgress",
        payload: {
          transactionType: "approval",
        }
      });
      await tx.wait();
      dispatch({
        type: "approvalSuccess",
        payload: {
          txHash: tx.hash,
        }
      });
      update();
    } catch (e) {
      console.error(e);
      if ("code" in (e as { [key: string]: any })) {
        if ((e as ErrorWithCode).info.error.code === ERROR_CODE_TX_REQUEST_REJECTED) {
          dispatch({ 
            type: "permissionRejected",
            payload: {
              error: "You rejected the transaction 🤷🏿‍♂️",
            }
          });
          return;
        }
      }
      dispatch({
        type: "failed",
        payload: {
          transactionType: "approval",
          error: "The transaction failed 🤦🏿‍♂️",
        }
      });   
    }
  }

export async function getAccountState(
  account: string, 
  chainId: string, 
  provider: Provider
): Promise<AccountState> {
  let ethBalance: string;
  let usdcBalance: string;
  let approvedUsdcBalance: string = "0.00";
  let sUsdcBalance: string = "0.00";
  let gUsdcBalance: string = "0.00";
  let dUsdcBalance: string = "0.00";
  let lineOfCredit: LineOfCredit = undefined;
  let rate: string = "0.00";

  const etherBalance: BigNumberish = await provider.getBalance(account);
  ethBalance = formatEther(etherBalance);

  const usdc: Contract = new ethers.Contract(
    NetworkContractMap[chainId]["USDC"].address,
    NetworkContractMap[chainId]["USDC"].abi,
    provider,
  );
  usdcBalance = await usdc.balanceOf(account)
    .then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));
  

  if (NetworkContractMap[chainId]["sUSDC"]?.address && NetworkContractMap[chainId]["sUSDC"]?.abi) {
    const sUsdc = new ethers.Contract(
      NetworkContractMap[chainId]["sUSDC"].address,
      NetworkContractMap[chainId]["sUSDC"].abi,
      provider
    );
    sUsdcBalance = await sUsdc.balanceOf(account)
      .then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));
  }

  if (NetworkContractMap[chainId]["gUSDC"]?.address && NetworkContractMap[chainId]["gUSDC"]?.abi) {
    const gUsdc = new ethers.Contract(
      NetworkContractMap[chainId]["gUSDC"].address,
      NetworkContractMap[chainId]["gUSDC"].abi,
      provider
    );
    gUsdcBalance = await gUsdc.balanceOf(account)
      .then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));
  }

  if (NetworkContractMap[chainId]["dUSDC"]?.address && NetworkContractMap[chainId]["dUSDC"]?.abi) {
    const dUSDC = new ethers.Contract(
      NetworkContractMap[chainId]["dUSDC"].address,
      NetworkContractMap[chainId]["dUSDC"].abi,
      provider
    );
    dUsdcBalance = await dUSDC.balanceOf(account)
      .then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));

    rate = await dUSDC.userRate(account)
      .then((num: BigNumberish) => formatUnits(num, 27));
  }

  if (NetworkContractMap[chainId]["Polemarch"]?.address) {
    approvedUsdcBalance = await usdc.allowance(
      account,
      NetworkContractMap[chainId]["Polemarch"].address
    ).then((num: BigNumberish) => formatUnits(num, USDC_DECIMALS));

    const polemarch: Contract = new ethers.Contract(
      NetworkContractMap[chainId]["Polemarch"].address,
      NetworkContractMap[chainId]["Polemarch"].abi,
      provider
    );

    lineOfCredit = await polemarch.getLineOfCredit(account)
      .then((loc): LineOfCredit => {
        const borrowMax = formatUnits(loc.borrowMax, USDC_DECIMALS);
        return {
          borrowMax: borrowMax,
          lastRepaymentTimestamp: Number(loc.lastRepaymentTimestamp),
          creationTimestamp: Number(loc.creationTimestamp),
          expirationTimestamp: Number(loc.expirationTimestamp),
          delinquent: loc.delinquent,
        }
      });
  }

  return {
    ethBalance,
    usdcBalance,
    sUsdcBalance,
    gUsdcBalance,
    dUsdcBalance,
    approvedUsdcBalance,
    lineOfCredit,
    rate
  };
}