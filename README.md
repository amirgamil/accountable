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

<img width="1506" alt="1" src="https://user-images.githubusercontent.com/7995105/166094398-da4f156d-0d3b-4425-b8b6-a6cd45c29136.png">

3. click "stake"

4. wait for the stake to be processed and the stake id to be generated
 
<img width="1509" alt="2" src="https://user-images.githubusercontent.com/7995105/166094415-80d83ec0-27bc-4c7f-b2c4-635f2ee81129.png">

5. navigate to `keepmeaccountable.xyz/stake?id=[stake id]`. If you entered the wrong buddy address, you can recover your deposited funds by aborting the stake. Otherwise, have your budy confirm to lock your money in the contract. You the stakee will not be able to recover the funds now without the buddy.

<img width="1512" alt="3" src="https://user-images.githubusercontent.com/7995105/166094426-abd8d862-e012-4cd0-9aa9-818b18fec0b2.png">

6. upon completion or failure, the accountability buddy will mark the task as successful (✓) or failed (✗) to return your money or donate the money respectively. 

<img width="1509" alt="Screen Shot 2022-04-29 at 11 34 19 PM" src="https://user-images.githubusercontent.com/7995105/166094733-e3205c4e-23c5-4351-a882-9d533a331fd8.png">

So in the example where the stakee accomplished the task, this is what it would look like
<img width="1512" alt="4" src="https://user-images.githubusercontent.com/7995105/166094445-61bf934c-0985-4bb4-980b-e669a8c78c13.png">

And this is what a failed stake will look like.
<img width="1508" alt="Screen Shot 2022-04-29 at 5 30 04 PM" src="https://user-images.githubusercontent.com/7995105/166094747-99daddfc-eeec-4e16-97fc-bb027033b42f.png">

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
