import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Question } from "../components/question";
import Link from "next/link";

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
                        <p className="text-s">Stay accountable by putting your money on the line. Literally.</p>
                        <div className="py-4"></div>
                        <Question
                            question={"WTF is this?"}
                            answer={
                                <>
                                    This is a tool that keeps you accountable by putting your money on the line. You
                                    pick an accountability partner, <strong>someone who you trust</strong> and deposit
                                    some money into the contract (or &quot;stake it&quot;). This locks your money in the
                                    contract.
                                    <br></br>
                                    <br></br>
                                    If you successfully complete the agreed upon task (by agreed on date), your
                                    accountability partner marks the task as successful and you get your money back.
                                    <br></br>
                                    <br></br>
                                    If you fail, they mark it as failed and your money gets{" "}
                                    <strong>
                                        donated directly to{" "}
                                        <Link href="https://www.khanacademy.org/">Khan Academy</Link>.
                                    </strong>{" "}
                                    In other words, the tool is a forcing function to get something done and keep you
                                    accountable by <strong>actually putting money on the line</strong>.<br></br>
                                    <br></br>
                                    Only the accountability parter can mark the task as successful or not at{" "}
                                    <p className="underline">keepmeaccountable.xyz/stake?id=[stake id]</p>
                                    <br></br>
                                    Because of this, the accountability partner{" "}
                                    <strong>should be someone who you trust</strong>. Fortunately, there is no incentive
                                    for an accountability buddy to be dishonest.
                                </>
                            }
                        />
                        <div className="py-4"></div>
                        <Question
                            question={"How do I use it?"}
                            answer={
                                <>
                                    If you want to create a stake to stay accountable: <br></br>
                                    1. navigate to <Link href="/">home page</Link> <br></br>
                                    2. enter your accountability buddy address (who you trust), a name, and the amount
                                    to stake <br></br>
                                    3. click &quot;stake&quot; <br></br>
                                    4. wait for the stake to be processed and the stake id to be generated <br></br>
                                    5. navigate to
                                    <p className="underline">keepmeaccountable.xyz/stake?id=[stake id]</p> If you
                                    entered the wrong buddy address, you can recover your deposited funds by aborting
                                    stake. Otherwise, have your budy <strong>confirm</strong> to lock your money in the
                                    contract. <strong>You the stakee will not be able to recover the funds now.</strong>{" "}
                                    <br></br>
                                    6. upon completion or failure, the accountability buddy will mark the task as
                                    successful (✓) or failed (✗) to return your money or donate the money respectively.
                                </>
                            }
                        />

                        <div className="py-4"></div>
                        <Question
                            question={"Do I have to pay anything to use this tool?"}
                            answer={
                                <>
                                    This tool is completely free to use minus gas fees.
                                    <br></br>
                                    <br></br>
                                    You the stakee pay gas fees to create a new stake and the accountability partner
                                    pays gas to confirm the stake and mark a stake as failed or successful. If you abort
                                    the stake before it&apos;s confirmed, you (the stakee) also have to pay gas.
                                    <br></br>
                                    <br></br>
                                    Since the tool is deployed on <a href="https://www.optimism.io/">Optimism</a> (an L2
                                    Rollup on Ethereum), gas fees should be very low (less than $0.001) but that is the
                                    price of real accountability :)
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
