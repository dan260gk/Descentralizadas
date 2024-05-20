// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Recipes is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _recipeIds;

    struct Recipe {
        string name;
        string description;
        string ingredients;
        string steps;
        uint256 authorId;
        uint256 recipeId;
    }

    mapping(uint256 => Recipe) public recipes;

    function addRecipe(string memory name, string memory description, string memory ingredients, string memory steps, uint256 authorId) public onlyOwner returns (uint256) {
        _recipeIds.increment();
        uint256 newRecipeId = _recipeIds.current();
        recipes[newRecipeId] = Recipe(name, description, ingredients, steps, authorId, newRecipeId);
        return newRecipeId;
    }

    function getAllRecipes() public view returns (Recipe[] memory) {
        Recipe[] memory recipeArray = new Recipe[](_recipeIds.current());
        for (uint i = 0; i < _recipeIds.current(); i++) {
            recipeArray[i] = recipes[i + 1];
        }
        return recipeArray;
    }

    function getRecipeById(uint256 recipeId) public view returns (Recipe memory) {
        return recipes[recipeId];
    }
}
