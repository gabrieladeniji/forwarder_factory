require('dotenv').config();
const Web3 = require('web3');

const { newKitFromWeb3 } = require('@celo/contractkit');
const kit = newKitFromWeb3(new Web3('https://alfajores-forno.celo-testnet.org'));


const abi = [
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": false,
            "internalType": "address",
            "name": "_address",
            "type": "address"
         },
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "_salt",
            "type": "uint256"
         }
      ],
      "name": "Deployed",
      "type": "event"
   },
   {
      "inputs": [
         {
            "internalType": "address",
            "name": "destination",
            "type": "address"
         },
         {
            "internalType": "uint256",
            "name": "_salt",
            "type": "uint256"
         }
      ],
      "name": "getComputedAddress",
      "outputs": [
         {
            "internalType": "address",
            "name": "",
            "type": "address"
         }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
   },
   {
      "inputs": [
         {
            "internalType": "address payable",
            "name": "destination",
            "type": "address"
         },
         {
            "internalType": "uint256",
            "name": "_salt",
            "type": "uint256"
         }
      ],
      "name": "initForwarder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
   }
];
const dst1 = '0x55579425171edC37da00D2930870873D0eeBCB02';
// const dst2 = '0x0D572D6624852834894f529E93D3d35545e5FE48';
const contractAddress = '0x34802C875c59E687F657dF1555d67bF442c9460A';

kit.connection.addAccount(process.env.ALFAJORES_PRIVATE_KEY);
const account = kit.web3.eth.accounts.privateKeyToAccount(process.env.ALFAJORES_PRIVATE_KEY);
const contract = new kit.web3.eth.Contract(abi, contractAddress, {from: account.address});

// salt
const salt = 1;

// Compute Address
contract.methods.getComputedAddress(dst1, salt).call().then((response) => {
   console.log(response);
});

// Init Contract
contract.methods.initForwarder(dst1, salt).send().on('receipt', function (receipt) {
   console.log('receipt', receipt.events);
});
