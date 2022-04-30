# Accountable

### Description

This is a tool that keeps you accountable by putting your money on the line. Literally.

You pick an accountability partner, someone who you trust and deposit some money into the contract (or "stake it"). This locks your money in the contract.

If you successfully complete the agreed upon task (by agreed on date), your accountability partner marks the task as successful and you get your money back.

If you fail, they mark it as failed and your money gets donated directly to Khan Academy. In other words, the tool is a forcing function to get something done and keep you accountable by actually putting money on the line.

### How do I use it?

If you want to create a stake to stay accountable:

1. navigate to [home page](https://keepmeaccountable.xyz/)
2. enter your accountability buddy address (who you trust), a name, and the amount to stake
3. click "stake"
4. wait for the stake to be processed and the stake id to be generated
5. navigate to `keepmeaccountable.xyz/stake?id=[stake id]`. If you entered the wrong buddy address, you can recover your deposited funds by aborting stake. Otherwise, have your budy confirm to lock your money in the contract. You the stakee will not be able to recover the funds now.
6. upon completion or failure, the accountability buddy will mark the task as successful (✓) or failed (✗) to return your money or donate the money respectively.

### Note

Note the address listed in the contract for [Khan Academy](https://www.khanacademy.org) was taken straight from their [donate page](https://www.khanacademy.org/donate).

### Stack

Smart contracts are written in Solidity, with foundry for testing, and Hardhat for deployments.
Run `forge test` to run the test suite. Note however that foundry does not play nice with `call` which limited the number of tests that could be covered, so I did more complete testing via a local Hardhat node.

Reminder to:

-   Add loading state to index page while processing

-   [ ] Change `CHAIN_DEFAULT` to Optimism explorer
-   [x] Change address to deployed contract in `context.tsx`
-   [x] Change `NETWORK` in context to `optimism`
-   [x] Add deployed contract address to etherscan

## Disclaimer

These smart contracts are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the user interface or the smart contracts. They have not been formally audited and as such there can be no assurance they will work as intended, and users may experience delays, failures, errors, omissions or loss of transmitted information. Paradigm is not liable for any of the foregoing. Users should proceed with caution and use at their own risk.

## Attribution

Thanks to [Walden](https://github.com/walnutwaldo) for taking a glance at the contract and [Aadil](https://twitter.com/aadillpickle) and [Morgan](https://twitter.com/morgallant) for the idea.
