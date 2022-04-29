// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "../contracts/Accountable.sol";

//Note Foundry tests are NOT complete because it does not play well with call.
//I did significantly more complete tests via a local hardhat node
contract ContractTest is Test{
    Accountable accountable;

    function setUp() public {
        accountable = new Accountable();
    }

    function testStakeCreation() public {
        accountable.createNewStake{value: 0.1 ether}("test", address(1));
        Accountable.Stake[] memory allStakes = accountable.getAllStakes();
        assertTrue(allStakes.length == 1);
        assertEq(allStakes[0].name, "test");
    }

    function testFailStake0() public {
        accountable.createNewStake{value: 0 ether}("test", address(1));
    }

    function testSuccessfulConfirmStake() public {
        address currentStakee = address(this);
        vm.deal(currentStakee, 1 ether);

        accountable.createNewStake{value: 1 ether}("test", address(2));
        Accountable.Stake[] memory allStakes = accountable.getAllStakes();
        
        assertTrue(allStakes.length == 1);
        assertEq(allStakes[0].name, "test"); 
        assertTrue(allStakes[0].status == Accountable.Status.Unconfirmed);

        vm.startPrank(address(2));
        accountable.confirmStakeWithBuddy(0);

        Accountable.Stake[] memory updatedStakes = accountable.getAllStakes();
        assertTrue(updatedStakes[0].status == Accountable.Status.Pending);

    }

    function testFailStrangerConfirmStake() public {
        address currentStakee = address(this);
        vm.deal(currentStakee, 1 ether);

        accountable.createNewStake{value: 1 ether}("test", address(2));
        Accountable.Stake[] memory allStakes = accountable.getAllStakes();
        
        assertTrue(allStakes.length == 1);
        assertEq(allStakes[0].name, "test"); 
        assertTrue(allStakes[0].status == Accountable.Status.Unconfirmed);

        vm.startPrank(address(4));
        accountable.confirmStakeWithBuddy(0);

        Accountable.Stake[] memory updatedStakes = accountable.getAllStakes();
        assertTrue(updatedStakes[0].status == Accountable.Status.Pending);
    }


    function testFailStrangerAbortStake() public {
        address currentStakee = address(this);
        vm.deal(currentStakee, 1 ether);

        accountable.createNewStake{value: 1 ether}("test", address(2));
        Accountable.Stake[] memory allStakes = accountable.getAllStakes();
        
        assertTrue(allStakes.length == 1);
        assertEq(allStakes[0].name, "test"); 
        assertTrue(allStakes[0].status == Accountable.Status.Unconfirmed);

        vm.startPrank(address(4));
        accountable.widthrawMoneyBeforeConfirmation(0);

    }

}
