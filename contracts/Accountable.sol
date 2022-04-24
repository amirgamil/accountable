//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@rari-capital/solmate/src/utils/ReentrancyGuard.sol";
// import "forge-std/console.sol";

contract Accountable is ReentrancyGuard {
    // Enum representing status of a stake 
    enum Status {
        Pending, 
        Success,
        Failure
    }

    //represents a single stake made by a stakee 
    struct Stake {
        //person who is staking their money to the contract
        address stakee; 
        //person who is entrusted to make sure the stakee is held accountable.
        //@notice, this MUST be someone the stakee trusts, otherwise there is a risk
        //a malicious person could take the money. The accounabilityBuddy is in charge
        //of confirming to the contract whether the stakee did what they agreed on doing.
        address accountabilityBuddy;
        Status status;
        string name;
        uint256 id;
        //@notice, amount of money staked in wei
        uint256 amountStaked;
        
    }
    Stake[] stakes;
    mapping (uint256 => Stake) public idToStakeStruct; 
    mapping (address => uint256[]) public stakeIDsForStakeeAddress;
    mapping (address => uint256[]) public stakeIDsForAccountabilityAddress;

    event NewStakeCreated(string name, uint id);
    //@notice, if a stake is successfully completed (i.e. the stakee accomplished
    //the agreed upon goal)
    event StakeSuccessful(string name, uint id);
    //@notice, if a stake is successfully unsuccessfully (i.e. the stakee did not accomplish 
    //the agreed upon goal), the accountabilityBuddy gets the amountStaked back.
    event StakeFailed(string name, uint id);

    //Not sure if i need this
    receive() external payable {}

    fallback() external payable {
    }

    modifier validStakeID(uint256 stakeID) {
        require(stakeID < stakes.length, "Invalid id provided");
        require(stakes[stakeID].status == Status.Pending, "Stake is not pending");
        require(stakes[stakeID].accountabilityBuddy == msg.sender, "Only the accountability buddy can mark a stake failed");
        _;
    }

    function getAllStakes() public view returns (Stake[] memory) {
        return stakes;
    }

    function getStakeFromId(uint256 stakeID) public view returns (Stake memory) {
        require(stakeID < stakes.length);
        return stakes[stakeID];
    }

    //gets all stakes for a given stakee address
    function getStakesForStakeeAddress() public view returns (Stake[] memory) {
        uint256[] memory ids = stakeIDsForStakeeAddress[msg.sender];
        Stake[] memory currStakes = new Stake[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            currStakes[i] = getStakeFromId(ids[i]);
        }
        return currStakes;
    }

    function getStakesForAccountabilityAddress() public view returns (Stake[] memory) {
        uint256[] memory ids = stakeIDsForAccountabilityAddress[msg.sender];
        Stake[] memory currStakes = new Stake[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            currStakes[i] = getStakeFromId(ids[i]);
        }
        return currStakes;
    }

    function createNewStake(string memory name, address accountabilityBuddy) external payable nonReentrant {
        //TODO: calculate amountStaked = msg.value - minus gas cost
        require(msg.value > 0, "Must stake at least non-zero amount of ether");
        
        Stake memory newStake = Stake({stakee: msg.sender, name: name, amountStaked: msg.value, accountabilityBuddy: accountabilityBuddy, id: stakes.length, status: Status.Pending});
        stakes.push(newStake);

        stakeIDsForStakeeAddress[msg.sender].push(stakes.length - 1);
        stakeIDsForAccountabilityAddress[accountabilityBuddy].push(stakes.length - 1);

        emit NewStakeCreated(name, stakes.length - 1);
    }

    //@notice, upon successful completion of the agreed upon task/goal/whatever, the accountability buddy
    //marks the stake as successful for the money to be transferred back to the stakee.
    function markStakeSuccessful(uint256 stakeID) external validStakeID(stakeID) nonReentrant {
        //ensure accountability buddy
        require(stakes[stakeID].accountabilityBuddy == msg.sender, "Only the accountability buddy can mark a stake failed");
        //transfer funds to the stakee

        //TODO: fix gas cost
        (bool success, ) = payable(stakes[stakeID].stakee).call{value: 10 gwei }("");
        require(success, "Failed to send Ether to Stakee");
        stakes[stakeID].status = Status.Success;

        emit StakeSuccessful(stakes[stakeID].name, stakeID);
    }

    function markStakeFailed(uint256 stakeID) external validStakeID(stakeID) nonReentrant {
        //ensure accountability buddy
        require(stakes[stakeID].accountabilityBuddy == msg.sender, "Only the accountability buddy can mark a stake failed");
        //transfer funds to the stakee
        //TODO: fix amount is a uint256
        (bool success, ) = payable(stakes[stakeID].accountabilityBuddy).call{value: stakes[stakeID].amountStaked}("");
        require(success, "Failed to send Ether to Accountability Buddy");
        stakes[stakeID].status = Status.Failure;

        emit StakeFailed(stakes[stakeID].name, stakeID);
    }

}