export interface Stake {
    name: string;
    bpm: number;
    id: number;
    amountStaked: number;
    status: number;
    stakee: string;
    accountabilityBuddy: string;
}

export const mapArrToStake = (arr: any[]): Stake => {
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

    if (typeof arr[4] === "number") {
        stake.id = arr[4];
    }

    if (typeof arr[5] === "number") {
        stake.amountStaked = arr[5];
    }

    return stake as Stake;
};
