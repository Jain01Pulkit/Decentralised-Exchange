import Web3 from "web3";

const Web3Instance = async (ABI, contractAddress) => {
  const { ethereum } = window;

  let web3Object = new Web3(ethereum);

  let contract = new web3Object.eth.Contract(
    ABI,
    contractAddress
  );
  return contract;
}

export const callWeb3 = async()=>{
  const { ethereum, web3 } = window;

  if (ethereum && ethereum.isMetaMask) {
    const web3Object = new Web3(ethereum);
    return web3Object;
  }
}
export default Web3Instance;
