import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../components/button";
import { StyledInput } from "../components/input";

const Home: NextPage = () => {
    const [accBuddyAddress, setAccBuddyAdddress] = React.useState<string>("");
    const [amountStaked, setAmountStaked] = React.useState<string>("");

    const setAmountStakedHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (amountStaked === "") {
            setAmountStaked("$ " + evt.target.value);
        } else if (evt.target.value === "$ ") {
            setAmountStaked("");
        } else {
            setAmountStaked(evt.target.value);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Thalia</title>
                <meta name="description" content="On-chain music composition" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />
            <main className={styles.main}>
                <div className={styles.center}>
                    <p className="text-xl">Keep me accountable</p>
                    <div className="py-1"></div>
                    <p className="text-s">
                        <i>Put your money where your mouth is. Literally.</i>
                    </p>
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
                                placeholder="$ Amount staked"
                                value={amountStaked}
                                onChange={(evt) => setAmountStakedHandler(evt)}
                            />
                        </div>
                    </div>
                    {amountStaked && (
                        <>
                            <div className="py-4"></div>
                            <p>
                                Note you will get the same amount of ether (as calculted from the $ amount back) minus a
                                very small amount that will be lost due to gas fees (less than $0.01){" "}
                            </p>{" "}
                        </>
                    )}
                    <div className="w-full flex flex-col items-center justify-center p-0">
                        <Button
                            disabled={amountStaked === "" || accBuddyAddress === ""}
                            onClick={(evt) => console.log(evt)}
                        >
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
