# Week 2 homework

Deployer address: 0x5af844dc7e25d782ee5a6a66bb7f8f737bbabbe6

**Using Hardhat:**
Ballot contract deployed to: [0x04dea53a54647970a8de4f5fdbe37aa3b359c119](https://sepolia.etherscan.io/address/0x04dea53a54647970a8de4f5fdbe37aa3b359c119)

**1. Give voting rights:**

- I gave voting rights to 0xacda2681a01964a092349dbAb4C959B583F2b680
  using this code to write to giveRightToVote:

```javascript
async function giveRightToVote(
  ballotContract: any, 
  voterAddress: string
) {
  const tx = await ballotContract.write.giveRightToVote([voterAddress]);
  const publicClient = await viem.getPublicClient();
  const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
  console.log(`Given voting rights to ${voterAddress}, tx: ${tx}`);
}
```

tx: [https://sepolia.etherscan.io/tx/0x2af7b485ddd0cc9726bacec95adb12251bc938524b1efe026c4c163ae03c02b4](https://sepolia.etherscan.io/tx/0x2af7b485ddd0cc9726bacec95adb12251bc938524b1efe026c4c163ae03c02b4)

**2. Cast votes:**

- voted for the first (index 0) proposal

```javascript
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
```

tx: [https://sepolia.etherscan.io/tx/0x91e1b28721e41c53836b12870ddfe002d46173a7786bcc9220656b8518579638](https://sepolia.etherscan.io/tx/0x91e1b28721e41c53836b12870ddfe002d46173a7786bcc9220656b8518579638)

**3. Delegate votes:**

- I tried delegating my vote from the deployer address (above), but the tx reverted because I already voted.

**4. Query results:**

- to read get the winner, i called 2 functions of the smart contract:

```javascript
async function getWinner(ballotContract: any) {
  const winningProposal = await ballotContract.read.winningProposal();
  const winnerName = await ballotContract.read.winnerName();
  console.log("Winning proposal:", winningProposal, "Winner is:", hexToString(winnerName, { size: 32 }))
}
```

Winning proposal was the first one: Proposal 1

**Using Viem:**
Ballot contract deployed to: [0x956e987d1b8b13def12646c3aacbeeb9d6a06d57](https://sepolia.etherscan.io/address/0x956e987d1b8b13def12646c3aacbeeb9d6a06d57)

- I still need to do the same excercise using just Viem
