// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@eigenlayer-middleware/src/interfaces/IServiceManager.sol";
import "@eigenlayer-middleware/src/ServiceManagerBase.sol";

//SSTServiceManager will manage staking, reward distribution, and integration with Eigenlayer middleware.
contract SSTServiceManager is ServiceManagerBase {
    struct Share {
        uint256 postId;
        address sharer;
    }

    SST private _sstToken;
    SSTPostManager private _postManager;
    mapping(uint256 => Share) public shares;
    uint256 public nextShareId;

    // Constructor for setting up the SST token and the Post Manager
    constructor(
        address sstTokenAddress,
        address postManagerAddress,
        IDelegationManager delegationManager,
        IRegistryCoordinator registryCoordinator,
        IStakeRegistry stakeRegistry
    )
        ServiceManagerBase(delegationManager, registryCoordinator, stakeRegistry)
    {
        _sstToken = SST(sstTokenAddress);
        _postManager = SSTPostManager(postManagerAddress);
    }

    // Function to reward a user for creating a post or a share
    function rewardUserForPost(uint256 postId, uint256 rewardAmount) external {
        require(msg.sender == address(_postManager), "Only the post manager can call this function");
        require(postId < _postManager.nextPostId(), "Post does not exist");

        SSTPostManager.Post memory post = _postManager.posts(postId);
        require(post.author != address(0), "Post author is invalid");

        _sstToken.mintRewards(post.author, rewardAmount);
    }

    // Function to reward a user for sharing a post
    function rewardUserForShare(uint256 shareId, uint256 rewardAmount) external {
        require(shareId < _postManager.nextShareId(), "Share does not exist");

        SSTPostManager.Share memory share = _postManager.shares(shareId);
        require(share.sharer != address(0), "Share does not have a valid sharer");

        _sstToken.mintRewards(share.sharer, rewardAmount);
        // Optionally emit an event here if needed
    }
}
