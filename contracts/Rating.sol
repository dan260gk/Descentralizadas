// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ratings is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _ratingIds;

    struct Rating {
        uint256 score;
        uint256 recipeId;
        uint256 userId;
        uint256 ratingId;
    }

    mapping(uint256 => Rating) public ratings;
    mapping(uint256 => uint256[]) public recipeRatings;

    function addRating(uint256 score, uint256 recipeId, uint256 userId) public onlyOwner returns (uint256) {
        require(score >= 0 && score <= 5, "la valoracion debe ser entre 0 y 5");
        _ratingIds.increment();
        uint256 newRatingId = _ratingIds.current();
        ratings[newRatingId] = Rating(score, recipeId, userId, newRatingId);
        recipeRatings[recipeId].push(newRatingId);
        return newRatingId;
    }

    function getAllRatings() public view returns (Rating[] memory) {
        Rating[] memory ratingArray = new Rating[](_ratingIds.current());
        for (uint i = 0; i < _ratingIds.current(); i++) {
            ratingArray[i] = ratings[i + 1];
        }
        return ratingArray;
    }

    function getRatingById(uint256 ratingId) public view returns (Rating memory) {
        return ratings[ratingId];
    }

    function updateRating(uint256 ratingId, uint256 newScore) public onlyOwner {
        require(newScore >= 0 && newScore <= 5, "la valoracion debe ser entre 0 y 5");
        ratings[ratingId].score = newScore;
    }

    function getUserRatingForRecipe(uint256 recipeId, uint256 userId) public view returns (Rating memory) {
        uint256[] memory ratingIds = recipeRatings[recipeId];
        for (uint i = 0; i < ratingIds.length; i++) {
            if (ratings[ratingIds[i]].userId == userId) {
                return ratings[ratingIds[i]];
            }
        }
        revert("Valoracion no encontrada");
    }

    function getAverageRating(uint256 recipeId) public view returns (uint256) {
        uint256[] memory ratingIds = recipeRatings[recipeId];
        uint256 totalScore = 0;
        for (uint i = 0; i < ratingIds.length; i++) {
            totalScore += ratings[ratingIds[i]].score;
        }
        return totalScore / ratingIds.length;
    }
}
