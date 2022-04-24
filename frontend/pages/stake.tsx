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
import { cloneDeep } from "lodash";
import { mapArrToStake, Stake } from "../lib/contractHelpers";
import { Spinner } from "../components/spinner";
import { CHAIN_EXPLORER } from "../lib/defaults";

interface NotesRecord {
    oldNotes: string;
    //currentNotes is oldNotes + whatever is added
    currentNotes: string;
}

const StakePage: NextPage = () => {
    const context = useAppContext();
    const router = useRouter();
    const { id } = router.query;

    const contractExists = context.contract !== undefined;

    const [writeTxHash, setWriteTxHash] = React.useState<string | undefined>(undefined);

    const { isLoading, error, data } = useQuery<Stake | undefined>(
        "stake",
        async () => {
            if (context.contract && id !== undefined) {
                const dataResult = await context.contract.getStakeFromId(id);
                //return a tuple with all of the struct elements
                const result = mapArrToStake(dataResult);
                return result;
            }
        },
        { retry: 10, enabled: contractExists }
    );
    console.log(isLoading, error, data);

    const [isUpdating, setIsUpdating] = React.useState<boolean>(false);

    if (error) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="opacity-50">A stake is waiting to be created here...</p>
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
                    <div className="w-full h-full flex items-center justify-center">
                        <Spinner />
                    </div>
                    <Footer />
                </main>
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
                <div className="py-4">
                    <h1 className="text-xl font-bold">{data.name}</h1>
                    <h3>BPM: {data.bpm}</h3>
                </div>
                <Toaster />
                <Footer />
            </main>
        </div>
    );
};

export default StakePage;
