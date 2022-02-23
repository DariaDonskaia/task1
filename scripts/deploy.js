const hre = require("hardhat"); 

async function main() {
  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contracts with the account:", deployer.address); 

  const ERC20 = await hre.ethers.getContractFactory("myERC20"); 
  const myerc20 = await ERC20.deploy(); 

  await myerc20.deployed(); 

  console.log("myERC20 deployed to:", myerc20.address); 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 