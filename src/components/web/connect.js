import Web3 from "web3";
import {
  CHAIN_ID,
  EXPLORAR_LINK,
  NETWORK_DECIMALS,
  NETWORK_NAME,
  NETWORK_SYMBOL,
  RPC_URL,
} from "../../constant";
import { setWalletAddress } from "../../redux/Address/address";
import store from "../../redux/store";
import { toast } from "../common/Toasts/Toast";

export const isMetaMaskInstalled = async () => {
  const { ethereum } = window;
  const result = await Boolean(ethereum);
  return result;
};

/**CONNECT WITH METAMASK */
export const connectmetamask = () => {
  return (dispatch) =>
    new Promise(async (resolve, reject) => {
      /**CHECK METAMASK IN INSTALLED OR NOT */
      const installed = await isMetaMaskInstalled();
      try {
        let address;
        if (installed) {
          const { ethereum } = window;

          /**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
          let validNetwork = await approveNetwork();
          if (validNetwork) {
            /**METHOD CALL WHEN ACCOUNT CHANGED IN METAMASK */
            ethereum.on("accountsChanged", async function (accounts) {
              address = accounts[0];

              /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
              return dispatch(setWalletAddress(address));
            });

            /**METHOD CALL WHEN NETWORK CHANGED IN METAMASK */
            // ethereum.on('chainChanged', function (networkId: number) {
            //     setTimeout(function () { window.location.reload(); }, 1000);
            // })

            /**GET ACCOUNT DETAILS */
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            address = accounts[0];

            /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
            resolve(address);
            return dispatch(setWalletAddress(address));
          } else {
            reject(false);
          }
        } else {
          /**IF METAMASK NOT INSTALLED */
          reject(false);
          return toast.error("Please install Metamask.");
        }
      } catch (error) {
        reject(error);
        return toast.error(error.message);
      }
    });
};
const { ethereum } = window;
if (ethereum) {
  ethereum.on("networkChanged", function () {
    approveNetwork();
  });

  ethereum.on("accountsChanged", function (account) {
    if (!account.length) {
      store.dispatch(setWalletAddress(""));
    }
  });
}

/**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
export const approveNetwork = async () => {
  return new Promise(async (resolve, reject) => {
    const { ethereum } = window;
    /**IF METAMASK IS ON DIFFRENT NETWORK */
    if (ethereum.networkVersion !== CHAIN_ID) {
      try {
        /**SWITCH METAMASK TO OUR NETWORK */

        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(CHAIN_ID) }],
        });
        resolve(true);
      } catch (err) {
        /**IF METAMASK DO'NT HAVE OUR NETWORK. ADD NEW NETWORK */
        if (err.code === 4902) {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: Web3.utils.toHex(CHAIN_ID),
                chainName: NETWORK_NAME,
                nativeCurrency: {
                  name: NETWORK_NAME,
                  symbol: NETWORK_SYMBOL,
                  decimals: NETWORK_DECIMALS,
                },
                rpcUrls: [RPC_URL],
                blockExplorerUrls: [EXPLORAR_LINK],
              },
            ],
          });
          resolve(true);
        } else {
          resolve(err);
        }
      }
    } else {
      resolve(true);
    }
  });
};
