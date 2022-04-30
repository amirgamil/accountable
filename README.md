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

<img width="1511" alt="1" src="https://user-images.githubusercontent.com/7995105/166095192-ec5f5a9a-eeee-4685-b426-83ad671a78a9.png">

3. click "stake"

4. wait for the stake to be processed and the stake id to be generated
 
<img width="1511" alt="2" src="https://user-images.githubusercontent.com/7995105/166095198-5ee01140-e1b8-4014-8d30-112a612375f0.png">

5. navigate to `keepmeaccountable.xyz/stake?id=[stake id]` where `[stake id]` is your id. If you entered the wrong buddy address, you can recover your deposited funds by aborting the stake. Otherwise, **have your accountability budy confirm** to lock your money in the contract. You the stakee will not be able to recover the funds now without the buddy.

<img width="1512" alt="3" src="https://user-images.githubusercontent.com/7995105/166095218-32c544e4-10c1-4881-b3dd-5ef6ca74fead.png">

6. upon completion or failure, the accountability buddy will mark the task as successful (✓) or failed (✗) to return your money or donate the money respectively. 

<img width="1511" alt="4" src="https://user-images.githubusercontent.com/7995105/166095229-aea38d82-307b-4cc7-b664-5c841ed4653b.png">

So in the example where the stakee accomplished the task, this is what it would look like

<img width="1512" alt="5" src="https://user-images.githubusercontent.com/7995105/166095233-af1b4fb7-c2dc-44b9-8561-fd959d08a80f.png">


And this is what a failed stake will look like.

<img width="1508" alt="fail" src="https://user-images.githubusercontent.com/7995105/166095235-ae10949c-e0f3-4be9-b605-3dd5485830ea.png">


### Note

Note the address listed in the contract for [Khan Academy](https://www.khanacademy.org) was taken straight from their [donate page](https://www.khanacademy.org/donate).

<img width="1510" alt="Screen Shot 2022-04-29 at 11 37 28 PM" src="https://user-images.githubusercontent.com/7995105/166094831-3ce6f06c-813e-4289-8684-ecab112adb30.png">


### Stack

Smart contracts are written in Solidity, with foundry for testing, and Hardhat for deployments.
Run `forge test` to run the test suite. Note however that foundry does not play nice with `call` which limited the number of tests that could be covered, so I did more complete testing via a local Hardhat node.


## Disclaimer

These smart contracts are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the user interface or the smart contracts. They have not been formally audited and as such there can be no assurance they will work as intended, and users may experience delays, failures, errors, omissions or loss of transmitted information. I am not liable for any of the foregoing. Users should proceed with caution and use at their own risk.

## Attribution

Thanks to [Walden](https://github.com/walnutwaldo) for taking a glance at the contract and [Aadil](https://twitter.com/aadillpickle) and [Morgan](https://twitter.com/morgallant) for the idea.
