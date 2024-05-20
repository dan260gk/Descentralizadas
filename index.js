const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const ratingRoutes = require('./routes/rating');
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', recipeRoutes);
app.use('/api', ratingRoutes);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
