require('dotenv').config();

const { celoTestnetKit } = require('./celo');

module.exports = {
   celoTestnetProvider: celoTestnetKit.connection.web3.currentProvider,
}