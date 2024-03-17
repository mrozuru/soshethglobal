// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC1155} from "solmate/src/tokens/ERC1155.sol";
import "./SST.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "abdk-libraries-solidity/ABDKMathQuad.sol";

error Unauthorized();

//DONE: Add Protocol fee, creator fee and protocol destination
//DONE: Inital mint has to be bought with SST
//DONE: Use SST instead of ETH to buy and sell the Certis
//NEED TODO: Align with tokenomics Curve 1.00325^(n-1) 

// TODO: Add last curator - on buy and sell - extra param - can send from frontend
// TODO: Add original creator can cash out later - store here that they can claim later


contract Certi is ERC1155, Ownable {

    event Create(uint256 indexed assetId, address indexed sender, string ipfsId);
    event Remove(uint256 indexed assetId, address indexed sender);
    event Trade(
        TradeType indexed tradeType,
        uint256 indexed assetId,
        address indexed sender,
        uint256 tokenAmount,
        uint256 ethAmount,
        uint256 curatorFee,
        uint256 protocolFee
    );

    struct Asset {
        uint256 id;
        string ipfsId; 
        address curator;
    }

    uint256 public assetIndex;
    mapping(uint256 => Asset) public assets;
    mapping(address => uint256[]) public userAssets;
    mapping(bytes32 => uint256) public txToAssetId;
    mapping(uint256 => uint256) public totalSupply;
    mapping(uint256 => uint256) public pool;
    uint256 public constant CURATOR_PREMINT = 1 ether; // 1e18
    address public protocolFeeDestination;
    uint256 public protocolFeePercent;
    uint256 public subjectFeePercent;
    uint256 public requiredInitialSSTAmount;
    SST public sst;

    enum TradeType {
        Mint,
        Buy,
        Sell
    } // = 0, 1, 2

    function setFeeDestination(address _feeDestination) public onlyOwner {
        protocolFeeDestination = _feeDestination;
    }

    function setProtocolFeePercent(uint256 _feePercent) public onlyOwner {
        protocolFeePercent = _feePercent;
    }

    function setSubjectFeePercent(uint256 _feePercent) public onlyOwner {
        subjectFeePercent = _feePercent;
    }

    function setrequiredInitialSSTAmount(uint256 _requiredInitialSSTAmount) public onlyOwner {
        requiredInitialSSTAmount = _requiredInitialSSTAmount;
    }

    function setSSTAddress(address _sstAddress) public onlyOwner {
        sst = SST(_sstAddress);
    }

    function create(string calldata ipfsId) public returns (uint256) {
        bytes32 txHash = keccak256(abi.encodePacked(ipfsId));
        require(txToAssetId[txHash] == 0, "Asset already exists"); //TODO: Double check this logic - to stop mint of 2 same ipfsId
        if(requiredInitialSSTAmount > 0 ) {
            require(sst.balanceOf(msg.sender) >= requiredInitialSSTAmount, "Insufficient SST token balance");
            sst.transferFrom(msg.sender, protocolFeeDestination, requiredInitialSSTAmount);
        }
        uint256 newAssetId = assetIndex;
        assets[newAssetId] = Asset(newAssetId, ipfsId, msg.sender);
        userAssets[msg.sender].push(newAssetId);
        txToAssetId[txHash] = newAssetId;
        totalSupply[newAssetId] += CURATOR_PREMINT;
        assetIndex = newAssetId + 1;
        _mint(msg.sender, newAssetId, CURATOR_PREMINT, "");
        emit Create(newAssetId, msg.sender, ipfsId);
        emit Trade(TradeType.Mint, newAssetId, msg.sender, CURATOR_PREMINT, 0, 0, requiredInitialSSTAmount);
        return newAssetId;
    }

    function remove(uint256 assetId) public {
        Asset memory asset = assets[assetId];
        if (asset.curator != msg.sender) {
            revert Unauthorized();
        }
        delete txToAssetId[keccak256(abi.encodePacked(asset.ipfsId))];
        delete assets[assetId];
        emit Remove(assetId, msg.sender);
    }

    function getAssetIdsByAddress(address addr) public view returns (uint256[] memory) {
        return userAssets[addr];
    }

    function _curve(uint256 x) private pure returns (uint256) {
        return x <= CURATOR_PREMINT ? 0 : ((x - CURATOR_PREMINT) * (x - CURATOR_PREMINT) * (x - CURATOR_PREMINT));
    }

    function getPrice(uint256 supply, uint256 amount) public pure returns (uint256) {
        return (_curve(supply + amount) - _curve(supply)) / 1 ether / 1 ether / 50_000;
    }

    function getBuyPrice(uint256 assetId, uint256 amount) public view returns (uint256) {
        return getPrice(totalSupply[assetId], amount);
    }

    function getSellPrice(uint256 assetId, uint256 amount) public view returns (uint256) {
        return getPrice(totalSupply[assetId] - amount, amount);
    }

    function getBuyPriceAfterFee(uint256 assetId, uint256 amount) public view returns (uint256) {
        uint256 price = getBuyPrice(assetId, amount);
        uint256 curatorFee = (price * subjectFeePercent) / 1 ether;
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        return price + curatorFee + protocolFee;
    }

    function getSellPriceAfterFee(uint256 assetId, uint256 amount) public view returns (uint256) {
        uint256 price = getSellPrice(assetId, amount);
        uint256 curatorFee = (price * subjectFeePercent) / 1 ether;
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        return price - curatorFee - protocolFee;
    }

    function buy(uint256 assetId, uint256 amount) public {
        require(assetId < assetIndex, "Asset does not exist");
        uint256 price = getBuyPrice(assetId, amount);
        uint256 curatorFee = (price * subjectFeePercent) / 1 ether;
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        require(sst.balanceOf(msg.sender) >= price + curatorFee + protocolFee, "Insufficient payment");
        totalSupply[assetId] += amount * 1 ether;
        pool[assetId] += price;
        _mint(msg.sender, assetId, amount * 1 ether, "");
        emit Trade(TradeType.Buy, assetId, msg.sender, amount * 1 ether, price, curatorFee, protocolFee);
        bool sent = sst.transferFrom(msg.sender, address(this), price);
        bool curatorFeeSent = sst.transferFrom(msg.sender, assets[assetId].curator, curatorFee);
        bool protocolFeeSent = sst.transferFrom(msg.sender, protocolFeeDestination, protocolFee);
        require(sent && curatorFeeSent && protocolFeeSent, "Failed to send funds");
    }

    function sell(uint256 assetId, uint256 amount) public {
        require(assetId < assetIndex, "Asset does not exist");
        require(balanceOf[msg.sender][assetId] >= amount, "Insufficient balance");
        uint256 supply = totalSupply[assetId];
        require(supply - amount >= CURATOR_PREMINT, "Supply not allowed below premint amount");
        uint256 price = getSellPrice(assetId, amount);
        uint256 curatorFee = (price * subjectFeePercent) / 1 ether;
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        _burn(msg.sender, assetId, amount);
        totalSupply[assetId] = supply - amount * 1 ether;
        pool[assetId] -= price;
        emit Trade(TradeType.Sell, assetId, msg.sender, amount * 1 ether, price, curatorFee, protocolFee);
        bool sent =  sst.transfer(msg.sender, price - curatorFee - protocolFee);
        bool curatorFeeSent =  sst.transfer(assets[assetId].curator, curatorFee);
        bool protocolFeeSent =  sst.transfer(protocolFeeDestination, protocolFee);
        require(sent && curatorFeeSent && protocolFeeSent, "Failed to send funds");
    }

    function uri(uint256 id) public view override returns (string memory) {
        return assets[id].ipfsId;
    }
}