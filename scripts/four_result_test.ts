import { network, ethers } from 'hardhat';
import { Contract, ContractFactory, BigNumber, utils } from 'ethers';
import { encodeParameters, wait } from './utils';

async function main() {
    const { provider } = ethers;
    const [ operator ] = await ethers.getSigners();

    const estimateGasPrice = await provider.getGasPrice();
    const gasPrice = estimateGasPrice.mul(3).div(2);
    console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
    const override = { gasPrice, gasLimit:3000000 };

    console.log(`====================Do your bussiness =======================`)
    // testA
    const TestA = await ethers.getContractFactory("TestA");
    console.log("Deploying TestA...");
    let testA = await TestA.deploy();
    await testA.deployed();
    console.log("Fairy Address is: ", testA.address);
    // testB
    const TestB = await ethers.getContractFactory("TestB");
    console.log("Deploying TestB...");
    let testB = await TestB.deploy();
    await testB.deployed();
    console.log("Fairy Address is: ", testB.address);

    async function testCase(a, b){
        try{
            // test
            let tx  = await testA.doTest(testB.address, 1, a, b, override);
            await wait(ethers, tx.hash, 'test');
        }catch(e){
            console.log(a,b,e)
        }
        // get
        let aValue = await testA.aValue();
        console.log('aValue is:', aValue.toString());

        // get
        let bValue = await testB.bValue();
        console.log('bValue is:', bValue.toString());
    }

    await testCase(true, true);
    await testCase(true, false);
    await testCase(false, false);
    await testCase(false, true);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });