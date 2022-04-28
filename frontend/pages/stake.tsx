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

const StakePage: NextPage = () => {
    const context = useAppContext();
    const router = useRouter();
    const { id } = router.query;

    const contractExists = context.contract !== undefined;

    const [loading, setLoading] = React.useState<boolean>(false);

    const { isLoading, error, data } = useQuery<Stake | undefined>(
        "stake",
        async () => {
            if (context.contract && id !== undefined) {
                const dataResult = await context.contract.getStakeFromId(id);
                return mapArrToStake(dataResult);
            }
        },
        { retry: 1, enabled: contractExists }
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

    const attemptApproveOrFail = async (approve: boolean) => {
        setLoading(true);
        try {
            const provider = context.provider;
            const signer = context.signer;
            const contract = context.contract;

            if (provider && signer && contract) {
                const contractWithSigner = contract.connect(signer);

                let tx = undefined;
                if (approve) {
                    await contractWithSigner.callStatic.markStakeSuccessful(id);
                    tx = await contractWithSigner.markStakeSuccessful(id);
                } else {
                    await contractWithSigner.callStatic.markStakeFailed(id);
                    tx = await contractWithSigner.markStakeFailed(id);
                }
                await tx.wait();
                setLoading(false);
            }
        } catch (ex: unknown) {
            setLoading(false);
            if (isEthersError(ex)) {
                const regex = /'(.*?)'/g;
                const matches = regex.exec(ex.data.message);
                if (matches) {
                    toast.error(`Error: ${matches[1]}`);
                    return Promise.reject(ex);
                }
            }
            toast.error(`Error occurred trying to mark stake as ${approve ? "successful" : "failed"}`);
            return Promise.reject(ex);
        }
    };

    const colorBasedOnState = data.status === 1 ? "#5eda6085" : data.status === 2 ? "#fd3f0285" : "white";
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
                    <p className="text-xl font-bold w-full text-left">{data.name}</p>
                    <div className="py-1"></div>
                    <p className="text-s w-full text-left">Stakee</p>
                    <p style={{ opacity: 0.5 }}>{data.stakee}</p>
                    <p className="text-s w-full text-left">Buddy</p>
                    <p style={{ opacity: 0.5 }}>{data.accountabilityBuddy}</p>
                    <p className="text-s w-full text-left">Amount Staked</p>
                    <p style={{ opacity: 0.5 }}>{(data.amountStaked / oneEtherInWei).toString()} ETH</p>
                    <div className="w-full flex flex-col items-center justify-center m-0 p-0">
                        {loading ? (
                            <div className="p-4">
                                <Spinner />
                            </div>
                        ) : data.status === 0 ? (
                            <>
                                <Button
                                    majorColor={"#5eda6085"}
                                    hoverColor={"#5eda60"}
                                    disabled={false}
                                    onClick={() => attemptApproveOrFail(true)}
                                >
                                    ✓
                                </Button>
                                <Button
                                    majorColor={"#fd3f0285"}
                                    hoverColor={"#fd4102"}
                                    disabled={false}
                                    onClick={() => attemptApproveOrFail(false)}
                                >
                                    ✗
                                </Button>
                            </>
                        ) : data.status === 1 ? (
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xl font-bold">✓</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xl font-bold">✘</p>
                            </div>
                        )}
                    </div>
                    <Toaster />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StakePage;
