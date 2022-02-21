

pragma solidity ^0.8.0;

contract MyERC20{

//https://eips.ethereum.org/EIPS/eip-20#methods
function transfer(address recipient, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
function approve(address spender, uint256 amount) external returns (bool);
function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool);
function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool);

function allowance(address owner, address spender) external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function totalSupply() external view returns (uint256);
function name() public view returns (string memory);
function decimals() public view returns (uint8);
function symbol() public view returns (string);
}