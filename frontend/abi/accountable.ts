export const ACCOUNTABLE_ABI = [
    {
        type: "function",
        name: "confirmStakeWithBuddy",
        inputs: [
            {
                internalType: "uint256",
                name: "stakeID",
                type: "uint256",
            },
        ],
        outputs: [],
        constant: undefined,
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "createNewStake",
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "address",
                name: "accountabilityBuddy",
                type: "address",
            },
        ],
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        constant: undefined,
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "getAllStakes",
        inputs: [],
        outputs: [
            {
                internalType: "struct Accountable.Stake[]",
                name: "",
                type: "tuple[]",
                components: [
                    {
                        type: "address",
                    },
                    {
                        type: "address",
                    },
                    {
                        type: "uint8",
                    },
                    {
                        type: "string",
                    },
                    {
                        type: "uint256",
                    },
                    {
                        type: "uint256",
                    },
                ],
            },
        ],
        constant: undefined,
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getStakeFromID",
        inputs: [
            {
                internalType: "uint256",
                name: "stakeID",
                type: "uint256",
            },
        ],
        outputs: [
            {
                internalType: "struct Accountable.Stake",
                name: "",
                type: "tuple",
                components: [
                    {
                        type: "address",
                    },
                    {
                        type: "address",
                    },
                    {
                        type: "uint8",
                    },
                    {
                        type: "string",
                    },
                    {
                        type: "uint256",
                    },
                    {
                        type: "uint256",
                    },
                ],
            },
        ],
        constant: undefined,
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getStakesForAccountabilityAddress",
        inputs: [],
        outputs: [
            {
                internalType: "struct Accountable.Stake[]",
                name: "",
                type: "tuple[]",
                components: [
                    {
                        type: "address",
                    },
                    {
                        type: "address",
                    },
                    {
                        type: "uint8",
                    },
                    {
                        type: "string",
                    },
                    {
                        type: "uint256",
                    },
                    {
                        type: "uint256",
                    },
                ],
            },
        ],
        constant: undefined,
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getStakesForStakeeAddress",
        inputs: [],
        outputs: [
            {
                internalType: "struct Accountable.Stake[]",
                name: "",
                type: "tuple[]",
                components: [
                    {
                        type: "address",
                    },
                    {
                        type: "address",
                    },
                    {
                        type: "uint8",
                    },
                    {
                        type: "string",
                    },
                    {
                        type: "uint256",
                    },
                    {
                        type: "uint256",
                    },
                ],
            },
        ],
        constant: undefined,
        stateMutability: "view",
    },
    {
        type: "function",
        name: "idToStakeStruct",
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        outputs: [
            {
                internalType: "address",
                name: "stakee",
                type: "address",
            },
            {
                internalType: "address",
                name: "accountabilityBuddy",
                type: "address",
            },
            {
                internalType: "enum Accountable.Status",
                name: "status",
                type: "uint8",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountStaked",
                type: "uint256",
            },
        ],
        constant: undefined,
        stateMutability: "view",
    },
    {
        type: "function",
        name: "markStakeFailed",
        inputs: [
            {
                internalType: "uint256",
                name: "stakeID",
                type: "uint256",
            },
        ],
        outputs: [],
        constant: undefined,
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "markStakeSuccessful",
        inputs: [
            {
                internalType: "uint256",
                name: "stakeID",
                type: "uint256",
            },
        ],
        outputs: [],
        constant: undefined,
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "stakeIDsForAccountabilityAddress",
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        constant: undefined,
        stateMutability: "view",
    },
    {
        type: "function",
        name: "stakeIDsForStakeeAddress",
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        constant: undefined,
        stateMutability: "view",
    },
    {
        type: "function",
        name: "widthrawMoneyBeforeConfirmation",
        inputs: [
            {
                internalType: "uint256",
                name: "stakeID",
                type: "uint256",
            },
        ],
        outputs: [],
        constant: undefined,
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "NewStakeCreated",
        inputs: [
            {
                name: "name",
                type: "string",
                indexed: false,
            },
            {
                name: "id",
                type: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "StakeAborted",
        inputs: [
            {
                name: "name",
                type: "string",
                indexed: false,
            },
            {
                name: "id",
                type: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "StakeConfirmed",
        inputs: [
            {
                name: "name",
                type: "string",
                indexed: false,
            },
            {
                name: "id",
                type: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "StakeFailed",
        inputs: [
            {
                name: "name",
                type: "string",
                indexed: false,
            },
            {
                name: "id",
                type: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "StakeSuccessful",
        inputs: [
            {
                name: "name",
                type: "string",
                indexed: false,
            },
            {
                name: "id",
                type: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "receive",
    },
];
