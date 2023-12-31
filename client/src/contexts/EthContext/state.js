const actions = {
  init: "INIT"
};

const initialState = {
  myTokenArtifact: null,
  myTokenSaleArtifact: null,
  kycContractArtifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  myTokenInstance: null,
  myTokenSaleInstance: null,
  kycContractInstance: null,
  tokenAddress: {
    token: null,
    tokenSale: null,
    Kyc: null,
  },
  userToken: 0,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
