// import React, { useState } from "react";
// import { ethers } from "ethers";

// const MetaMaskConnect = () => {
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [defaultAccount, setDefaultAccount] = useState(null);
//     const [userBalance, setUserBalance] = useState(null);
//     const [connButtonText, setConnButtonText] = useState("Connect Wallet");
//     const [disconnButtonText] = useState("Disconnect Wallet");
//     const [changeNetButtonText] = useState("change Network")

//     const connectWalletHandler = () => {
//         if (window.ethereum && window.ethereum.isMetaMask) {
//             console.log("MetaMask Here!");

//             window.ethereum
//                 .request({ method: "eth_requestAccounts" })
//                 .then((result) => {
//                     console.log("lllllllllllllll", result);
//                     accountChangedHandler(result[0]);
//                     setConnButtonText("Wallet Connected");

//                     getAccountBalance(result[0]);
//                 })
//                 .catch((error) => {
//                     setErrorMessage(error.message);
//                 });
//         } else {
//             console.log("Need to install MetaMask");
//             setErrorMessage("Please install MetaMask browser extension to interact");
//         }
//     };

//     const accountChangedHandler = (newAccount) => {
//         setDefaultAccount(newAccount);
//         getAccountBalance(newAccount.toString());
//         localStorage.setItem("newAccount", newAccount);
//         localStorage.getItem("newAccount", newAccount);
//     };


//     const getAccountBalance = (account) => {
//         window.ethereum
//             .request({ method: "eth_getBalance", params: [account, "latest"] })
//             .then((balance) => {
//                 setUserBalance(ethers.utils.formatEther(balance));


//             })
//             .catch((error) => {
//                 setErrorMessage(error.message);
//             });
//     };

//     const chainChangedHandler = () => {

//         window.location.reload();

//     };

//     window.ethereum.on("accountsChanged", accountChangedHandler);

//     window.ethereum.on("chainChanged", chainChangedHandler);

//     const disconnectWalletHandler = () => {
//         setDefaultAccount(" ");
//         setUserBalance(" ");
//         localStorage.clear();
//     }



//     const changeNetwork = async () => {
//         if (window.ethereum) {
//             try {
//                 alert("change your network")
//                 await window.ethereum.request({
//                     method: "wallet_switchEthereumChain",
//                     params: [{ chainId: "0x5" }],
//                 });
//             } catch (error) {
//                 console.error(error);
//                 console.log(error, "errrrorrrr")
//             }
//             window.ethereum.on("chainChanged", chainChangedHandler);

//         }
//     };


//     return (
//         <div className="MetaMask_Connect">
//             <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
//             <button type="button " onClick={connectWalletHandler}>
//                 {connButtonText}
//             </button>

//             <button type="button" onClick={disconnectWalletHandler}>
//                 {disconnButtonText}
//             </button>

//             <button onClick={changeNetwork} >
//                 {changeNetButtonText}
//             </button>
//             <div className="accountDisplay">
//                 <h3>Address: {defaultAccount}</h3>
//             </div>
//             <div className="balanceDisplay">
//                 <h3>Balance: {userBalance}</h3>
//             </div>
//             {errorMessage}
//         </div>


//     );

// }
// export default MetaMaskConnect;
