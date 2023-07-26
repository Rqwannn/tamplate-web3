import { useState, useReducer } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { reducer, initialState } from "../../contexts/EthContext/state";

function TokenBuy({ setValue }) {
  const { state: { myTokenSaleInstance, accounts, web3 } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const [dispatch] = useReducer(reducer, initialState);

  const handleInputChange = e => {
      setInputValue(e.target.value);
  };

  const write = async e => {
    
    // if (e.target.tagName === "INPUT") {
    //   return;
    // }

    // if (inputValue === "") {
    //   alert("Please enter a value to buy.");
    //   return;
    // }

    await myTokenSaleInstance.methods.buyTokens(accounts[0]).send({
      from: accounts[0],
      value: web3.utils.toWei("1", "wei")
    })
    
    alert(`RQT Token for 1 wei was successfully`)
  };

  const buttonStyle = {
    padding: "7px",
    border: "none",
    outline: "none",
    marginTop: "14px",
    cursor: "pointer",
    marginRight: "7px"
  }

  return (
    <div>

      <div className="input-btn" style={{
                width: "350px", marginTop: "14px", display: "flex", flexDirection: "column"
            }
        }>

        Buy Your Token Here
        
        <input
          style={
            {
                padding: "7px",
                width: "150px",
                marginTop: "14px",
                cursor: "pointer"
            }
          }
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />

      </div>

      <div style={{
        display: "flex",
      }}>
        <button onClick={write} style={buttonStyle}>
            Buy Token
        </button>

      </div>


    </div>
  );
}

export default TokenBuy;
