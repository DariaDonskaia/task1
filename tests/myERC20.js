const { expect } = require("chai");
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;


describe("Deployment token contract",  function (){
    let myERC20;
    let erc20;
    let zero_address = "0x0000000000000000000000000000000000000000";

   
    beforeEach(async function () {
        [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
        myERC20 = await ethers.getContractFactory("myERC20")
        erc20 = await myERC20.deploy("TestToken", "TT") 
        await erc20.deployed()
    });
     

    describe("Test getter functions group", function () {
        //name
        it("Should get name token", async function () {
            symbol = await erc20.name(); 
            expect(symbol).to.equal("TestToken");
        }); 

        //symbol
        it("Should get symbol token", async function () {
            symbol = await erc20.symbol(); 
            expect(symbol).to.equal("TT");
        }); 

        //allowance
        it("Should get allowance amount", async function () {
            await erc20.connect(owner).approve(addr1.address, 50);
            allowance = await erc20.allowance(owner.address, addr1.address); 
            expect(allowance).to.equal(50);
        }); 

        //balanceOf
        it("Should get balance token", async function () {
            await erc20.connect(owner).mint(owner.address, 100);
            balance = await erc20.balanceOf(owner.address);
            expect(balance).to.equal(100);
        });  

        //totalSupply   
        it("Should get all amount token", async function () {
            await erc20.connect(owner).mint(owner.address, 100);
            expect(await erc20.totalSupply()).to.equal(100);
        });
    }); 


    describe("Test mint funtion", function () {
        //mint
        it("Should requirement fulfilled", async function () {
            await expect(erc20.connect(owner).mint(zero_address, 100)).to.be.revertedWith("Account cannot be the zero address.");
        });
        it("Should create 100 tokens", async function (){
            await erc20.connect(owner).mint(owner.address, 100);
            ownerBalance = await erc20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(100);
            expect(await erc20.totalSupply()).to.equal(100);
        });
    }); 

    describe("Test transfer funtion", function () {
        //transfer
        it("Should requirement fulfilled", async function () {
            await erc20.connect(owner).mint(owner.address, 10);
            await expect(erc20.connect(owner).transfer(zero_address, 10)).to.be.revertedWith("Recipient cannot be the zero address.");
            await expect(erc20.connect(owner).transfer(addr2.address, 15)).to.be.revertedWith("The caller must have a balance of at least amount.");
        });
        
        it("Should transfer token between accounts", async function () {
            await erc20.connect(owner).mint(owner.address, 100);
            ownerBalance = await erc20.balanceOf(owner.address);
     
            await erc20.connect(owner).transfer(addr1.address, 10)
            addr1Balance = await erc20.balanceOf(addr1.address)
            expect(addr1Balance).to.equal(10)

            await erc20.connect(owner).transfer(addr2.address, 15)
            addr2Balance = await erc20.balanceOf(addr2.address)
            expect(addr2Balance).to.equal(15);
        });

    }); 
    describe("Test transferFrom funtion", function () {
        //transferFrom
        it("Should requirement fulfilled", async function () {
            await erc20.connect(owner).mint(owner.address, 10);
            await expect(erc20.connect(owner).transferFrom(owner.address, zero_address, 10)).to.be.revertedWith("Recipient cannot be the zero address.");
            await expect(erc20.connect(owner).transferFrom(zero_address, addr1.address, 10)).to.be.revertedWith("Sender cannot be the zero address.");
            await expect(erc20.connect(owner).transferFrom(owner.address, addr2.address, 15)).to.be.revertedWith("Sender must have a balance of at least amount.");
            await expect(erc20.connect(owner).transferFrom(owner.address, addr1.address, 10)).to.be.revertedWith("The caller must have allowance for sender's tokens of at least amount.");
            addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(0);
        });
        it("Should transferFrom tokens between accounts", async function () {
            await erc20.connect(owner).mint(owner.address, 100);
            ownerBalance = await erc20.balanceOf(owner.address);
            await erc20.connect(owner).approve(addr1.address, 50);
            await erc20.connect(owner).transferFrom(owner.address, addr1.address, 10);
            addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(10);

        });
    });

    describe("Test approve funtion", function () {
        //approve
        it("Should requirement fulfilled", async function () {
            await expect(erc20.connect(owner).approve(zero_address, 50)).to.be.revertedWith("Spender cannot be the zero address.");
        });    
        it("Should approve account and amount", async function () {
            await erc20.connect(owner).approve(addr1.address, 50);
            allowance = await erc20.allowance(owner.address, addr1.address); 
            expect(allowance).to.equal(50);
        });
    });

    describe("Test increaseAllowance|decreaseAllowance funtion", function () {
        //increaseAllowance | decreaseAllowance
        it("Should requirement fulfilled", async function () {
            await erc20.connect(owner).approve(addr1.address, 10);
            await expect(erc20.connect(owner).increaseAllowance(zero_address, 50)).to.be.revertedWith("Spender cannot be the zero address.");
            await expect(erc20.connect(owner).decreaseAllowance(zero_address, 50)).to.be.revertedWith("Spender cannot be the zero address.");
            await expect(erc20.connect(owner).decreaseAllowance(addr1.address, 50)).to.be.revertedWith("Spender must have allowance for the caller of at least subtractedValue.");
        });
        it("Should increase allowance", async function () {
            await erc20.connect(owner).approve(addr1.address, 50);
            await erc20.connect(owner).increaseAllowance(addr1.address, 50);
            allowance = await erc20.allowance(owner.address, addr1.address); 
            expect(allowance).to.equal(100);
        });
        it("Should decrease allowance", async function () {
            await erc20.connect(owner).approve(addr1.address, 100);
            await erc20.connect(owner).decreaseAllowance(addr1.address, 50);
            allowance = await erc20.allowance(owner.address, addr1.address); 
            expect(allowance).to.equal(50);
        });
    });

    //burn
    describe("Test burn funtion", function () {
        it("Should requirement fulfilled", async function () {
            await erc20.connect(owner).mint(owner.address, 100);  
            await expect(erc20.connect(owner).burn(150)).to.be.revertedWith("Sender must have a balance of at least amount.");
        });
        it("Should burn token", async function () {
            await erc20.connect(owner).mint(owner.address, 100); 
            await erc20.connect(owner).burn(50);
            ownerBalance = await erc20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(50);
            expect(await erc20.totalSupply()).to.equal(50);
        });
    });


    
});