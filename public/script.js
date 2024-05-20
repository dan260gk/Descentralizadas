document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });
    const result = await response.json();
    console.log(result);
    loadUsers();
});

document.getElementById('addRecipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('recipeName').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const steps = document.getElementById('steps').value;
    const authorId = document.getElementById('authorId').value;

    const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, ingredients, steps, authorId })
    });
    const result = await response.json();
    console.log(result);
    loadRecipes();
});

document.getElementById('addRatingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const score = document.getElementById('score').value;
    const recipeId = document.getElementById('recipeId').value;
    const userId = document.getElementById('userId').value;

    const response = await fetch('/api/rating', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score, recipeId, userId })
    });
    const result = await response.json();
    console.log(result);
    loadRatings();
});

async function loadUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();
    document.getElementById('users').innerText = JSON.stringify(users, null, 2);
}

async function loadRecipes() {
    const response = await fetch('/api/recipes');
    const recipes = await response.json();
    document.getElementById('recipes').innerText = JSON.stringify(recipes, null, 2);
}

async function loadRatings() {
    const response = await fetch('/api/ratings');
    const ratings = await response.json();
    document.getElementById('ratings').innerText = JSON.stringify(ratings, null, 2);
}

loadUsers();
loadRecipes();
loadRatings();
