//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingContact is AccessControl {
    IERC20 private _stakingToken;
    IERC20 private _rewardsToken;

    bytes32 private constant OWNER_ROLE = keccak256("OWNER_ROLE");
    
    uint public endTime;
    uint public stakingPercent;
    uint public totalStaked;
    
    struct StakerOperations {
        uint256 amount;
        uint256 stakeTime;
    }
    struct Staker {
        uint256 totalAmount;
        StakerOperations[] operations;
    }

    mapping(address => Staker) private stakers;

    constructor(
        address _stakingAddress,
        address _rewardAddress,
        uint _endTime,
        uint _stakingPercent
    ) {
        _setupRole(OWNER_ROLE, msg.sender);
        _stakingToken = IERC20(_stakingAddress);
        _rewardsToken = IERC20(_rewardAddress);
        endTime = _endTime;
        stakingPercent = _stakingPercent;
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function changeEndTime(uint _time) external onlyRole(OWNER_ROLE) {
        endTime = _time;
    }

    function changeStakingPercent(uint _percent) external onlyRole(OWNER_ROLE) {
        stakingPercent = _percent;
    }

    function provideRewards(uint _amount) external onlyRole(OWNER_ROLE) {
        require(_amount > 0, "The amount is less than zero");
        _rewardsToken.transferFrom(msg.sender, address(this), _amount);
    }

    function stake(uint _amount) external {
        require(_amount > 0, "The amount is less than zero");
        Staker storage staker = stakers[msg.sender];
        _stakingToken.transferFrom(msg.sender, address(this), _amount);
        totalStaked += _amount;
        staker.totalAmount += _amount;
        staker.operations.push(
            StakerOperations({ amount: _amount, stakeTime: block.timestamp })
        );
    }

    function unstake() external {
        Staker storage staker = stakers[msg.sender];
        _stakingToken.transfer(msg.sender, staker.totalAmount);
        _claim();
        totalStaked -= staker.totalAmount;
        staker.totalAmount = 0;
        delete staker.operations;
    }

    function claim() external {
        _claim();
    }

    // Helper function

    function _claim() internal {
        StakerOperations[] storage operations = stakers[msg.sender].operations;
        uint claimableAmount;
        for(uint i = 0; i < operations.length; i++) {
            uint stakingPeriod = block.timestamp - operations[i].stakeTime;
            if(stakingPeriod >= endTime) {
                uint cyclesCount = stakingPeriod / endTime;
                uint tokensAmount = operations[i].amount * stakingPercent / 100;
                claimableAmount += cyclesCount * tokensAmount;
                operations[i].stakeTime = block.timestamp;
            }
        }
        require(claimableAmount > 0, "Nothing to claim");
        _rewardsToken.transfer(msg.sender, claimableAmount);
    }
}