//run: npx ts-node --files ./scripts/DeployWithViem.ts "arg1" "arg2" "arg3"

import {
  createPublicClient,
  http,
  createWalletClient,
  formatEther,
  toHex, hexToString
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

// when we compile with Hardhat, we get these artifacts
import {abi, bytecode} from "../artifacts/contracts/Ballot.sol/Ballot.json"

import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

console.log(deployerPrivateKey)

async function main() {
  //parse command line arguments
  const proposals = process.argv.slice(2);
  if (!proposals || proposals.length < 1)
    throw new Error("Proposals not provided");

  // create a public client for sepolia
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });
  const blockNumber = await publicClient.getBlockNumber();
  console.log("Last block number:", blockNumber);

  // create a client for my test account private key
  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const deployer = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });
  console.log("Deployer address:", deployer.account.address);
  const balance = await publicClient.getBalance({
    address: deployer.account.address,
  });
  console.log(
    "Deployer balance:",
    formatEther(balance),
    deployer.chain.nativeCurrency.symbol
  );



  // DEPLOY CONTRACT
  console.log("\nDeploying Ballot contract");
  const hash = await deployer.deployContract({
    abi,
    bytecode: bytecode as `0x${string}`,
    args: [proposals.map((p) => toHex(p, { size: 32 }))]
  });
  console.log("TX hash:", hash);
  console.log("Waiting for confirmation...");
  const receipt = await publicClient.waitForTransactionReceipt({
    hash
  })
  console.log("Ballot contract deployed to:", receipt.contractAddress);
  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
