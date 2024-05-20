// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Users is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _userIds;

    struct User {
        string name;
        string email;
        string password;
        uint256 userId;
    }

    mapping(uint256 => User) public users;

    function addUser(string memory name, string memory email, string memory password) public onlyOwner returns (uint256) {
        _userIds.increment();
        uint256 newUserId = _userIds.current();
        users[newUserId] = User(name, email, password, newUserId);
        return newUserId;
    }

    function getAllUsers() public view returns (User[] memory) {
        User[] memory userArray = new User[](_userIds.current());
        for (uint i = 0; i < _userIds.current(); i++) {
            userArray[i] = users[i + 1];
        }
        return userArray;
    }

    function getUserById(uint256 userId) public view returns (User memory) {
        return users[userId];
    }
}

