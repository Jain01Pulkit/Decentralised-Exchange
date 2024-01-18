import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import "./SwapDetail.scss";
import { InfoIcon } from "../../../assets/Svg/SvgImages";
import { useSelector } from "react-redux";
import { GetAmountsOut } from "../../../Swapping/Swap";

const SwapDetail = ({ priceImpact }) => {
  const input1 = useSelector((state) => state?.inputValuesSlice?.input1);
  const input2 = useSelector((state) => state?.inputValuesSlice?.input2);
  const slippageTolerance = useSelector(
    (state) => state?.addressSlice?.slippageTolerance
  );
  const inputSwap = useSelector((state) => state?.inputValuesSlice?.input1);

  const selectedtoken1 = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenA
  );
  const selectedtoken2 = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenB
  );

  useEffect(() => {
    if (input1 && input2) {
      SwappableFun();
      MinimumReceivedAmount();
    }
  }, [input1, input2, slippageTolerance]);

  const [Swappable, setSwappable] = useState(0);
  const [minimumReceived, setMinimumReceived] = useState(0);

  let path = [selectedtoken1.address, selectedtoken2.address];
  const SwappableFun = async () => {
    const result2 = await GetAmountsOut(inputSwap, [path[0], path[1]]);
    setSwappable(result2[1]);
  };
  let path1 = [selectedtoken1.address, selectedtoken2.address];
  const MinimumReceivedAmount = async () => {
    const result2 = await GetAmountsOut(inputSwap, [path1[0], path1[1]]);
    setMinimumReceived(result2[1] - (result2[1] / 100) * slippageTolerance);
  };
  // }
  return (
    <ul className="swapDetail">
      <li>
        <span className="swapTitle">
          Price Impact{" "}
          <Tooltip
            placement="bottom"
            title="The difference between the market price and estimated price due to trade size."
          >
            <span className="swapInfo_Icon">
              <InfoIcon />
            </span>
          </Tooltip>
        </span>
        {priceImpact > 0 ? (
          <span className="positive">{priceImpact}%</span>
        ) : (
          <span className="negative">{priceImpact}%</span>
        )}
        {/* use class "negtive" for negtive value */}
        {/* {priceImpact<0?"red":"green"} */}
      </li>
      <li>
        <span className="swapTitle">
          Swappable
          <Tooltip
            placement="bottom"
            title="This fee is only taken when A is either purchased (10% fee) or sold (10% fee)."
          >
            <span className="swapInfo_Icon">
              <InfoIcon />
            </span>
          </Tooltip>
        </span>
        <span>{(Swappable / 10 ** 18).toFixed()}</span>
      </li>
      <li>
        <span className="swapTitle">
          Minimum Receive{" "}
          <Tooltip
            placement="bottom"
            title="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed."
          >
            <span className="swapInfo_Icon">
              <InfoIcon />
            </span>
          </Tooltip>
        </span>
        <span>{(minimumReceived / 10 ** 18).toFixed()}</span>
      </li>
      <li>
        <span className="swapTitle">
          Slippage{" "}
          <Tooltip placement="bottom" title="Current Slippage Tolerance">
            <span className="swapInfo_Icon">
              <InfoIcon />
            </span>
          </Tooltip>
        </span>
        <span>{slippageTolerance} %</span>
      </li>
    </ul>
  );
};

export default SwapDetail;
