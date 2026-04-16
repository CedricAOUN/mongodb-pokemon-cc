const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pokemonRoutes = require('./src/routes/pokemon-route');
const userRoutes = require('./src/routes/user-route');
const mongoose = require('mongoose');
const { createFirstUser } = require('./src/db/UserSeeder');
const authMiddleware = require('./src/auth/authMiddleware');
//dot env
require('dotenv').config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/PokemonDB');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

createFirstUser();

// Users
app.post('/api/login', userRoutes.userLogin);

app.use(authMiddleware);
// Pokemons
app.get('/api/pokemons', pokemonRoutes.findAllPokemons);
app.get('/api/pokemons/:id', pokemonRoutes.findPokemonById);
app.post('/api/pokemons', pokemonRoutes.createPokemon);
app.put('/api/pokemons/:id', pokemonRoutes.updatePokemon);
app.delete('/api/pokemons/:id', pokemonRoutes.deletePokemon);


app.use((req, res) => res.json({ message: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));