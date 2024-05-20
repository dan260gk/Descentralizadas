const { ethers } = require("hardhat");

async function main() {
    const USERS = await ethers.getContractFactory('Users');
    const users = await USERS.deploy();
    await users.deployed();
    console.log("Users Contract deployed to:", users.address);

    const RECIPES = await ethers.getContractFactory('Recipes');
    const recipes = await RECIPES.deploy();
    await recipes.deployed();
    console.log("Recipes Contract deployed to:", recipes.address);

    const RATINGS = await ethers.getContractFactory('Ratings');
    const ratings = await RATINGS.deploy();
    await ratings.deployed();
    console.log("Ratings Contract deployed to:", ratings.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
