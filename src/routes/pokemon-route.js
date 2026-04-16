const Pokemon = require('../models/Pokemon');

const findAllPokemons = async (req, res) => {
  const pokemons = await Pokemon.find();
  console.log("pokemons:", pokemons);
  res.json({ message: pokemons });
};

const findPokemonById = async (req, res) => {
  const pokemon = await Pokemon.findOne({ _id: req.params.id });
  res.json({ message: pokemon });
}

const createPokemon = async (req, res) => {
  const pokemon = await Pokemon.create(req.body);
  res.json({ message: pokemon });
};

const updatePokemon = async (req, res) => {
  const pokemon = await Pokemon.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
  res.json({ message: pokemon });
};

const deletePokemon = async (req, res) => {
  await Pokemon.findOneAndDelete({ id: req.params.id });
  res.json({ message: 'Pokemon deleted' });
};

module.exports = {
  findAllPokemons,
  findPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon
};