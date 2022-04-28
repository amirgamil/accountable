export interface EthersError {
    code: number;
    data: {
        code: number;
        message: string;
    };
    message: string;
}

export const isEthersError = (obj: any): obj is EthersError => {
    return typeof obj.code === "number" && obj.data !== undefined && typeof obj.data.message === "string";
};
