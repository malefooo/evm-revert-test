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
    let length = 3;
    let addrs = [];
    let passes = [];
    // testC
    const TestC = await ethers.getContractFactory("TestC");
    console.log("Deploying TestC...");

    for(let i=0;i<length;i++){
        let testC = await TestC.deploy();
        await testC.deployed();
        console.log("TestC Address is: ", testC.address);
        addrs.push(testC.address);
        passes.push(true);
    }
    passes[0] = false;
    await testCase(addrs, passes, override);
}

async function testCase(addrs, passes, override) {
    try{
        // test
        const contract = await ethers.getContractAt('TestC', addrs[addrs.length - 1]);
        let tx  = await contract.doTest(addrs, passes, 1, override);
        await wait(ethers, tx.hash, 'test');
    }catch(e){
        console.log(e)
    }
    for(let i=addrs.length - 1;i>=0;i--){
        // get
        const contract = await ethers.getContractAt('TestC', addrs[i]);
        let value = await contract.value();
        console.log('addr is:', addrs[i]);
        console.log('value is:', value.toString());
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });