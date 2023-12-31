// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

import "./Crowdsales.sol";
import "./KycContract.sol";

contract MyTokenSale is Crowdsale {
    KycContract kyc;

    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    ) Crowdsale(rate, wallet, token) {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.KycCompleted(msg.sender), "KYC not completed purchase not allowed");
    }
}