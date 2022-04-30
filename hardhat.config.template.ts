import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

//My hardhat file for deployment minus secrets :)
const OPTIMISM_KOVAN_ALCHEMY_API_KEY = "";
const OPTIMISM_ALCHEMY_API_KEY = "";

const KOVAN_PRIVATE_KEY = "";
const OPTIMISM_PRIVATE_KEY = "";
const ETHER_SCAN_KEY = "";

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.11",
    },
    namedAccounts: {
        deployer: 0,
    },
    paths: {
        sources: "./contracts",
    },
    networks: {
        // kovan: {
        //     url: `https://opt-kovan.g.alchemy.com/v2/${OPTIMISM_KOVAN_ALCHEMY_API_KEY}`,
        //     accounts: [`${KOVAN_PRIVATE_KEY}`],
        // },
        optimism: {
            url: `https://opt-mainnet.g.alchemy.com/v2/${OPTIMISM_ALCHEMY_API_KEY}`,
            accounts: [`${OPTIMISM_PRIVATE_KEY}`],
        },
    },
    etherscan: {
        apiKey: ETHER_SCAN_KEY,
    },
};
export default config;
