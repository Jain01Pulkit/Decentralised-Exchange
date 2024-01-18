import { Modal, Input } from "antd";
import BigNumber from "bignumber.js";
import { toast } from "../../Toasts/Toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPairAddress } from "../../../../redux/tokenAction";
import ButtonCommon from "../../buttonCommon/ButtonCommon";
import { getRemoveLiquiditySignature } from "../../../AddLiquidity/addLiquidity";
import { pairBalanceHelper, getTokenAddress } from "../../../../Swapping/Swap";
import {
  RemoveLiquidityETHWithPermitService,
  RemoveLiquidityWithPermitService,
} from "../../../AddLiquidity/addLiquidity";

const RemoveLiqInModal = (props) => {
  const dispatch = useDispatch();

  const [token0, setToken0] = useState("");
  const [token1, setToken1] = useState("");
  // const [reserves, setReserves] = useState();
  const [signature, setSignature] = useState();
  const [pairbalance, setpairbalance] = useState(0);
  // const [tokenAReserve, setTokenAReserve] = useState();
  // const [tokenBReserve, setTokenBReserve] = useState();
  const waddress = useSelector((state) => state.addressSlice.walletAddress);
  const pairAddressinput = useSelector(
    (state) => state.tokenAction.pairAddress
  );
  const tokenASelected = useSelector(
    (state) => state.tokenSelectedSlice.tokenA
  );
  const tokenBSelected = useSelector(
    (state) => state.tokenSelectedSlice.tokenB
  );

  // const calculateValues = async () => {
  //   const totalLiquidity = await pairBalanceHelper(waddress, pairAddressinput);
  //   const result = await getReservesHelper(pairAddressinput);
  //   const [tokenAreserve, tokenBreserve] = await getReservesHelper(pairAddressinput);
  //   const removeLiquidity = BigNumber((totalLiquidity * 100) / 100);
  //   if (removeLiquidity) setReserves(removeLiquidity)
  //   const reserve1 = ((removeLiquidity * tokenAreserve) / totalLiquidity) - Number(slippageTolerance) * removeLiquidity / 100;
  //   if (reserve1) setTokenAReserve(reserve1.toLocaleString('fullwide', { useGrouping: false }));
  //   const reserve2 = ((removeLiquidity * tokenBreserve) / totalLiquidity) - Number(slippageTolerance) * removeLiquidity / 100;
  //   if (reserve2) setTokenBReserve(reserve2.toLocaleString('fullwide', { useGrouping: false }));
  // }

  // useEffect(() => {
  //   calculateValues();
  // }, [slippageTolerance]);

  // const removeLiquidity = async () => {
  //   let deadline = Math.floor(new Date().getTime() / 1000);
  //   deadline = deadline + 10 * 60;
  //   const balance = await pairBalanceHelper(waddress, pairAddressinput);
  //   if (balance) {
  //     try{
  //     const result = await RemoveLiquidity(tokenASelected.address, tokenBSelected.address, balance, 1, 1, waddress, deadline)
  //     if (result?.status) {
  //       toast.success("Remove Liquidity Done")
  //     }
  //   } catch(err){
  //      if (err?.code == 4001) {
  //       toast.error("User denied Transaction");
  //     }
  //     else {
  //       toast.error("Remove Liquidity Failed")
  //     }
  //   }
  //   }
  //   else {
  //     toast.error("Insufficient LP token Balance")
  //   }
  // }
  // const handleRemoveLiquidity = async () => {
  //   const allowanceResult = await pairAllowanceHelper(waddress, "PAIR", pairAddressinput);
  //   if (Number(allowanceResult) > pairbalance) {
  //     removeLiquidity();
  //   } else {
  //     const approval = await pairApprovalHelper(waddress, "PAIR", pairAddressinput);
  //     if (approval.status) {
  //       removeLiquidity();
  //     }
  //   }
  // };

  const pairAddress = async (e) => {
    let address = e.target.value;
    dispatch(setPairAddress(address));

    const balance = await pairBalanceHelper(waddress, address);
    const convertedAmount = (balance / 10 ** 18).toLocaleString("fullwide", {
      useGrouping: !1,
    });
    setpairbalance(convertedAmount);
    const { token0, token1 } = await getTokenAddress(address);
    setToken0(token0);
    setToken1(token1);
  };
  const signRemoveLiquidityTxn = async () => {
    let deadline = Math.floor(new Date().getTime() / 1000);
    deadline = deadline + 10 * 60;
    const totalLiquidity = await pairBalanceHelper(waddress, pairAddressinput);

    const result = await getRemoveLiquiditySignature(
      waddress,
      pairAddressinput,
      BigNumber(totalLiquidity),
      1685180759
    );
    if (result) {
      setSignature(result);
    }
  };

  const removeLiquidityWithPermit = async () => {
    let deadline = Math.floor(new Date().getTime() / 1000);
    deadline = deadline + 10 * 60;
    // If we want to remove liquidity with a native token
    const customToken = tokenASelected.isNative
      ? tokenBSelected
      : tokenASelected;
    const totalLiquidity = await pairBalanceHelper(waddress, pairAddressinput);
    if (tokenASelected.isNative || tokenBSelected.isNative) {
      try {
        const result = await RemoveLiquidityETHWithPermitService(
          waddress,
          signature,
          BigNumber(totalLiquidity),
          "0",
          "0",
          customToken.address,
          1685180759
        );
        if (result?.status) {
          toast.success("Liquidity Removed");
        }
      } catch (err) {
        if (err?.code == 4001) {
          toast.error("User denied Transaction");
        } else {
          toast.error("Remove Liquidity Error");
        }
      }
      // If we want to remove liquidity of custom token with custom token
    } else {
      try {
        const totalLiquidity = await pairBalanceHelper(
          waddress,
          pairAddressinput
        );
        const result = await RemoveLiquidityWithPermitService(
          waddress,
          signature,
          BigNumber(totalLiquidity),
          "0",
          "0",
          tokenASelected.address,
          tokenBSelected.address,
          1685180759
        );
        if (result?.status) {
          toast.success("Liquidity Removed");
        }
      } catch (err) {
        if (err?.code == 4001) {
          toast.error("User denied Transaction");
        } else {
          toast.error("Remove Liquidity Error");
        }
      }
    }
  };

  return (
    <Modal
      title="Enter Pair Address"
      scrollable={true}
      open={props.isModalVisible}
      onCancel={props.handleCancel}
      className="connect_wallet selectToken_Modal"
      footer={null}
      centered
    >
      <div className="searchField">
        Balance of LP: {pairbalance}
        <Input placeholder="Pair Address" onChange={(e) => pairAddress(e)} />
      </div>
      <ButtonCommon
        title="Approve"
        disabled={!token0 || !token1}
        onClick={signRemoveLiquidityTxn}
      ></ButtonCommon>
      <ButtonCommon
        title="Remove Liquidity"
        disabled={!token0 || !token1}
        onClick={removeLiquidityWithPermit}
      ></ButtonCommon>

      <div>
        <ul>
          <li>
            <Input placeholder="tokenA" value={token0}></Input>
            <Input placeholder="tokenB" value={token1}></Input>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default RemoveLiqInModal;
