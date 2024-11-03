import { expect } from "chai";
import { toHex, hexToString } from "viem";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function deployContract() {
  // TODO
}

describe("Ballot", async () => {
  // deploy contract as a fixture
  async function deployContract() {

    const publicClient = await viem.getPublicClient();   // public client
    const [deployer, otherAccount] = await viem.getWalletClients();      //first 2 test addresses to variables
    
    // Deploy the contract
    const ballotContract = await viem.deployContract("Ballot", 
      // ballot contract expects an array of bytes32 => [PROPOSALS] needs to be converted
      [PROPOSALS.map((p) => toHex(p, {size: 32}))])

    return { publicClient, deployer, otherAccount, ballotContract };
  }
  
  describe("when the contract is deployed", async () => {
    
    it("has the provided proposals", async () => {
      const {ballotContract} = await loadFixture(deployContract);

      // check propoals one by one, if they match in contract and here in PROPOSALS
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.read.proposals([BigInt(i)]);
        expect( hexToString(proposal[0], {size: 32}) ).to.equal( PROPOSALS[i] );
      }
    });

    it("has zero votes for all proposals", async () => {
      const {ballotContract} = await loadFixture(deployContract);

      // check propoals one by one, if they match in contract and here in PROPOSALS
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.read.proposals([BigInt(i)]);
        expect( proposal[1] ).to.equal( 0n );  // 0n means zero as BigInt. 
      }
    });

    it("sets the deployer address as chairperson", async () => {
      const {ballotContract} = await loadFixture(deployContract);

      const chairperson = await ballotContract.read.chairperson();
      const deployer = await viem.getWalletClients();
      expect(chairperson.toLowerCase()).to.equal(deployer[0].account.address);  
    });

    it("sets the voting weight for the chairperson as 1", async () => {
      const {ballotContract} = await loadFixture(deployContract);

      const chairperson = await ballotContract.read.chairperson();
      const chairpersonVoter = await ballotContract.read.voters([chairperson]);
      expect(chairpersonVoter[0]).to.equal(1n);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("gives right to vote for another address", async () => {
      // TODO
      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has voted", async () => {
      // TODO
      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has already voting rights", async () => {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when the voter interacts with the vote function in the contract", async () => {
    // TODO
    it("should register the vote", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the voter interacts with the delegate function in the contract", async () => {
    // TODO
    it("should transfer voting power", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the vote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the delegate function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function before any votes are cast", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function before any votes are cast", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
    // TODO
    it("should return the name of the winner proposal", async () => {
      throw Error("Not implemented");
    });
  });
});