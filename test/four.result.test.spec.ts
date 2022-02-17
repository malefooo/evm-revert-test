import { expect } from 'chai';
import { network, ethers } from 'hardhat';
import { Contract, BigNumber, utils } from 'ethers';
import { encodeParameters, wait } from '../scripts/utils';

const { provider } = ethers;

describe("four result tests", ()=> {
    let aContract: Contract
    let bContract: Contract
    let override:Object

    beforeEach(async () => {
        // const estimateGasPrice = await provider.getGasPrice();
        // const gasPrice = estimateGasPrice.mul(3).div(2);
        // override = { gasPrice, gasLimit:3000000 };
        // let ContractA = await ethers.getContractFactory("TestA");
        // let ContractB = await ethers.getContractFactory("TestB");
        // aContract = await ContractA.deploy();
        // bContract = await ContractB.deploy();
        
    })

    async function testCase(aState:boolean, bState:boolean){
        try{
            // test
            let tx  = await aContract.doTest(bContract.address, 1, aState, bState, override);
            await wait(ethers, tx.hash, 'test');
        }catch(e){
            // console.log(e)
        }
    }

    it("A true and B true", async()=> {
        // await testCase(true, true);
        // expect((await aContract.aValue()).toString()).to.eq('2')
        // expect((await bContract.bValue()).toString()).to.eq('1')
    })

    it("A true and B false", async()=> {
        // testCase(true, false);
        // expect((await aContract.aValue()).toString()).to.eq('2')
        // expect((await bContract.bValue()).toString()).to.eq('0')
    })

    it("A false and B true", async()=> {
        // testCase(false, true);
        // expect((await aContract.aValue()).toString()).to.eq('1')
        // expect((await bContract.bValue()).toString()).to.eq('0')
    })

    it("A false and B false", async()=> {
        // testCase(false, false);
        // expect((await aContract.aValue()).toString()).to.eq('1')
        // expect((await bContract.bValue()).toString()).to.eq('0')
    })
});