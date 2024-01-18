import FACTORY from "./factory.json";
import ROUTER from "./routerv2.json";
import PAIR from "./pair.json";
import {
  REACT_APP_UNISWAP_FACTORY_ADDRESS,
  REACT_APP_UNISWAP_PAIR_ADDRESS,
  REACT_APP_UNISWAP_ROUTER_ADDRESS,
} from "../../constant";

export const uniswapContractsInfo = [
  {
    symbol: "FACTORY",
    address: REACT_APP_UNISWAP_FACTORY_ADDRESS,
    abi: FACTORY,
  },
  {
    symbol: "ROUTER",
    address: REACT_APP_UNISWAP_ROUTER_ADDRESS,
    abi: ROUTER,
  },
  {
    symbol: "PAIR",
    address: REACT_APP_UNISWAP_PAIR_ADDRESS,
    abi: PAIR,
  },
];
