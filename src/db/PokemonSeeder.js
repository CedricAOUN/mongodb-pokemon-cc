const Pokemon = require('../models/Pokemon');

const seedPokemons = async () => {
  const existingPokemons = await Pokemon.find();
  if (existingPokemons.length > 0) {
    console.log('Pokemons already seeded:', existingPokemons);
    return;
  }
  const pokemons = [
    {
      name: 'Bulbasaur',
      hp: 45,
      cp: 49,
      picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
      types: ['Grass', 'Poison']
    },
    {
      name: 'Charmander',
      hp: 39,
      cp: 52,
      picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
      types: ['Fire']
    },
    {
      name: 'Squirtle',
      hp: 44,
      cp: 48,
      picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
      types: ['Water']
    }
  ];

  try {
    const createdPokemons = await Pokemon.insertMany(pokemons);
    console.log('Pokemons seeded successfully:', createdPokemons);
  } catch (error) {
    console.error('Error seeding pokemons:', error);
  }
};

module.exports = seedPokemons;