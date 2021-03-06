import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../components/button";
import { StyledInput } from "../components/input";
import { AppContext } from "../components/context";
import { ethers } from "ethers";
import { isEthersError } from "../lib/types";
import { CHAIN_EXPLORER } from "../lib/defaults";
import Link from "next/link";
import { Spinner } from "../components/spinner";

const Home: NextPage = () => {
    const [accBuddyAddress, setAccBuddyAdddress] = React.useState<string>("");
    const [amountStaked, setAmountStaked] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [successId, setSuccessId] = React.useState<string | undefined>(undefined);
    const context = React.useContext(AppContext);

    const setAmountStakedHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (amountStaked === "") {
            setAmountStaked("Ξ " + evt.target.value);
        } else if (evt.target.value === "Ξ ") {
            setAmountStaked("");
        } else {
            setAmountStaked(evt.target.value);
        }
    };

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

    const createNewStake = React.useCallback(async () => {
        setLoading(true);
        if (accBuddyAddress === "" || amountStaked === "") {
            toast.error("Please fill in all fields");
        } else {
            try {
                const provider = context.provider;
                const signer = context.signer;
                const contract = context.contract;
                if (provider && signer && contract) {
                    const overrides = {
                        // To convert Ether to Wei:
                        value: ethers.utils.parseEther(amountStaked.replace("Ξ ", "")), // ether in this case MUST be a string
                    };

                    const contractWithSigner = contract.connect(signer);

                    await contractWithSigner.callStatic.createNewStake(name, accBuddyAddress, overrides);
                    const tx = await contractWithSigner.createNewStake(name, accBuddyAddress, overrides);

                    broadcastTransaction(tx.hash);

                    console.log(loading);
                    const res = await tx.wait();
                    console.log(loading);
                    const event = res.events.find(
                        (evt: any) => evt.transactionHash === tx.hash && evt.args[0] === name
                    );

                    if (!event) {
                        throw new Error("Unexpected error occurred");
                    }

                    setLoading(false);
                    setSuccessId(`${event.args[1].toString()}`);
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
                toast.error("Something unexpected went wrong!");
                return Promise.reject(ex);
            }
        }
    }, [accBuddyAddress, amountStaked, context.contract, context.provider, context.signer, name]);

    const areFieldsFilled = accBuddyAddress && amountStaked;
    return (
        <div className={styles.container}>
            <Head>
                <title>Accountable</title>
                <meta name="description" content="Keep me accountable by staking my money" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />
            <main className={styles.main}>
                <div className={styles.center}>
                    <div className={styles.mobileNotifier}>
                        Unfortunately, this is not available on mobile, please try it on a laptop! Feel free to read the{" "}
                        <Link href="/faq">FAQ</Link> while you&apos;re here
                    </div>
                    {!successId ? (
                        <div className={styles.window}>
                            <p className="text-xl font-semibold">Keep me accountable</p>
                            <div className="py-1"></div>
                            <p className="text-s">Stay accountable by putting your money on the line. Literally.</p>
                            <div className="py-4"></div>
                            <div>
                                {loading ? (
                                    <div className="w-full flex flex-col items-center justify-center m-0 p-0">
                                        <div className="p-4">
                                            <Spinner />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col">
                                            <StyledInput
                                                placeholder="Accountability buddy address (not ENS)"
                                                value={accBuddyAddress}
                                                onChange={(evt) => setAccBuddyAdddress(evt.target.value)}
                                            />
                                        </div>
                                        <div className="py-4"></div>
                                        <div className="flex flex-col">
                                            <StyledInput
                                                className="py-2 px-4"
                                                placeholder="Ether amount staked e.g. 0.01"
                                                value={amountStaked}
                                                onChange={(evt) => setAmountStakedHandler(evt)}
                                            />
                                        </div>
                                        <div className="py-4"></div>
                                        <div className="flex flex-col">
                                            <StyledInput
                                                className="py-2 px-4"
                                                placeholder="Name of task e.g. finish this project"
                                                value={name}
                                                onChange={(evt) => setName(evt.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="py-4"></div>
                            <div className="w-full flex flex-col items-center justify-center p-0">
                                <Button
                                    disabled={amountStaked === "" || accBuddyAddress === ""}
                                    majorColor={areFieldsFilled ? "rgb(235, 179, 235)" : undefined}
                                    hoverColor={areFieldsFilled ? "rgb(228, 204, 228)" : undefined}
                                    textColor={"white"}
                                    onClick={createNewStake}
                                >
                                    Stake
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center p-0">
                            <p className="text-xl font-semibold">Success!</p>
                            <p>
                                Your stake&apos;s ID is <strong>{successId}</strong> and will live{" "}
                                <a href={`/stake?id=${successId}`}>here</a>. Save the link or remember the ID.
                                <br></br>
                                <br></br>
                                Your accountability buddy will be able to confirm the stake, then mark the task as a
                                success or a failure there. If you incorrectly typed your buddy&apos;s address, you can
                                quickly withdraw your money back before they confirm it by aborting the stake.
                                <br></br>
                                <br></br>
                                If it looks correct, have your buddy confirm the stake to lock your money in the
                                contract until you complete/fail the agreed on task.
                            </p>
                        </div>
                    )}
                    <Toaster />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
