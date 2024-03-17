// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20DerivedSublinear.sol";

contract SSTCTM is ERC20DerivedSublinear {
    constructor(
        string memory name_,
        string memory symbol_,
        address reserveTokenAddr_,
        uint priceWindowRatio_,
        uint8 exponentNumerator_,
        uint8 exponentDenominator_,
        uint128 mappingScale_,      
        uint8 mappingScaleDecimals_
    ) ERC20DerivedSublinear(
        name_,
        symbol_,
        reserveTokenAddr_,
        priceWindowRatio_,
        exponentNumerator_,      
        exponentDenominator_,
        mappingScale_,
        mappingScaleDecimals_
    ){}

    /**
     * Overrides
     */
    function _mint(address to, uint256 amount) internal override(ERC20) {
        super._mint(to, amount);
    }
}