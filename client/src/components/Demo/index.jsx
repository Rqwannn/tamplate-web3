import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import Desc from "./Desc";

import TokenInput from "./TokenInput";
import TokenBuy from "./TokenBuy";
import ListAddress from "./ListAddress";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();
  const [value, setValue] = useState("?");

  // demo adalah bagaian "See it in action"

  const demo =
    <>
      {/* <Cta /> */}
      
      <div className="contract-container" style={{
          display: "flex",
          flexDirection: "column",
      }}>
        {/* <Contract value={value} />
        // <ContractBtns setValue={setValue} /> */}

        <TokenInput setValue={setValue} />
      </div>

      {/* <Desc /> */}
    </>;

    const buy = 
      <>
        <div className="contract-container" style={{
            display: "flex",
            flexDirection: "column",
        }}>

        <ListAddress value={value} />

        <p>If you want to buy tokens, send Wei to this Address: {state.tokenAddress.tokenSale}</p>
        <p>You currently have : {state.userToken} RQT Token</p>

        <TokenBuy setValue={setValue} />
      </div>

    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.kycContractArtifact ? <NoticeNoArtifact /> :
          !state.kycContractInstance ? <NoticeWrongNetwork /> :
            demo
      }
      <h2 style={{
        marginTop: "14px"
      }}>Buy Token</h2>
      {
        !state.myTokenArtifact ? <NoticeNoArtifact /> :
          !state.myTokenInstance ? <NoticeWrongNetwork /> :
            buy
      }
    </div>
  );
}

export default Demo;
