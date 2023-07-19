const Token = artifacts.require("MyToken");

let chai = require("chai");

const BN = web3.utils.BN; // Big Number
const chaiBN = require("chai-bn")(BN); 
chai.use(chaiBN);

let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("All tokens should be in my account", async () => {
        let instance = await Token.deployed()
        let totalSupply = await instance.totalSupply();

        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("Is posibble to send tokens between accounts", async () => {
        const sendTokens = 1;
        let instance = await Token.deployed();

        // Mendapatkan total pasokan token dari kontrak
        let totalSupply = await instance.totalSupply();

        // Memastikan bahwa saldo akun deployer sama dengan total pasokan token
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);

        // Memastikan bahwa saldo akun penerima sebelum transfer adalah 0
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(0));

        // Melakukan transfer token dari akun deployer ke akun penerima
        // Memastikan bahwa transfer berhasil (fulfilled)
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;

        // Memastikan bahwa saldo akun deployer berkurang sebanyak sendTokens setelah transfer
        let newSenderBalance = await instance.balanceOf(deployerAccount);
        let expectedSenderBalance = totalSupply.sub(new BN(sendTokens));
        expect(newSenderBalance).to.be.a.bignumber.equal(expectedSenderBalance);

        // Memastikan bahwa saldo akun penerima bertambah sebanyak sendTokens setelah transfer
        let newRecipientBalance = await instance.balanceOf(recipient);
        expect(newRecipientBalance).to.be.a.bignumber.equal(new BN(sendTokens));
    })

    it("Is not posibble to send more tokens than available in total", async () => {
        let instance = await Token.deployed()
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        // Gunakan BN untuk menghindari masalah overflow
        let amountToSend = new BN(balanceOfDeployer).add(new BN(1));

        // Gunakan 'await' untuk menunggu sampai promise diselesaikan
        await expect(instance.transfer(recipient, amountToSend)).to.eventually.be.rejected;

        // Verifikasi bahwa saldo deployer tetap sama setelah transaksi ditolak
        let newBalanceOfDeployer = await instance.balanceOf(deployerAccount);
        expect(newBalanceOfDeployer).to.be.a.bignumber.equal(balanceOfDeployer);
    })

})