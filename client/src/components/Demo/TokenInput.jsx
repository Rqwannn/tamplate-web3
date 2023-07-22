import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function TokenInput({ setValue }) {
  const { state: { myTokenInstance, accounts, kycContractInstance } } = useEth();
  const [inputValue, setInputValue] = useState("0x123...");

  const handleInputChange = e => {
    // if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    // }
  };

  const read = async () => {
    const value = await myTokenInstance.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }

    console.log(accounts);
    
    await kycContractInstance.methods.setKycCompleted(inputValue).send({ from: accounts[0] })
    alert(`KYC for ${inputValue} was successfully completed`)
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
        Write Your Address
        
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
            Add To Whitelist
        </button>

        <button onClick={read} style={buttonStyle}>
            Read Whitelist
        </button>
      </div>


    </div>
  );
}

export default TokenInput;
