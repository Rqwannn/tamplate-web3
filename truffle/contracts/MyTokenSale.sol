// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

import "./Crowdsales.sol";

contract MyTokenSale is Crowdsale {
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token
    )

    Crowdsale(rate, wallet, token)
    {

    }
}