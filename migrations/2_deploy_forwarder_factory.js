const ForwarderFactory = artifacts.require("ForwarderFactory");

module.exports = function (deployer, network, accounts) {
   deployer.deploy(ForwarderFactory);
};