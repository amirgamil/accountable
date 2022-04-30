import Link from "next/link";
import router from "next/router";
import * as React from "react";
import styled from "styled-components";
import { useAppContext } from "./context";
import styles from "../styles/Home.module.css";

const Container = styled.div`
    button:hover {
        opacity: 0.8;
    }
`;

export const Nav = () => {
    const context = useAppContext();

    const goHome = () => {
        router.push("/");
    };

    return (
        <div className={`relative opacity-80 w-full z-40 ${styles.window}`}>
            <div className="relative w-full pt-8 h-26 flex text-white">
                <div className="ml-auto my-auto mr-16">
                    <Container>
                        {context.address && (
                            <>
                                <Link
                                    href={
                                        "https://optimistic.etherscan.io/address/0xc9bbf44dF249cb75970EF789AB772Ed58Ba33FD3"
                                    }
                                >
                                    <button
                                        style={{
                                            background: "white",
                                            padding: "10px",
                                            borderRadius: "12px",
                                            margin: "0 10px 10px 10px",
                                        }}
                                        className="button secondary mr-4"
                                    >
                                        Contract
                                    </button>
                                </Link>
                                <Link href={`/find`}>
                                    <button
                                        style={{
                                            background: "white",
                                            padding: "10px",
                                            borderRadius: "12px",
                                            margin: "0 10px 10px 10px",
                                        }}
                                        className="button secondary mr-4"
                                    >
                                        Find
                                    </button>
                                </Link>
                                <Link href={`/`}>
                                    <button
                                        style={{
                                            background: "white",
                                            padding: "10px",
                                            borderRadius: "12px",
                                            margin: "0 10px 10px 10px",
                                        }}
                                        className="button secondary mr-4"
                                    >
                                        Stake
                                    </button>
                                </Link>
                                <Link href={`/faq`}>
                                    <button
                                        style={{
                                            background: "white",
                                            padding: "10px",
                                            borderRadius: "12px",
                                            margin: "0 10px 10px 10px",
                                        }}
                                        className="button secondary mr-4"
                                    >
                                        FAQ
                                    </button>
                                </Link>
                                <button
                                    style={{
                                        background: "white",
                                        padding: "10px",
                                        borderRadius: "12px",
                                        margin: "0 10px 10px 10px",
                                    }}
                                    className="my-auto cursor-pointer secondary mr-4"
                                    onClick={context.signOut}
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                        <button
                            style={{ background: "white", padding: "10px", borderRadius: "12px" }}
                            className="cursor-pointer"
                            onClick={() => {
                                if (context.address) {
                                    goHome();
                                } else {
                                    context.loadWeb3Modal();
                                }
                            }}
                        >
                            {context.address ? `${context.address.slice(0, 8).toLowerCase()}...` : "Connect Wallet"}
                        </button>
                    </Container>
                </div>
            </div>
        </div>
    );
};
