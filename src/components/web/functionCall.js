// import web3Instance from "./web3Instance";
// // import fontabi from "../ABI/font.json";
// import tokenABI from "../ABI/tokenA.json";

// export const balanceOf = async (address) => {
//     try {
//         let contract = await web3Instance(tokenABI, address);
//         let result = await contract.methods.balanceOf(address).call();
//         return result
//     } catch (error) {
//         console.log("Error balanceOf", error)
//     }
// }


// export const gtBalance = async() => {
//     const {ethereum} = window
//     let web3 = new Web3(ethereum)
//     // try {
//     //     let web3Object = await web3Instance.fromWei(web3.eth.getBalance("0x32560FeA1103737CcE0D059cECCE07Cd6659760B"))
//     // } catch (error) {
//     //     console.log(error);
//     // }

//     const bal = await web3.eth.getBalance("0x32560FeA1103737CcE0D059cECCE07Cd6659760B");
// }
// import Web3Instance from "./web3Instance";
// import tokenA from "../../components/ABI/tokenA.json"
// export const TokenBalanceOf = async (waddress, tokenAddress) => {
//     try {
//         const contract = await Web3Instance(tokenA.tokenAddress)

//         if (contract) {
//             const res = await contract.methods.balanceOf(waddress).call()
//             return res;
//         }
//     } catch (error) {
//         console.log("error", error);
//     }
// }