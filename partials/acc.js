require('dotenv').config();

const Web3 = require('web3');

const web3 = new Web3();

const prv = process.env.ALFAJORES_PRIVATE_KEY;

const celoAccount = web3.eth.accounts.privateKeyToAccount(prv);

module.exports = {
   celoAccount
};