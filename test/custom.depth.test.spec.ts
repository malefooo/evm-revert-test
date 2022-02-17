import { expect } from 'chai';
import { network, ethers } from 'hardhat';
import { Contract, BigNumber, utils } from 'ethers';
import { encodeParameters, wait } from '../scripts/utils';

const { provider } = ethers;

describe("custom depth tests", ()=> {
    let length = 3;
    let addrs:Array<string> = [];
    let passes:Array<boolean> = [];
    let override:Object

    before(async () => {
        const estimateGasPrice = await provider.getGasPrice();
        const gasPrice = estimateGasPrice.mul(3).div(2);
        override = { gasPrice, gasLimit:3000000 };
        let TestC = await ethers.getContractFactory("TestC");
        for(let i=0;i<length;i++){
            let testC = await TestC.deploy();
            await testC.deployed();
            addrs.push(testC.address);
            passes.push(true);
        }
        passes[0] = false;
    })

    async function testCase(addrs:Array<string>, passes:Array<boolean>){
        try{
            // test
            const contract = await ethers.getContractAt('TestC', addrs[addrs.length - 1]);
            let tx  = await contract.doTest(addrs, passes, 1, override);
            await wait(ethers, tx.hash, 'test');
        }catch(e){
            // console.log(e)
        }
    }

    it("run depth test", async()=> {
        await testCase(addrs, passes)
        for(let i = addrs.length - 1;i >= 0;i--){
            const contract = await ethers.getContractAt('TestC', addrs[i]);
            if(i == 0){
                expect((await contract.value()).toString()).to.eq('1')
            }else{
                expect((await contract.value()).toString()).to.eq('2')
            }
        }
    })
});