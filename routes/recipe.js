const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

router.get('/recipes', async (req, res) => {
    try {
        let recipes = await recipeController.getAllRecipes();
        res.json(recipes);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.get('/recipe/:id', async (req, res) => {
    try {
        let recipe = await recipeController.getRecipeById(req.params.id);
        res.json(recipe);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.post('/recipe', async (req, res) => {
    try {
        let recipe = await recipeController.addRecipe(req.body.name, req.body.description, req.body.ingredients, req.body.steps, req.body.authorId);
        res.json(recipe);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

module.exports = router;
