const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratings');

router.get('/ratings', async (req, res) => {
    try {
        let ratings = await ratingController.getAllRatings();
        res.json(ratings);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.get('/rating/user-recipe', async (req, res) => {
    try {
        let rating = await ratingController.getUserRatingForRecipe(req.query.recipeId, req.query.userId);
        res.json(rating);
    } catch (ex) {
        res.status(500).json({ message: ex.message + "f" });
    }
});



router.post('/rating', async (req, res) => {
    try {
        let rating = await ratingController.addRating(req.body.score, req.body.recipeId, req.body.userId);
        res.json(rating);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.put('/rating', async (req, res) => {
    try {
        let rating = await ratingController.updateRating(req.body.ratingId, req.body.newScore);
        res.json(rating);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.get('/rating/average/:recipeId', async (req, res) => {
    try {
        let average = await ratingController.getAverageRating(req.params.recipeId);
        res.json(average);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});
router.get('/rating/:id', async (req, res) => {
    try {
        let rating = await ratingController.getRatingById(req.params.id);
        res.json(rating);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});
module.exports = router;
