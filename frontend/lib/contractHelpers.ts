import { BigNumber } from "ethers";

export interface Stake {
    name: string;
    bpm: number;
    //id and amountStaked are objects because they're BigNumber
    id: BigNumber;
    amountStaked: BigNumber;
    status: number;
    stakee: string;
    accountabilityBuddy: string;
}

export const mapArrToStake = (arr: any[]): Stake => {
    console.log(arr);
    const stake: any = {};
    if (typeof arr[0] === "string") {
        stake.stakee = arr[0];
    }

    if (typeof arr[1] === "string") {
        stake.accountabilityBuddy = arr[1];
    }

    if (typeof arr[2] === "number") {
        stake.status = arr[2];
    }

    if (typeof arr[3] === "string") {
        stake.name = arr[3];
    }

    if (typeof arr[4] === "object") {
        stake.id = arr[4];
    }

    if (typeof arr[5] === "object") {
        stake.amountStaked = arr[5];
    }

    return stake as Stake;
};

export const oneEtherInWei = BigNumber.from("1000000000000000000");
