const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");
const KycContract = artifacts.require("KycContract");

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

    it("All token should be in the TokenSale Smart Contract by default", async () => {
        let instance = await Token.deployed();

        // balanceOf adalah fungsi yang mengembalikan saldo akun yang ditentukan 
        let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);

        // totalSupply adalah fungsi pada kontrak Token yang mengembalikan jumlah total token yang ada dalam bentuk bignumber.
        let totalSupply = await instance.totalSupply();

        // equal adalah metode atau fungsi yang digunakan dalam pustaka Chai untuk membandingkan apakah dua nilai atau objek sama atau identik.
        expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    })

    it("Should be possible to buy tokens", async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let KycInstance = await KycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);

        // whitelist itself
        await KycInstance.setKycCompleted(deployerAccount, {from: deployerAccount})

        // gunakan send() yang lebih cepat dalam kasus unit testing
        // send tidak menyiarkan transaksi ke jaringan sebenarnya dan hanya berinteraksi dengan kontrak secara lokal di lingkungan pengujian
        await expect(tokenSaleInstance.sendTransaction({
                from: deployerAccount,
                value: web3.utils.toWei("1", "wei")
            })
        ).to.be.fulfilled;

        // Fungsi dari eventually dalam pustaka Chai adalah untuk menangani pengujian yang melibatkan asinkronitas.
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    })
})