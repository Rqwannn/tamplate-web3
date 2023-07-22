# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react # Install Truffle Project
```

Install some dependencies ( folder truffle )

```sh
$ npm install --save @openzeppelin/contracts
$ npm install --save chai chai-bn chai-as-promised  
$ npm install --save dotenv
```

```sh
# Truffle Commantweb
$ truffle developer # to use blockchain
$ migrate 
$ web3 console 
# lakukan ini sebelum test send token dari front end pakai key account sendiri
# account[0] karena sudah di migrate terus di config truffle host: "127.0.0.1", dan network id ganache jadi accoundnya banyak
# lebih tepatnya buat transfer coin eth ke akun utama kita dari accountS[0] akun ganache
# $ web3.eth.sendTransaction({to:"0xD8eF85D0c0F4df7955b8E085FaF66B1EB974eA73", from:accountS[0], value: web3.utils.toWei("2", "ether")})
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org). Either one would be a great place to start!
