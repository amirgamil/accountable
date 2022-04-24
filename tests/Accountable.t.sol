// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "../contracts/Accountable.sol";

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

    // function testFuzzStakeCreation(uint256 val) public {
    //     vm.assume(val != 0);
    //     accountable.createNewStake{value: val }("test", address(1));
    //     Accountable.Stake[] memory allStakes = accountable.getAllStakes();
    //     assertTrue(allStakes.length == 1);
    //     assertEq(allStakes[0].name, "test");
    // }

    function testSuccessfulStakeCompletion() public {
        address currentStakee = address(this);
        //seed contract with some funds first
        vm.deal(currentStakee, 1 ether);

        console.log("Hello: ", address(this).balance);

        accountable.createNewStake{value: 0.1 ether}("test", address(1));
        Accountable.Stake[] memory allStakes = accountable.getAllStakes();
        
        assertTrue(allStakes.length == 1);
        assertEq(allStakes[0].name, "test"); 

        vm.startPrank(address(1));
        accountable.markStakeSuccessful(allStakes[0].id);
        vm.stopPrank();

        Accountable.Stake[] memory updatedStakes = accountable.getAllStakes();
        assertTrue(updatedStakes[0].status == Accountable.Status.Success);
    }

    function testCheeky() public {
        console.log(address(this));
    }

}
