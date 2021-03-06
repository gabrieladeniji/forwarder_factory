# A solidity smart contract to process celo, cUSD, and cEUR payment at scale

## Forwarder Factory + Create2 with Truffle

`Forwarder`: Create a smart contracts that can accept funds as if they 
were ordinary accounts, with the sole functionality of forwarding the 
accepted funds to a fixed, predetermined address.

`Factory`: factory pattern significantly helps reduce the cost of these 
transactions. Instead of encoding the same logic multiple times when deploying 
a new Forwarder, we can deploy a single ForwarderFactory that knows how to 
instantiate new Forwarders.

`Create2`: Predict what a smart contract address will be without deploying 
the smart contract.


Commands
> truffle compile
> 
> truffle console --network alfajores
> 
> migrate --reset
> 
> salt = 1
> 
> instance = await ForwarderFactory.deployed();
>
> celo_euro_contract = '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F'
> 
> celo_dollar_contract = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'
> 
> flushFundToThisAddress = '0x55579425171edC37da00D2930870873D0eeBCB02'
> 
> predictedContractAddress = instance.getComputedAddress(flushFundToThisAddress, salt)
> 
> deployedPredictedCrtAddress = instance.initForwarder(flushFundToThisAddress, salt)
> 
> forwarder = await Forwarder.at(predictedContractAddress)
> 
> await forwarder.flush()
> 
> await forwarder.flushERC20(celo_euro_contract)
> 
> await forwarder.flushERC20(celo_dollar_contract)