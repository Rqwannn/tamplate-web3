import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import Desc from "./Desc";

import TokenInput from "./TokenInput";
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

        <ListAddress value={value} />
        <TokenInput setValue={setValue} />
      </div>

      {/* <Desc /> */}
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.myTokenArtifact ? <NoticeNoArtifact /> :
          !state.myTokenInstance ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
