// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@eigenlayer/contracts/permissions/Pausable.sol";
import "@eigenlayer/contracts/interfaces/IDelegationManager.sol";
import "@eigenlayer/contracts/interfaces/IRegistryCoordinator.sol";
import "@eigenlayer/contracts/interfaces/IStakeRegistry.sol";
import "@eigenlayer/contracts/libraries/BN254.sol";
import "@eigenlayer-middleware/src/ServiceManagerBase.sol";
import "./SST.sol"; // Assume SST contract includes mintRewards function

contract SSTPostShareManager is Initializable, OwnableUpgradeable, Pausable, ServiceManagerBase {
    using BN254 for BN254.G1Point;

    SST public sstToken;

    struct Post {
        uint256 id;
        address author;
        string content;
    }

    struct Share {
        uint256 id;
        uint256 originalPostId;
        address sharer;
    }

    // Mapping to store posts and shares
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Share) public shares;

    // Counters for posts and shares
    uint256 public nextPostId;
    uint256 public nextShareId;

    event PostCreated(uint256 indexed postId, address indexed author, string content);
    event ShareCreated(uint256 indexed shareId, address indexed sharer, uint256 originalPostId);

    constructor(
        address _sstTokenAddress,
        IDelegationManager _delegationManager,
        IRegistryCoordinator _registryCoordinator,
        IStakeRegistry _stakeRegistry
    ) ServiceManagerBase(_delegationManager, _registryCoordinator, _stakeRegistry) {
        sstToken = SST(_sstTokenAddress);
    }

    function initialize() public initializer {
        __Ownable_init();
    }

    function createPost(string calldata content) external {
        uint256 postId = nextPostId++;
        posts[postId] = Post(postId, msg.sender, content);
        emit PostCreated(postId, msg.sender, content);

        // Reward logic or further interactions can be added here
    }

    function createShare(uint256 originalPostId) external {
        require(posts[originalPostId].id == originalPostId, "Original post does not exist.");

        uint256 shareId = nextShareId++;
        shares[shareId] = Share(shareId, originalPostId, msg.sender);
        emit ShareCreated(shareId, msg.sender, originalPostId);

        // Reward logic or further interactions can be added here
    }

    // Function to distribute rewards. This can be called internally or externally
    // based on specific conditions or actions.
    function rewardUser(address user, uint256 amount) external {
        require(msg.sender == address(this) || msg.sender == owner(), "Unauthorized");
        sstToken.mintRewards(user, amount);
    }

    // Additional functions to interact with Eigenlayer's services can be added here
}
