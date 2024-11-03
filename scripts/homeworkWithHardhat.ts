//run: npx hardhat run ./scripts/deployWithHardhat.ts —network sepolia

import { viem } from "hardhat";
import { toHex, hexToString, formatEther } from "viem";

const BALLOT_ADDRESS = "0x04dea53a54647970a8de4f5fdbe37aa3b359c119";

const voterAddress = "0xacda2681a01964a092349dbAb4C959B583F2b680";
const voterAddress2 = "0xcbB0681509818f4c9345c0Aca85b7DFB427cc3bD"

async function giveRightToVote(
  ballotContract: any, 
  voterAddress: string
) {
  const tx = await ballotContract.write.giveRightToVote([voterAddress]);
  const publicClient = await viem.getPublicClient();
  const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
  console.log(`Given voting rights to ${voterAddress}, tx: ${tx}`);
  return receipt;
}

async function vote(
  ballotContract: any, 
  proposalIndex: number
) {
  const tx = await ballotContract.write.vote([BigInt(proposalIndex)]);
  const publicClient = await viem.getPublicClient();
  const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
  console.log(`Voted for proposal ${proposalIndex}, tx: ${tx}`);
  return receipt;
}

async function delegate(
  ballotContract: any, 
  delegateAddress: string
) {
  const tx = await ballotContract.write.delegate([delegateAddress]);
  const publicClient = await viem.getPublicClient();
  const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
  console.log(`Delegated vote to ${delegateAddress}, tx: ${tx}`);
  return receipt;
}

async function getWinner(ballotContract: any) {
  const winningProposal = await ballotContract.read.winningProposal();
  const winnerName = await ballotContract.read.winnerName();
  console.log("Winning proposal:", winningProposal, "Winner is:", hexToString(winnerName, { size: 32 }))
}

async function main() {
  const ballotContract = await viem.getContractAt("Ballot", BALLOT_ADDRESS);
  console.log("my contract is at:", ballotContract.address);

  // await giveRightToVote(ballotContract, voterAddress);
  // await vote(ballotContract, 0);
  // await delegate(ballotContract, voterAddress2);
  await getWinner(ballotContract);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});





