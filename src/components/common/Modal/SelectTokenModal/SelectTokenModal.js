import React, { useEffect } from "react";
import { Tabs, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon } from "../../../../assets/Svg/SvgImages";
import "./SelectTokenModal.scss";
import { TokenCollection } from "../../../../assets/tokenCollections";
import { setTokenlist } from "../../../../redux/tokenAction";
import Web3Instance from "../../../web/web3Instance";
import Web3 from "web3";

function callback(key) {}

const SelectTokenModal = (props) => {
  const dispatch = useDispatch();
  const selectedtoken1 = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenA
  );
  const selectedtoken2 = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenB
  );
  useEffect(() => {
    dispatch(setTokenlist(TokenCollection));
  }, []);
  const tokenCollection = useSelector((state) => state.tokenAction.tokenlist);
  useEffect(() => {
    if (tokenCollection.length > 0) {
      dispatch(setTokenlist(tokenCollection));
    }
  }, []);
  let tokenlisttwo = tokenCollection.filter(
    (item) => item.tokenName !== selectedtoken1?.tokenName
  );
  let tokenlistone = tokenCollection.filter(
    (item) => item.tokenName !== selectedtoken2?.tokenName
  );

  return (
    <Modal
      title="Select Token"
      scrollable={true}
      open={props.isModalVisible}
      onCancel={props.handleCancel}
      className="connect_wallet selectToken_Modal"
      footer={null}
      centered
    >
      <div className="searchField">
        <Input placeholder="Search name or paste address" />
      </div>
      <Tabs defaultActiveKey="1" onChange={callback} className="tokenTab">
        {/* <TabPane tab="Token" key="1"> */}
        <TokentList hname="Token" className="tokenList">
          {props.type === "tk1"
            ? tokenlistone?.map((data) => (
                <TokenListItem
                  balanceData={props.selectedToken}
                  data={data}
                  symbol={data.symbol}
                  tokenName={data.tokenName}
                  handletoken={props.handletoken}
                  type={props.type}
                  getName={props.getName}
                  tsub={data.tsub}
                  totalBalance={data.balance}
                  selectedtoken={props?.selectedtoken}
                  disable={props.disable1}
                />
              ))
            : tokenlisttwo?.map((data) => (
                <TokenListItem
                  data={data}
                  symbol={data.symbol}
                  tokenName={data.tokenName}
                  handletoken={props.handletoken}
                  type={props.type}
                  getName={props.getName}
                  tsub={data.tsub}
                  totalBalance={data.balance}
                  selectedtoken={props?.selectedtoken}
                  disable={props.disable2}
                />
              ))}
        </TokentList>
        {/* </TabPane> */}
      </Tabs>
    </Modal>
  );
};

const TokentList = ({ hname, children }) => {
  return (
    <div className="tokenList">
      <div className="tokenList_head">{children}</div>
    </div>
  );
};

const TokenListItem = ({
  hide,
  key,
  data,
  symbol,
  handletoken,
  tokenName,
  selectedtoken,
  type,
  tsub,
  totalBalance,
  disable,
  balanceData,
  // dispatch
}) => {
  const tt = useDispatch();
  const newBalance = async () => {
    let tokensList = JSON.parse(JSON.stringify(TokenCollection));

    const value = await tokensList.map(async (object) => {
      let balance = await getBAlance(object.address);
      object.balance = Number(balance / 10 ** 18).toFixed(3);
      return object;
    });
    const balanceInfo = await Promise.all(value);
    tt(setTokenlist(balanceInfo));

    return balanceInfo;
  };
  const waddress = useSelector((state) => state.addressSlice.walletAddress);
  const getBAlance = async (address) => {
    const tokenA = TokenCollection.filter((a) => a.symbol === "TKNA" || "TKNB");
    if (tokenA.isNative) {
      let web3Object = new Web3(window.ethereum);
      let ethBalance = await web3Object.eth.getBalance(waddress);
      let convertedAmount = await Web3.utils.fromWei(
        ethBalance.toString(),
        "ether"
      );
      return convertedAmount;
    } else {
      let tokenAbiA = JSON.parse(JSON.stringify(tokenA[0].abi));
      const contractA = await Web3Instance(tokenAbiA, address);
      const tokenAbalance = await contractA.methods.balanceOf(waddress).call();
      return tokenAbalance;
    }
  };

  useEffect(() => {
    newBalance();
  }, []);

  return (
    <li
      className={
        selectedtoken != tokenName
          ? "tokenList_Wrap"
          : "tokenList_Wrap disabled"
      }
      onClick={() => {
        handletoken(data, tokenName, type);
      }}
    >
      <div className="tokenList_Left">
        <div className="tokenName">
          <button>
            {tokenName} {hide ? "" : <PlusIcon />}
          </button>
          <div>{symbol}</div>
        </div>
      </div>
      <div>{totalBalance}</div>
    </li>
  );
};

export default SelectTokenModal;
