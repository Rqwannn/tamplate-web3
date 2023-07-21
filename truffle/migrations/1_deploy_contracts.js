const MyToken = artifacts.require("MyToken.sol");
const MyTokenSale = artifacts.require("MyTokenSale");

require("dotenv").config({
    path: "../.env"
})

module.exports = async function (deployer) {
    const initialSupply = process.env.INITIAL_TOKENS; // Ubah nilai initialSupply sesuai kebutuhan
    let addr = await web3.eth.getAccounts();

    await deployer.deploy(MyToken, initialSupply);

    // uint256 _rate,
    // address payable _wallet,
    // IERC20 _token

    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);
    let instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, initialSupply);
};