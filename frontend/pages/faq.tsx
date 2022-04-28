import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Question } from "../components/question";

const Home: NextPage = () => {
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
                    <div>
                        <p className="text-xl font-semibold">Keep me accountable</p>
                        <div className="py-1"></div>
                        <p className="text-s">Put your money where your mouth is. Literally.</p>
                        <div className="py-4"></div>
                        <Question
                            question={"WTF is this?"}
                            answer={
                                <>
                                    This is a tool that keeps you accountable by putting your money where your mouth is.
                                    You pick an accountability partner, <strong>someone who you trust</strong> and
                                    deposit some money into the contract (or "stake it"). This locks your money in the
                                    contract.
                                    <br></br>
                                    <br></br>
                                    If you successfully complete the agreed upon task, your accountability partner marks
                                    the task as successful and you get your money back.
                                    <br></br>
                                    <br></br>
                                    If you fail, they mark it as failed and the accountability partner gets your money.
                                    In other words, the tool is a forcing function to get something done and keep you
                                    accountable by <strong>actually putting money on the line</strong>.<br></br>
                                    <br></br>
                                    Only the accountability parter can mark the task as successful or not at{" "}
                                    <p className="underline">keepmeaccountable.xyz/stake?id=[stake id]</p>
                                    <br></br>
                                    Because of this, the accountability partner{" "}
                                    <strong>must be someone who you trust</strong> and will not maliciously take your
                                    money.
                                </>
                            }
                        />

                        <div className="py-4"></div>
                        <Question
                            question={"Do I have to pay anything to use this tool?"}
                            answer={
                                <>
                                    This tool is completely free to use minus gas fees. You the stakee pay gas fees to
                                    create a new stake and the accountability partner pays gas to mark a stake as failed
                                    or successful. Since the tool is deployed on{" "}
                                    <a href="https://www.optimism.io/">Optimism</a> (an L2 Rollup on Ethereum), gas fees
                                    should be very low (less than $0.01) but that is the price of real accountability :)
                                </>
                            }
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
