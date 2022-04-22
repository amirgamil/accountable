// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "../lib/ds-test/src/test.sol";
import "../contracts/Accountable.sol";

interface Hevm {
    // Sets the *next* call's msg.sender to be the input address
    function prank(address) external;
    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called
    function startPrank(address) external;
    // Sets the *next* call's msg.sender to be the input address, and the tx.origin to be the second input
    function prank(address,address) external;
    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called, and the tx.origin to be the second input
    function startPrank(address,address) external;
    // Resets subsequent calls' msg.sender to be `address(this)`
    function stopPrank() external;
}

contract ContractTest is DSTest {
    Accountable accountable;
    Hevm hevm = Hevm(HEVM_ADDRESS);

    function setUp() public {
        accountable = new Accountable();
    }

    function testStakeCreation() public {
        accountable.createNewStake{value: 0.1 ether}("test", address(1));
        Accountable.Stake[] memory allStakes = accountable.getAllStakes();
        assertTrue(allStakes.length == 1);
        assertEq(allStakes[0].name, "test");
    }

    // function testFuzzStakeCreation(uint val) public {

    // }

}
