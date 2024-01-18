// import Web3 from "web3";
// import tokenA from "../ABI/tokenA.json";
// import tokenB from "../ABI/tokenA.json";
import routerv2 from "../ABI/routerv2.json";
import Web3Instance from "../web/web3Instance";
import { TokenA_address, TokenB_address, Routerv2address, Owner_address, MAX_AMOUNT, pair_Address } from "../../constant";
import pairAbi from "../ABI/pairAddress.json"


let web3Object;
// export const removeAllowTokenA = async (Owner_address, Routerv2address) => {
//     try {
//         let result;
//         web3Object = await Web3Instance();
//         console.log("TokenA_address", TokenA_address);

//         let TokenAContract = new web3Object.eth.Contract(tokenA, TokenA_address);
//         console.log("TokenAContract", TokenAContract);

//         if (TokenAContract) {
//             result = await TokenAContract.methods
//                 .allowance(Owner_address, Routerv2address)
//                 .call();
//         }
//         return result;
//     } catch (error) {
//         console.log("allowance TokenA eror", error);
//     }
// };

export const allowancePair = async (Owner_address, Routerv2address) => {
    try {
        let result;
        web3Object = await Web3Instance();

        let TokenPairContract = new web3Object.eth.Contract(pairAbi, pair_Address);

        if (pair_Address) {
            result = await pair_Address.methods
                .allowance(Owner_address, Routerv2address)
                .call();
        }
        return result;
    } catch (error) {
        console.log("allowance Tokenpair error", error);
    }
};

export const approvalPair = async (amount, address) => {
    try {
        let result;
        // let amt = await web3Object.utils.toWei(String(amount), "ether");

        web3Object = await Web3Instance();

        let TokenpairContract = new web3Object.eth.Contract(pairAbi, pair_Address);

        const gasLimit = await TokenpairContract.methods
            .approve(Routerv2address, MAX_AMOUNT)
            .estimateGas({ from: Owner_address, value: 0 });


        if (TokenpairContract) {
            result = await TokenpairContract.methods
                .approve(Routerv2address, MAX_AMOUNT)
                .send({ from: Owner_address, gas: gasLimit });
        }
        return result;
    } catch (error) {
        console.log("approval TokenPair error", error);
    }
};

// export const approTokenB = async (amount, address) => {
//     try {
//         // const { ethereum } = window;
//         // let web3 = new Web3(ethereum);
//         let amt = await web3Object.utils.toWei(String(amount), "ether");
//         console.log("amt", amt);
//         web3Object = await Web3Instance();

//         let TokenBContract = new web3Object.eth.Contract(tokenB, TokenB_address);
//         console.log("TokenBContract", TokenBContract);

//         const gasLimit = await TokenBContract.methods
//             .approve(Routerv2address, MAX_AMOUNT)
//             .estimateGas({ from: Owner_address, value: 0 });

//         console.log("gaslimit", gasLimit);
//         let result = await TokenBContract.methods
//             .approve(Routerv2address, MAX_AMOUNT)
//             .send({ from: Owner_address, gas: gasLimit });
//         return result;
//     } catch (error) {
//         console.log("approval TokenB error", error);
//     }
// };

export const RemoveLiquidity = async (
    TokenA_address,
    TokenB_address,
    amount1,
    minamount1,
    minamount2,
    Owner_address,
    deadline
) => {
    try {
        web3Object = await Web3Instance();

        let amt1 = await web3Object.utils.toWei(String(amount1), "ether");
        let minamt1 = await web3Object.utils.toWei(String(minamount1), "ether");
        let minamt2 = await web3Object.utils.toWei(String(minamount2), "ether");
        let router01Contract = new web3Object.eth.Contract(
            routerv2,
            Routerv2address
        );

        // const gasLimit = await router01Contract?.methods
        //   ?.addLiquidity(
        //     TokenA_address,
        //     TokenB_address,
        //     amt1,
        //     amt2,
        //     minamt1,
        //     minamt2,
        //     Owner_address,
        //     deadline
        //   )
        //   .estimateGas({ from: ownerAddress, value: 0 });
        // console.log({ gasLimit });

        let result = await router01Contract?.methods
            ?.removeLiquidity(
                TokenA_address,
                TokenB_address,
                amt1,
                minamt1,
                minamt2,
                Owner_address,
                deadline
            )
            .send({ from: Owner_address });
        return result;
    } catch (error) {
        console.log("error in add remove", error);
    }
};
