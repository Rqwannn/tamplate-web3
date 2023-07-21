const Token = artifacts.require("MyToken");

const chai = require("./utils/SetupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({
    path: "../.env"
})

contract("Token Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach( async () => {
        this.mytoken = await Token.new(process.env.INITIAL_TOKENS);
    })

    it("All tokens should be in my account", async () => {
        let instance = this.mytoken;
        let totalSupply = await instance.totalSupply();

        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("Is posibble to send tokens between accounts", async () => {
        // Mengatur jumlah token yang akan dikirim
        const sendTokens = 1;

        // Mendapatkan instance dari kontrak Token yang sudah dideploy
        let instance = this.mytoken;

        // Mendapatkan total pasokan token dari kontrak
        let totalSupply = await instance.totalSupply();

        // Memastikan bahwa saldo akun deployer sama dengan total pasokan token
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);

        // Melakukan transfer token dari akun deployer ke akun penerima
        // Memastikan bahwa transfer berhasil (fulfilled)
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;

        // Memastikan bahwa saldo akun deployer berkurang sebanyak sendTokens setelah transfer
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));

        // Memastikan bahwa saldo akun penerima bertambah sebanyak sendTokens setelah transfer
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));

    })

    it("Is not posibble to send more tokens than available in total", async () => {
        let instance = this.mytoken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        // Gunakan BN untuk menghindari masalah overflow
        let amountToSend = new BN(balanceOfDeployer).add(new BN(1));

        // Verifikasi bahwa saldo deployer tetap sama setelah transaksi ditolak
        await expect(instance.transfer(recipient, amountToSend)).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    })

})