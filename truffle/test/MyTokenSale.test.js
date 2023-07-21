const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");

const chai = require("./utils/SetupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({
    path: "../.env"
})

contract("Token Sale Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;
    
    it("Should not have any tokens in my deployerAccount", async () => {
        let instance = await Token.deployed();

        // Memastikan bahwa saldo akun deployer adalah 0
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })
})