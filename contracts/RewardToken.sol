//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract RewardToken {
    address private _owner;
    address private _stakingMinter;
    string public name;
    string public symbol;
    uint public decimals;
    uint public totalSupply;

    mapping(address => uint) private _balances;
    mapping(address => mapping(address => uint)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor(address stakingMinter) {
        _owner = msg.sender;
        name = "Reward NyanNyanCoin";
        symbol = "RNNC";
        decimals = 18;
        _stakingMinter = stakingMinter;
    }

    modifier _onlyOwner {
        require(msg.sender == _owner, "You are not the owner");
        _;
    }

    modifier _onlyStaking {
        require(msg.sender == _stakingMinter, "Only staking contract");
        _;
    }

    function balanceOf(address account) public view returns(uint) {
        return _balances[account];
    }

    function allowance(address owner, address spender) public view returns(uint) {
        return _allowances[owner][spender];
    }

    function mint(address account, uint amount) external _onlyStaking {
        _mint(account, amount);
    }

    function burn(address account, uint amount) external _onlyOwner {
        _burn(account, amount);
    }

    function transfer(address to, uint amount) external returns(bool success) {
        _transfer(msg.sender, to, amount);

        return true;
    }

    function transferFrom(address from, address to, uint amount) external returns(bool success) {
        uint _currentAllowance = allowance(from, msg.sender);

        require(allowance(from, msg.sender) != 0, "Unverified address");
        require(_currentAllowance >= amount, "The amount exceeds the allowance");

        _transfer(from, to, amount);
        _approve(from, msg.sender, _currentAllowance - amount);

        return true;
    }

    function approve(address spender, uint amount) external returns(bool success) {
        _approve(msg.sender, spender, amount);

        return true;
    }

    function increaseAllowance(address spender, uint amount) external returns(bool success) {
        uint _currentAllowance = allowance(msg.sender, spender);

        require(spender != address(0x0), "Cannot be the zero address");

        _approve(msg.sender, spender, _currentAllowance + amount);

        return true;
    }

    function decreaseAllowance(address spender, uint amount) external returns(bool success) {
        uint _currentAllowance = allowance(msg.sender, spender);

        require(spender != address(0x0), "Cannot be the zero address");
        require(_currentAllowance >= amount, "The amount exceeds the allowance");
        
        _approve(msg.sender, spender, _currentAllowance - amount);

        return true;
    }

    // Helper function

    function _mint(address account, uint amount) internal {
        require(account != address(0x0), "Cannot be the zero address");

        totalSupply += amount;
        _balances[account] += amount;

        emit Transfer(address(0x0), account, amount);
    }

    function _burn(address account, uint amount) internal {
        require(account != address(0x0), "Cannot be the zero address");
        require(balanceOf(account) >= amount, "Must have at least amount tokens");

        totalSupply -= amount;
        _balances[account] -= amount;

        emit Transfer(account, address(0x0), amount);
    }

    function _transfer(address from, address to, uint amount) internal {
        require(from != address(0x0), "Cannot be the zero address");
        require(to != address(0x0), "Cannot be the zero address");
        require(balanceOf(from) >= amount, "Must have at least amount tokens");

        _balances[from] -= amount;
        _balances[to] += amount;

        emit Transfer(from, to, amount);
    }

    function _approve(address owner, address spender, uint amount) internal {
        require(owner != address(0x0), "Cannot be the zero address");
        require(spender != address(0x0), "Cannot be the zero address");

        _allowances[owner][spender] = amount;

        emit Approval(owner, spender, amount);
    }
}
