import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

import MyToken from "../../contracts/MyToken.json";
import MyTokenSale from "../../contracts/MyTokenSale.json";
import KycContract from "../../contracts/KycContract.json";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async () => {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      // const web3 = new Web3("ws://localhost:7545");
      // const accounts = await web3.eth.requestAccounts();
      const accounts = await web3.eth.getAccounts();
      const networkID = await web3.eth.net.getId();

      // Initialize MyToken contract
      // const myTokenArtifact = MyToken;
      const myTokenAddress = MyToken.networks[networkID].address;
      const myTokenNetworkAddress = MyToken.networks[networkID];
      const myTokenInstance = new web3.eth.Contract(MyToken.abi, myTokenNetworkAddress && myTokenAddress);

      // Initialize MyTokenSale contract
      const myTokenSaleAddress = MyTokenSale.networks[networkID].address;
      const myTokenSaleNetworkAddress = MyTokenSale.networks[networkID];
      const myTokenSaleInstance = new web3.eth.Contract(MyTokenSale.abi, myTokenSaleNetworkAddress && myTokenSaleAddress);

      // Initialize KYCContract
      const kycContractAddress = KycContract.networks[networkID].address;
      const kycContractNetworkAddress = KycContract.networks[networkID];
      const kycContractInstance = new web3.eth.Contract(KycContract.abi, kycContractNetworkAddress && kycContractAddress);

      dispatch({
        type: actions.init,
        data: {
          myTokenArtifact: MyToken,
          MyTokenSaleArtifact: MyTokenSale,
          KycContractArtifact: KycContract,
          web3,
          accounts,
          networkID,
          myTokenInstance,
          myTokenSaleInstance,
          kycContractInstance
        }
      });
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        init(MyToken, MyTokenSale, KycContract);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.myTokenArtifact);
      init(state.myTokenSaleArtifact);
      init(state.kycContractArtifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;

