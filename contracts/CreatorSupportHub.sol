// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CreatorSupportHub {
    struct Creator {
        address payout;
        string profileURI;
        bool active;
    }

    struct Post {
        address creator;
        string metadataURI;
        uint64 createdAt;
    }

    mapping(address => Creator) public creators;
    mapping(address => uint256[]) private creatorPostIds;
    Post[] private posts;
    bool private entered;

    event CreatorRegistered(address indexed creator, address indexed payout, string profileURI);
    event CreatorUpdated(address indexed creator, address indexed payout, string profileURI, bool active);
    event PostCreated(uint256 indexed postId, address indexed creator, string metadataURI);
    event Appreciation(
        address indexed supporter,
        address indexed creator,
        uint256 indexed postId,
        uint256 amount,
        string message
    );

    modifier nonReentrant() {
        require(!entered, "Reentrant call");
        entered = true;
        _;
        entered = false;
    }

    function registerCreator(string calldata profileURI, address payable payout) external {
        require(payout != address(0), "Invalid payout");
        require(!creators[msg.sender].active, "Creator already registered");

        creators[msg.sender] = Creator(payout, profileURI, true);
        emit CreatorRegistered(msg.sender, payout, profileURI);
    }

    function updateCreator(string calldata profileURI, address payable payout, bool active) external {
        require(creators[msg.sender].payout != address(0), "Creator not registered");
        require(payout != address(0), "Invalid payout");

        creators[msg.sender] = Creator(payout, profileURI, active);
        emit CreatorUpdated(msg.sender, payout, profileURI, active);
    }

    function createPost(string calldata metadataURI) external returns (uint256 postId) {
        require(creators[msg.sender].active, "Creator is not active");

        postId = posts.length;
        posts.push(Post(msg.sender, metadataURI, uint64(block.timestamp)));
        creatorPostIds[msg.sender].push(postId);
        emit PostCreated(postId, msg.sender, metadataURI);
    }

    function appreciate(address creator, uint256 postId, string calldata message)
        external
        payable
        nonReentrant
    {
        require(msg.value > 0, "Amount required");
        require(creators[creator].active, "Creator is not active");
        require(postId < posts.length && posts[postId].creator == creator, "Invalid post");

        (bool sent, ) = creators[creator].payout.call{value: msg.value}("");
        require(sent, "Payout failed");
        emit Appreciation(msg.sender, creator, postId, msg.value, message);
    }

    function getCreatorPosts(address creator) external view returns (uint256[] memory) {
        return creatorPostIds[creator];
    }

    function getPost(uint256 postId) external view returns (Post memory) {
        require(postId < posts.length, "Post does not exist");
        return posts[postId];
    }

    function getPostCount() external view returns (uint256) {
        return posts.length;
    }
}