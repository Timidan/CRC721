// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { abi, bytecode } from '../artifacts/contracts/CRC721.sol/CRC721.json'
import { Conflux } from 'js-conflux-sdk'

const mainnet = ' https://main.confluxrpc.com'
const testnet = 'https://test.confluxrpc.com'
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled

  //initialize conflux testnet instance
  const cfx = new Conflux({
    url: testnet,
    networkId: 1,
    logger: console,
  })

  //initialize wallet to send testnet transactions from
  const acct = cfx.wallet.addPrivateKey(process.env.CFX_PRIV ?? '')
  const globalURI =
    'https://ipfs.io/ipfs/Qmde5h3WiQkz4jefTX2KXVaG5abjfM4kmkKidmeXGh214E?filename=metadata.json'
  // We get the contract to deploy
  const contract = cfx.Contract({ abi, bytecode })

  //deploy contract
  const txReceipt = await contract
    .constructor(globalURI)
    .sendTransaction({ from: acct })
    .executed()
  console.log('contract creation txn', txReceipt.transactionHash)
  console.log('NFT contract address', txReceipt.contractCreated)

  //minting an NFT
  //get deployed contract instance
  const nftContract = cfx.Contract({ abi, address: txReceipt.contractCreated })

  //call the mint function
  const tx = await nftContract
    //@ts-ignore
    .mintToken(acct.toString())
    .sendTransaction({ from: acct.toString() })
  console.log('minted an NFT to', acct.toString(), 'in txn ', tx)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
