const MyToken = artifacts.require("MyToken.sol");

module.exports = async function (deployer) {
    const initialSupply = 1000000; // Ubah nilai initialSupply sesuai kebutuhan
    await deployer.deploy(MyToken, initialSupply);
};