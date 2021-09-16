const Web3 = require('web3');
const Account = require('./acc');
const ContractKit = require('@celo/contractkit');

const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const celoTestnetKit = ContractKit.newKitFromWeb3(web3);

celoTestnetKit.connection.addAccount(Account.celoAccount.privateKey);

module.exports = {
   celoTestnetKit
};