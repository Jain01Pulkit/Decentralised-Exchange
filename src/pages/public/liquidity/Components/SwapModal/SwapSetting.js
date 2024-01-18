import React ,{useState,useEffect} from "react";
import { Modal, Input } from "antd";
import BorderButton from "../../../../../components/common/BorderButton/BorderButton";
import "./SwapModalStyle.scss";
import { setSlippageTolerance } from "../../../../../redux/Address/address";
import { useDispatch, useSelector } from "react-redux";
import { setHighPrice, setLowPrice, setMediumPrice, setuserSelectedPrice } from "../../../../../redux/Gasprices/GasPrice";
import axios from "axios";

const SwapSetting = (props) => {
  const dispatch = useDispatch();
  const [selectedgasprice, setselectedgasprice] = useState('')
  const highPrice = useSelector((state) => state.gasPrice.highPrice);
  const averagePrice = useSelector((state) => state.gasPrice.mediumPrice);
  const lowPrice = useSelector((state) => state.gasPrice.lowPrice);
  const userSelectedPrice = useSelector((state) => state.gasPrice.userSelectedPrice);

  const [slippage, setslippage] = useState('0.5')
  const [disabled, setdisabled] = useState(false)

   const AdjustSlippage = async (e) => {
    if (e.target.value) {
      if (e.target.value <= 50) {
        setslippage(e.target.value);
        dispatch(setSlippageTolerance(e.target.value));
      }
      else {
        e.preventDefault();
        setdisabled(true);
        setslippage('');
        dispatch(setSlippageTolerance(''));
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const result = await axios.get('https://ethgasstation.info/json/ethgasAPI.json"');
    dispatch(setMediumPrice(result.data.average / 10))
    dispatch(setHighPrice(result.data.fastest / 10))
    dispatch(setLowPrice(result.data.safeLow / 10))
  }
  const submitGasPrice = () => {
    props.handleCancel1();
  }

  const setSlippage = async () => {
    setdisabled(false);
    props.handleCancel1();
  }

  const GasFeeFunction = (e, key) => {
    key == 1 ? dispatch(setuserSelectedPrice(lowPrice)) : key == 2 ? dispatch(setuserSelectedPrice(averagePrice)) : dispatch(setuserSelectedPrice(highPrice))

  }
  return (
    <Modal
      title="Setting"
      scrollable={true}
      visible={props.isSettingVisible}
      onCancel={props.handleCancel1}
      className="connect_wallet swapSetting_Modal"
      footer={null}
      centered
    >
      <div className="swapSetting_Style">
        <div className="gasPrice">
          <div className="label">
            Gas Price <span>Price Selected {userSelectedPrice} gwei</span>
          </div>
          <div className="gasBtn_Wrap">
            <button type="button" className="chartBtns" onClick={(e) => GasFeeFunction(e, 1)}>
              {lowPrice}<br />
              Low
            </button>
            <button type="button" className="chartBtns" onClick={(e) => GasFeeFunction(e, 2)}>
              {averagePrice}
              <br />
              Medium
            </button>
            <button type="button" className="chartBtns" onClick={(e) => GasFeeFunction(e, 3)} >
              {highPrice}
              <br />
              High
            </button>
            <button type="button" className="chartBtns" onClick={submitGasPrice}>
              Submit
            </button>
          </div>
        </div>
        <div className="slipage">
          <div className="label">
            Slippage Tolerance <span>You can set maximum of 50% slippage ,current slippage: {slippage}</span>
          </div>
          <div className="slipageField">
            <Input addonAfter="%" type="number" placeholder="0.5" onChange={(e) => AdjustSlippage(e)} disabled={disabled} />
            <BorderButton className="gradientBtn" title="set Slippage" onClick={setSlippage} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SwapSetting;
