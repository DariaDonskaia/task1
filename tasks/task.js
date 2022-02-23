task("transfer", "Transfer tokens to another account")
  .addParam("recipient", "Recipient of tokens")
  .addParam("amount", "Amount tokens")
  .setAction(async (taskArgs, hre) => {
    const myERC20 = await ethers.getContractFactory("myERC20");
    myerc20 = await myERC20.deploy();  
    await myerc20.transfer(taskArgs.recipient, taskArgs.amount);
    console.log("You transfer ", taskArgs.amount, "to ", taskArgs.recipient);
});

task("transferFrom", "Transferring tokens from a specific account to another account")
  .addParam("sender", "Sender of tokens")
  .addParam("recipient", "Recipient of tokens")
  .addParam("amount", "Amount tokens")
  .setAction(async (taskArgs, hre) => {
    const myERC20 = await ethers.getContractFactory("myERC20");
    myerc20 = await myERC20.deploy();  
    await myerc20.transferFrom(taskArgs.sender, taskArgs.recipient, taskArgs.amount);
    console.log(taskArgs.sender, " transfer ", taskArgs.amount, "to ", taskArgs.recipient);
});


task("approve", "Sets amount as the allowance of spender over the caller's tokens.")
  .addParam("spender", "Spender of tokens")
  .addParam("amount", "Amount tokens")
  .setAction(async (taskArgs, hre) => {
    const myERC20 = await ethers.getContractFactory("myERC20");
    myerc20 = await myERC20.deploy();  
    await myerc20.approve(taskArgs.spender, taskArgs.amount);
    console.log(taskArgs.spender," approve ",taskArgs.amount);
});
