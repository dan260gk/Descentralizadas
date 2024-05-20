require('dotenv').config({ path: require('find-config')('.env') });
const { ethers, BigNumber } = require('ethers');
const contract = require('../artifacts/contracts/Rating.sol/Ratings.json');

const {
    API_URL,
    PRIVATE_KEY,
    PUBLIC_KEY,
    RATING_CONTRACT
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
        to: RATING_CONTRACT,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method, params),
    };
    return transaction;
}

async function addRating(score, recipeId, userId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const transaction = await createTransaction("addRating", [score, recipeId, userId]);
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

async function getAllRatings() {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const ratingContract = new ethers.Contract(RATING_CONTRACT, contract.abi, provider);
    const result = await ratingContract.getAllRatings();
    return result;
}

async function getRatingById(ratingId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const ratingContract = new ethers.Contract(RATING_CONTRACT, contract.abi, provider);
    const result = await ratingContract.getRatingById(ratingId);
    return result;
}

async function updateRating(ratingId, newScore) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const transaction = await createTransaction("updateRating", [ratingId, newScore]);
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

async function getUserRatingForRecipe(recipeId, userId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const ratingContract = new ethers.Contract(RATING_CONTRACT, contract.abi, provider);
    const result = await ratingContract.getUserRatingForRecipe(recipeId, userId);
    return result;
}

async function getAverageRating(recipeId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const ratingContract = new ethers.Contract(RATING_CONTRACT, contract.abi, provider);
    const result = await ratingContract.getAverageRating(recipeId);
    return result;
}

module.exports = {
    addRating,
    getAllRatings,
    getRatingById,
    updateRating,
    getUserRatingForRecipe,
    getAverageRating
};
