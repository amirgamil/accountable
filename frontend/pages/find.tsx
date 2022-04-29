import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { useAppContext } from "../components/context";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { mapArrToStake, Stake } from "../lib/contractHelpers";
import { Spinner } from "../components/spinner";
import { StyledInput } from "../components/input";
import { StakeField } from "../components/stakeField";

const StakePage: NextPage = () => {
    const context = useAppContext();

    const contractExists = context.contract !== undefined;

    const [searchResult, setSearchResult] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const { isLoading, error, data } = useQuery<Stake[] | undefined>(
        "stakeList",
        async () => {
            if (context.contract) {
                const dataResult = await context.contract.getAllStakes();
                return dataResult.map((el: any[]) => mapArrToStake(el));
            }
        },
        { retry: 1, enabled: contractExists }
    );

    if (error) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className="w-full grow h-full flex items-center justify-center">
                        <p className="opacity-50">Uh oh, an error occurred!</p>
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
                    <div className="w-full grow h-full flex items-center justify-center">
                        <Spinner />
                    </div>
                    <Footer />
                </main>
            </div>
        );
    }

    const filteredResults = data?.filter((el) => {
        if (searchResult.startsWith("stakee:")) {
            return el.stakee.includes(searchResult.replace("stakee:", "").trim());
        } else if (searchResult.startsWith("buddy:")) {
            return el.accountabilityBuddy.includes(searchResult.replace("buddy:", "").trim());
        } else {
            let result = searchResult;
            if (result.startsWith("name:")) {
                result = result.replace("name:", "").trim();
            }
            return el.name.includes(result);
        }
    });
    return (
        <div className={styles.container}>
            <Head>
                <title>Accountable</title>
                <meta name="description" content="On-chain music composition" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />
            <main className={styles.main}>
                <div style={{ background: "white" }} className={styles.center}>
                    <StyledInput
                        className="w-full"
                        placeholder="Filter by name, stakee, or buddy"
                        value={searchResult}
                        onChange={(evt) => setSearchResult(evt.target.value)}
                    />
                    {!searchResult && (
                        <>
                            <div className="py-3"></div>
                            <p>
                                To filter by name, just enter the name. To filter by stakee, type{" "}
                                <strong>stakee:[addr]</strong> and by buddy, <strong>buddy: [addr]</strong>
                            </p>
                        </>
                    )}
                    {filteredResults?.map((el, i) => (
                        <StakeField
                            key={i}
                            name={el.name}
                            id={el.id}
                            accountabilityBuddy={el.accountabilityBuddy}
                            stakeeAddress={el.stakee}
                        />
                    ))}
                    <Toaster />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StakePage;
