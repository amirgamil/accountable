import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Button } from "../components/button";
import { useAppContext } from "../components/context";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { mapArrToStake, oneEtherInWei, Stake } from "../lib/contractHelpers";
import { Spinner } from "../components/spinner";
import { isEthersError } from "../lib/types";
import { CHAIN_EXPLORER } from "../lib/defaults";
import Link from "next/link";

enum ContractMethod {
    MarkSuccessful,
    MarkFailed,
    ConfirmStake,
    AbortStake,
}

const StakePage: NextPage = () => {
    const context = useAppContext();
    const router = useRouter();
    const { id } = router.query;

    const contractExists = context.contract !== undefined;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [pollCounter, setPollCounter] = React.useState<number>(0);
    const lastStep = React.useRef<number>(0);

    const { isLoading, error, data, refetch } = useQuery<Stake | undefined>(
        `stake${id}`,
        async () => {
            if (context.contract && id !== undefined) {
                const dataResult = await context.contract.getStakeFromID(id);
                return mapArrToStake(dataResult);
            }
        },
        { retry: 1, enabled: contractExists, staleTime: 10000 }
    );

    React.useEffect(() => {
        const stopLoading =
            (!error && data && lastStep.current === 0 && data.status !== 0) ||
            (!error && data && lastStep.current === 3 && data.status !== 3);

        if (stopLoading) {
            setLoading(false);
        } else {
            if (!error) {
                setTimeout(async () => {
                    await refetch();
                    setPollCounter(pollCounter + 1);
                }, 1000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, pollCounter]);

    const broadcastTransaction = React.useCallback((hash: string) => {
        toast.custom(
            (t) => (
                <div
                    style={{ borderRadius: "8px" }}
                    className={`bg-white px-6 py-4 shadow-md ${t.visible ? "animate-enter" : "animate-leave"}`}
                >
                    Transaction broadcasted! View it{" "}
                    <a className="underline" href={`${CHAIN_EXPLORER}tx/${hash}`}>
                        here
                    </a>
                </div>
            ),
            { position: "top-center" }
        );
    }, []);

    const callContractMethod = React.useCallback(
        async (state: ContractMethod) => {
            setLoading(true);
            try {
                const provider = context.provider;
                const signer = context.signer;
                const contract = context.contract;

                if (provider && signer && contract) {
                    const contractWithSigner = contract.connect(signer);

                    let tx = undefined;
                    switch (state) {
                        case ContractMethod.MarkSuccessful:
                            lastStep.current = 0;
                            await contractWithSigner.callStatic.markStakeSuccessful(id);
                            tx = await contractWithSigner.markStakeSuccessful(id);
                            break;
                        case ContractMethod.MarkFailed:
                            lastStep.current = 0;
                            await contractWithSigner.callStatic.markStakeFailed(id);
                            tx = await contractWithSigner.markStakeFailed(id);
                            break;
                        case ContractMethod.ConfirmStake:
                            lastStep.current = 3;
                            await contractWithSigner.callStatic.confirmStakeWithBuddy(id);
                            tx = await contractWithSigner.confirmStakeWithBuddy(id);
                            break;
                        case ContractMethod.AbortStake:
                            lastStep.current = 3;
                            await contractWithSigner.callStatic.widthrawMoneyBeforeConfirmation(id);
                            tx = await contractWithSigner.widthrawMoneyBeforeConfirmation(id);
                            break;
                        default:
                            throw new Error("Unexpected contract method recieved");
                    }
                    broadcastTransaction(tx.hash);
                    await tx.wait();
                    setPollCounter(1);
                }
            } catch (ex: unknown) {
                setLoading(false);
                if (isEthersError(ex)) {
                    const regex = /execution reverted: (.+)/g;
                    const matches = regex.exec(ex.data.message);
                    if (matches) {
                        toast.error(`Error: ${matches[1]}`);
                        return Promise.reject(ex);
                    }
                }
                toast.error(`An unexpected error occurred`);
                return Promise.reject(ex);
            }
        },
        [context.contract, context.provider, context.signer, id]
    );

    const amountedStaked = React.useMemo(
        () => (data ? Number((data.amountStaked.toBigInt() * BigInt(100000000)) / oneEtherInWei) / 100000000 : ""),
        [data]
    );

    if (error) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className="grow w-full h-full flex items-center justify-center">
                        <p className="opacity-50">No stake with this ID has been created!</p>
                    </div>
                    <Footer />
                </main>
            </div>
        );
    }

    //FIXME: prompt to sign in with wallet if not signed in instead of just showing loading screen
    if (isLoading || !context.contract || !data) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className="grow w-full h-full flex items-center justify-center">
                        <Spinner />
                    </div>
                    <Footer />
                </main>
            </div>
        );
    }

    let colorBasedOnState: string = "";
    let currentStep: React.ReactNode;

    //Confirmed, and in progress
    if (data.status === 0) {
        colorBasedOnState = "white";
        currentStep = (
            <>
                <br></br>
                <p className="text-left w-full">
                    This stake is now <strong>confirmed</strong>. The accountability buddy can mark the stake as
                    successful (✓) or failed (✗) below. The stakee cannot withdraw their funds until the buddy does
                    this.
                </p>
                <br></br>
                <Button
                    majorColor={"#5eda6085"}
                    hoverColor={"#5eda60"}
                    disabled={false}
                    onClick={() => callContractMethod(ContractMethod.MarkSuccessful)}
                >
                    ✓
                </Button>
                <Button
                    majorColor={"#fd3f0285"}
                    hoverColor={"#fd4102"}
                    disabled={false}
                    onClick={() => callContractMethod(ContractMethod.MarkFailed)}
                >
                    ✗
                </Button>
            </>
        );
        //Successfully completed
    } else if (data.status === 1) {
        colorBasedOnState = "#5eda6085";
        currentStep = (
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl font-bold">✓</p>
            </div>
        );
        //Unsuccessfully completed
    } else if (data.status === 2) {
        colorBasedOnState = "#fd3f0285";
        currentStep = (
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl font-bold">✘</p>
            </div>
        );
        //Stake has not been confirmed by accountability buddy yet
    } else if (data.status === 3) {
        colorBasedOnState = "white";
        currentStep = (
            <>
                <br></br>
                <p className="text-left w-full">
                    This stake is still <strong>unconfirmed</strong>. The accountability buddy can confirm below to lock
                    the stakee&apos;s money in the contract.
                </p>
                <br></br>
                <p className="text-left w-full">
                    The stakee can abort the stake to withdraw their money if they made a mistake before the stake is
                    confirmed, after which they can no longer do so.
                </p>
                <br></br>
                <Button
                    majorColor={"#5eda6085"}
                    hoverColor={"#5eda60"}
                    disabled={false}
                    onClick={() => callContractMethod(ContractMethod.ConfirmStake)}
                >
                    Confirm Stake
                </Button>
                <Button
                    majorColor={"#fd3f0285"}
                    hoverColor={"#fd4102"}
                    disabled={false}
                    onClick={() => callContractMethod(ContractMethod.AbortStake)}
                >
                    Abort Stake
                </Button>
            </>
        );
        //Stake was aborted by stakee before it was confirmed
    } else {
        colorBasedOnState = "#FFDAB7";
        currentStep = (
            <div className="flex flex-col items-center justify-center">
                <p className="text-s font-bold">Aborted</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Accountable</title>
                <meta name="description" content="On-chain music composition" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />
            <main className={styles.main}>
                <div style={{ background: colorBasedOnState }} className={styles.center}>
                    <div className={styles.mobileNotifier}>
                        Unfortunately, this is not available on mobile, please try it on a laptop! Feel free to read the{" "}
                        <Link href="/faq">FAQ</Link> while you&apos;re here
                    </div>
                    <div className={styles.window}>
                        <p className="text-xl font-bold w-full text-left">{data.name}</p>
                        <div className="py-1"></div>
                        <p className="text-s w-full text-left">Stakee</p>
                        <p style={{ opacity: 0.5 }}>{data.stakee}</p>
                        <p className="text-s w-full text-left">Buddy</p>
                        <p style={{ opacity: 0.5 }}>{data.accountabilityBuddy}</p>
                        <p className="text-s w-full text-left">Amount Staked</p>
                        <p style={{ opacity: 0.5 }}>{amountedStaked} ETH</p>
                        <div className="w-full flex flex-col items-center justify-center m-0 p-0">
                            {loading ? (
                                <div className="p-4">
                                    <Spinner />
                                </div>
                            ) : (
                                currentStep
                            )}
                        </div>
                    </div>
                    <Toaster />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StakePage;
