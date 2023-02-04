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
    // testB
    // const TestB = await ethers.getContractFactory("TestB");
    // console.log("Deploying TestB...");
    // let testB = await TestB.deploy();
    // await testB.deployed();
    // console.log("TestB Address is: ", testB.address);
    // let tx = await testB.checkValue(1, false);
    // await wait(ethers, tx.hash, 'TestB checkValue...');

    // student
    const Student = await ethers.getContractFactory("Student");
    console.log("Deploying Student...");
    let student = await Student.deploy();
    await student.deployed();
    console.log("Student Address is: ", student.address);

    // calc
    const Calc = await ethers.getContractFactory("Calculator");
    console.log("Deploying Student...");
    let calc = await Calc.deploy();
    await calc.deployed();
    console.log("Student Address is: ", calc.address);
    let tx = await student.addTwoNumbers(calc.address,1,2)
    await wait(ethers, tx.hash, 'TestB checkValue...');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error.message);
        process.exit(1);
    });