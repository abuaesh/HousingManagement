require('dotenv').config({path: './.env'})
const HDWalletProvider = require('truffle-hdwallet-provider')
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const PK = process.env.PK
const INFURA_KEY = process.env.INFURA_KEY
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK
const NUM_CREATURES = 10
const NUM_LOOTBOXES = 4
const DEFAULT_OPTION_ID = 0
const LOOTBOX_OPTION_ID = 2

const FACTORY_ABI = //require('./eth-contracts/build/contracts/ERC721MintableComplete.json')
[
    {
        "constant": false,
        "inputs": [
          {
            "name": "Id",
            "type": "uint256"
          },
          {
            "name": "To",
            "type": "address"
          }
        ],
        "name": "mintTokens",
        "outputs": [
          {
            "name": "result",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
  ]

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    'Please set a mnemonic, infura key, owner, network, and contract address.'
  )
  return
}

async function main() {
  const network =
    NETWORK === 'mainnet' || NETWORK === 'live' ? 'mainnet' : 'rinkeby'

  const provider = new HDWalletProvider(
    PK,
    `https://${network}.infura.io/v3/${INFURA_KEY}`
  )
  const web3Instance = new web3(provider)

  if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: '1000000' }
    )

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await factoryContract.methods
        //.mint(i, a, b, c, input)
        .mintTokens(i, 
            [
                "0x205ca53cc56cad4d91d92f93e0d28c33044b9b078a148d4d0284ee0f6ec7b5a3",
                "0x2ec3490c548829fa5334ff17d46f5258c5015b59ca6ec1e69cc65224259227a3"
            ],
            [
                [
                "0x2e80216386aa3fe4989a9de6d4f4d7061311d2b7899a9c8c813cbcd625c2a8ee",
                "0x02ae19ddf170a2f3f4e62e824e098b56f143a91df92d5d6a6189df94424e33ea"
                ],
                [
                "0x174868e3b26e30b47da50ee75b4fccec0683e8f9dc5ad0200d5636ef2269c0cf",
                "0x2007f6ea523ee22a69318488073a445ae693941d721e6e0b8e02e96a1b8f7a9a"
                ]
            ],
            [
                "0x2e07ca4a2c990d9d40326e422fb558b9689da00e26e63135dffcba093e81a774",
                "0x2584544bfb8db79fc5813a137feff62f024dee157de7f8b22cba2153b774fcf3"
            ],
            [
                "0x0000000000000000000000000000000000000000000000000000000000000001"
            ])
        .send({ from: OWNER_ADDRESS })
      console.log('Minted creature. Transaction: ' + result.transactionHash)
    }
/*
    // Lootboxes issued directly to the owner.
    for (var i = 0; i < NUM_LOOTBOXES; i++) {
      const result = await factoryContract.methods
        .mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS })
      console.log('Minted lootbox. Transaction: ' + result.transactionHash)
    } */
  } else {
    console.error(
      'Add FACTORY_CONTRACT_ADDRESS to the environment variables'
    )
  }
}

main()