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

const Home: NextPage = () => {
    const [accBuddyAddress, setAccBuddyAdddress] = React.useState<string>("");
    const [amountStaked, setAmountStaked] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
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

    const createNewStake = async () => {
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
                    console.log(tx);
                    toast.success(`Transaction sent: ${tx.hash}`);
                }
            } catch (ex: unknown) {
                if (isEthersError(ex)) {
                    const regex = /'(.*?)'/g;
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
    };

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
                    <p className="text-xl font-semibold">Keep me accountable</p>
                    <div className="py-1"></div>
                    <p className="text-s">Put your money where your mouth is. Literally.</p>
                    <div className="py-4"></div>
                    <div>
                        <div className="flex flex-col">
                            <StyledInput
                                placeholder="Accountability Buddy Address"
                                value={accBuddyAddress}
                                onChange={(evt) => setAccBuddyAdddress(evt.target.value)}
                            />
                        </div>
                        <div className="py-4"></div>
                        <div className="flex flex-col">
                            <StyledInput
                                className="py-2 px-4"
                                placeholder="Ether Amount staked e.g. 0.01"
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
                    </div>
                    <div className="py-4"></div>
                    <div className="w-full flex flex-col items-center justify-center p-0">
                        <Button disabled={amountStaked === "" || accBuddyAddress === ""} onClick={createNewStake}>
                            Stake
                        </Button>
                    </div>
                    <Toaster />
                </div>
                <Footer />
            </main>
        </div>
    );
};

export default Home;
