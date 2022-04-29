import * as React from "react";
import { providers, Signer } from "ethers";
import { ethers } from "ethers";
import { ACCOUNTABLE_ABI } from "../abi/accountable";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

interface Context {
    loadWeb3Modal: () => void;
    signOut: () => void;
    signer?: providers.JsonRpcSigner;
    provider?: providers.Web3Provider;
    contract?: ethers.Contract;
    address?: string;
}

export const AppContext = React.createContext<Context>({
    loadWeb3Modal: () => {},
    signOut: () => {},
    signer: undefined,
    provider: undefined,
    contract: undefined,
    address: "",
});
let web3Modal: Web3Modal;
if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
        network: process.env.NODE_ENV === "development" ? "31337" : "test", // change after deploy
        cacheProvider: true, // optional
        providerOptions: {},
    });
}

export const AppContextProvider = (props: any) => {
    const [signer, setSigner] = React.useState<providers.JsonRpcSigner | undefined>(undefined);
    const [provider, setProvider] = React.useState<providers.Web3Provider | undefined>(undefined);
    const [address, setAddress] = React.useState<string | undefined>(undefined);
    const [contract, setContract] = React.useState<ethers.Contract | undefined>(undefined);

    const loadWeb3Modal = React.useCallback(async () => {
        const provider = new ethers.providers.Web3Provider(await web3Modal.connect(), "any");
        setProvider(provider);

        const accountabilityContract = new ethers.Contract(
            process.env.NODE_ENV === "development"
                ? "0x5fbdb2315678afecb367f032d93f642f64180aa3"
                : "0xc9bbf44dF249cb75970EF789AB772Ed58Ba33FD3" ?? "",
            ACCOUNTABLE_ABI,
            provider
        );
        setContract(accountabilityContract);

        const signer = provider.getSigner();
        setSigner(signer);

        const address = await signer.getAddress();
        setAddress(address);
    }, [setProvider]);

    React.useEffect(() => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            if (web3Modal.cachedProvider) {
                loadWeb3Modal();
            }
        }
    }, [loadWeb3Modal]);

    const signOut = () => {
        web3Modal.clearCachedProvider();
        setSigner(undefined);
        setAddress(undefined);
    };

    return (
        <AppContext.Provider
            value={{
                loadWeb3Modal,
                signOut,
                signer,
                address,
                contract,
                provider,
            }}
        >
            <>{props.children}</>
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return React.useContext(AppContext);
}
