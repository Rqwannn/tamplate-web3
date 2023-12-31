"use strict";
let chai = require("chai");

const BN = web3.utils.BN; // Big Number
const chaiBN = require("chai-bn")(BN); 
chai.use(chaiBN);

let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

module.exports = chai;