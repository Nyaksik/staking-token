//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20mint {
    function mint(address account, uint amount) external;
}

contract StakingContract is Ownable {
    IERC20 private _stakingToken;
    IERC20mint private _rewardsToken;

    uint public endTime;
    uint public stakingPercent; 
    uint public totalStaked;
    
    struct Staker {
        uint256 amount;
        uint256 stakeTime;
    }
    
    mapping(address => Staker) private stakers;

    constructor(
        address _stakingAddress,
        address _rewardAddress,
        uint _endTime,
        uint _stakingPercent
    ) {
        _stakingToken = IERC20(_stakingAddress);
        _rewardsToken = IERC20mint(_rewardAddress);
        endTime = _endTime;
        stakingPercent = _stakingPercent;
    }

    function getStaker(address _staker) external view returns(Staker memory) {
        return stakers[_staker];
    }

    function changeEndTime(uint _time) external onlyOwner {
        endTime = _time;
    }

    function changeStakingPercent(uint _percent) external onlyOwner {
        stakingPercent = _percent;
    }

    function changeRewardToken(address token) external onlyOwner {
        _rewardsToken = IERC20mint(token);
    }

    function stake(uint _amount) external {
        require(_amount > 0, "The amount is less than zero");
        Staker storage staker = stakers[msg.sender];
        if(_countCycles() > 0) {
            _claim();
        }
        _stakingToken.transferFrom(msg.sender, address(this), _amount);
        totalStaked += _amount;
        staker.amount += _amount;
        staker.stakeTime = block.timestamp;
    }

    function unstake() external {
        Staker storage staker = stakers[msg.sender];
        require(staker.amount > 0, "No stakes");
        _stakingToken.transfer(msg.sender, staker.amount);
        if(_countCycles() > 0) {
            _claim();
        }
        totalStaked -= staker.amount;
        staker.amount = 0;
    }

    function claim() external {
        require(_countCycles() > 0, "No claim");
        _claim();
    }

    // Helper function

    function _claim() internal {
        Staker storage staker = stakers[msg.sender];
        uint tokensAmount = staker.amount * stakingPercent / 100000;
        uint claimableAmount = _countCycles() * tokensAmount;
        staker.stakeTime = block.timestamp;
        _rewardsToken.mint(msg.sender, claimableAmount);    
    }

    function _countCycles() internal view returns(uint cyclesCount) {
        Staker memory staker = stakers[msg.sender];
        uint stakingPeriod = block.timestamp - staker.stakeTime;
        cyclesCount = stakingPeriod / endTime;
    }
}