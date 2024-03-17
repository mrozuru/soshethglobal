// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts@4.7.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";

contract SST is ERC20, Ownable {
    uint256 public constant MINT_PRICE_PER_TOKEN = 675000000000000; // 0.000675 ETH in wei
    uint256 public constant GAS_FEE_TAP = 0.02 ether; // 2%

    constructor() ERC20("SoSH SST", "SST") {}

    // Function to mint new tokens
    function mint(uint256 tokenAmount, address aAWallet) public payable {
        require(msg.value >= MINT_PRICE_PER_TOKEN * tokenAmount / 1 ether, "Insufficient ETH sent");

        _mint(aAWallet, tokenAmount);
        
        // Optionally refund excess ETH sent
        if (msg.value > MINT_PRICE_PER_TOKEN * tokenAmount) {
            payable(msg.sender).transfer(msg.value - MINT_PRICE_PER_TOKEN * tokenAmount);
        }
    }

        //TODO: The gas transfer happens in another wrapper function instead
    function mintWithGasTap(uint256 tokenAmount, address aAWallet) public payable {
        uint256 totalMintCost = MINT_PRICE_PER_TOKEN * tokenAmount / 1 ether;
        uint256 gasFee = totalMintCost * GAS_FEE_TAP / 1 ether; // Assuming GAS_FEE_TAP is 0.02 ether for 2%
        require(msg.value >= totalMintCost + gasFee, "Insufficient ETH sent");


        _mint(aAWallet, tokenAmount);
        
        (bool success1, ) = payable(aAWallet).call{value: (gasFee)}("");
        require(success1, "Unable to send gas");

        // Optionally refund excess ETH sent
        if (msg.value > totalMintCost + gasFee) {
            (bool successBack, ) = payable(msg.sender).call{value:msg.value - totalMintCost + gasFee}("");
            require(successBack, "Unable to send back fund");
        }
    }

    // Function to burn SST tokens and receive ETH back
    function burn(uint256 amount, address destinationAddress) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient SST tokens to burn");
        _burn(msg.sender, amount);

        uint256 ethAmount = amount * MINT_PRICE_PER_TOKEN;
        require(address(this).balance >= ethAmount, "Contract does not have enough ETH");

        (bool sent, ) = destinationAddress.call{value: ethAmount}("");
        require(sent, "Failed to send ETH");
    }

    // // Withdraw function for contract owner to withdraw ETH collected from mints
    // function withdraw() external onlyOwner {
    //     uint256 balance = address(this).balance;
    //     require(balance > 0, "No ETH to withdraw");
    //     payable(owner()).transfer(balance);
    // }

}
