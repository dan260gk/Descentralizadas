require('dotenv').config({ path: require('find-config')('.env') });
const { ethers } = require('ethers');
const contract = require('../artifacts/contracts/Recipe.sol/Recipes.json');

const {
    API_URL,
    PRIVATE_KEY,
    PUBLIC_KEY,
    RECIPE_CONTRACT
} = process.env;

async function createTransaction(method, params) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const etherInterface = new ethers.utils.Interface(contract.abi);
    const nonce = await provider.getTransactionCount(PUBLIC_KEY, 'latest');
    const gasPrice = await provider.getGasPrice();
    const network = await provider.getNetwork();
    const { chainId } = network;
    const transaction = {
        from: PUBLIC_KEY,
        to: RECIPE_CONTRACT,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method, params),
    };
    return transaction;
}

async function addRecipe(name, description, ingredients, steps, authorId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const transaction = await createTransaction("addRecipe", [name, description, ingredients, steps, authorId]);
    const estimateGas = await provider.estimateGas(transaction);
    transaction["gasLimit"] = estimateGas;
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const signedTx = await wallet.signTransaction(transaction);
    const transactionReceipt = await provider.sendTransaction(signedTx);
    await transactionReceipt.wait();
    const hash = transactionReceipt.hash;
    const receipt = await provider.getTransactionReceipt(hash);
    return receipt;
}

async function getAllRecipes() {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const recipeContract = new ethers.Contract(RECIPE_CONTRACT, contract.abi, provider);
    const result = await recipeContract.getAllRecipes();
    return result;
}

async function getRecipeById(recipeId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const recipeContract = new ethers.Contract(RECIPE_CONTRACT, contract.abi, provider);
    const result = await recipeContract.getRecipeById(recipeId);
    return result;
}

module.exports = {
    addRecipe,
    getAllRecipes,
    getRecipeById
};
